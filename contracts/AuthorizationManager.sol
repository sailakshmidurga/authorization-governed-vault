// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/utils/cryptography/MessageHashUtils.sol";

contract AuthorizationManager {
    using ECDSA for bytes32;

    // Replay protection: each authorization usable once
    mapping(bytes32 => bool) public authorizationUsed;

    // Off-chain signer (authority)
    address public immutable signer;

    event AuthorizationConsumed(bytes32 indexed authId);

    constructor(address _signer) {
        require(_signer != address(0), "Invalid signer");
        signer = _signer;
    }

    function verifyAuthorization(
        address vault,
        address recipient,
        uint256 amount,
        bytes32 nonce,
        uint256 chainId,
        bytes calldata signature
    ) external returns (bool) {
        // 1️⃣ Construct deterministic message hash
        bytes32 messageHash = keccak256(
            abi.encodePacked(
                vault,
                recipient,
                amount,
                nonce,
                chainId
            )
        );

        // 2️⃣ Convert to Ethereum signed message hash (OZ v5 way)
        bytes32 ethSignedMessageHash =
            MessageHashUtils.toEthSignedMessageHash(messageHash);

        // 3️⃣ Recover signer
        address recoveredSigner =
            ECDSA.recover(ethSignedMessageHash, signature);

        require(recoveredSigner == signer, "Invalid signature");

        // 4️⃣ Replay protection
        require(!authorizationUsed[nonce], "Authorization already used");
        authorizationUsed[nonce] = true;

        emit AuthorizationConsumed(nonce);
        return true;
    }
}
