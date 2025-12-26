const { ethers } = require("hardhat");

async function main() {
  console.log("Starting deployment...");

  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with account:", deployer.address);

  const AuthorizationManager = await ethers.getContractFactory(
    "AuthorizationManager"
  );
  const authManager = await AuthorizationManager.deploy(deployer.address);
  await authManager.deployed();

  console.log("AuthorizationManager deployed at:", authManager.address);

  const SecureVault = await ethers.getContractFactory("SecureVault");
  const vault = await SecureVault.deploy(authManager.address);
  await vault.deployed();

  console.log("SecureVault deployed at:", vault.address);
  console.log("Deployment completed successfully.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
