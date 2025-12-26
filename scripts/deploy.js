import hre from "hardhat";

async function main() {
  const { ethers, network } = hre;

  console.log("Starting deployment...");
  console.log("Network name:", network.name);

  // Get chainId directly from RPC (Hardhat v3 safe)
  const chainIdHex = await network.provider.send("eth_chainId");
  const chainId = parseInt(chainIdHex, 16);
  console.log("Chain ID:", chainId);

  // Get deployer
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with account:", deployer.address);

  // -------------------------------
  // Deploy AuthorizationManager
  // -------------------------------
  const AuthorizationManager = await ethers.getContractFactory(
    "AuthorizationManager"
  );

  const authorizationManager = await AuthorizationManager.deploy(
    deployer.address
  );
  await authorizationManager.waitForDeployment();

  const authManagerAddress = await authorizationManager.getAddress();
  console.log("AuthorizationManager deployed at:", authManagerAddress);

  // -------------------------------
  // Deploy SecureVault
  // -------------------------------
  const SecureVault = await ethers.getContractFactory("SecureVault");

  const secureVault = await SecureVault.deploy(authManagerAddress);
  await secureVault.waitForDeployment();

  const vaultAddress = await secureVault.getAddress();
  console.log("SecureVault deployed at:", vaultAddress);

  console.log("Deployment completed successfully.");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
