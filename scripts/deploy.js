const { ethers } = require("hardhat");

async function main() {
  console.log("Starting deployment...");

  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with account:", deployer.address);

  // Deploy AuthorizationManager
  const AuthorizationManager = await ethers.getContractFactory(
    "AuthorizationManager"
  );
  const authManager = await AuthorizationManager.deploy(deployer.address);
  await authManager.waitForDeployment();

  const authManagerAddress = await authManager.getAddress();
  console.log("AuthorizationManager deployed at:", authManagerAddress);

  // Deploy SecureVault
  const SecureVault = await ethers.getContractFactory("SecureVault");
  const vault = await SecureVault.deploy(authManagerAddress);
  await vault.waitForDeployment();

  const vaultAddress = await vault.getAddress();
  console.log("SecureVault deployed at:", vaultAddress);

  console.log("Deployment completed successfully.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
