// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IAuthorizationManager {
    function verifyAuthorization(
        address vault,
        address recipient,
        uint256 amount,
        bytes32 nonce,
        uint256 chainId,
        bytes calldata signature
    ) external returns (bool);
}

contract SecureVault {
    IAuthorizationManager public immutable authorizationManager;

    // Tracks total ETH deposited (internal accounting)
    uint256 public totalBalance;

    event Deposit(address indexed from, uint256 amount);
    event Withdrawal(address indexed to, uint256 amount, bytes32 indexed nonce);

    constructor(address _authorizationManager) {
        require(_authorizationManager != address(0), "Invalid auth manager");
        authorizationManager = IAuthorizationManager(_authorizationManager);
    }

    // Accept ETH deposits from anyone
    receive() external payable {
        require(msg.value > 0, "Zero deposit");
        totalBalance += msg.value;
        emit Deposit(msg.sender, msg.value);
    }

    /**
     * @notice Withdraw ETH after authorization is verified
     */
    function withdraw(
        address recipient,
        uint256 amount,
        bytes32 nonce,
        uint256 chainId,
        bytes calldata signature
    ) external {
        require(recipient != address(0), "Invalid recipient");
        require(amount > 0, "Invalid amount");
        require(amount <= totalBalance, "Insufficient vault balance");

        // 1️⃣ Verify authorization via AuthorizationManager
        bool authorized = authorizationManager.verifyAuthorization(
            address(this),
            recipient,
            amount,
            nonce,
            chainId,
            signature
        );
        require(authorized, "Authorization failed");

        // 2️⃣ Update internal accounting FIRST
        totalBalance -= amount;

        // 3️⃣ Transfer ETH
        (bool success, ) = recipient.call{value: amount}("");
        require(success, "ETH transfer failed");

        emit Withdrawal(recipient, amount, nonce);
    }
}
