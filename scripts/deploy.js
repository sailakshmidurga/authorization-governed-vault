import hre from "hardhat";

async function main() {
  const { ethers } = hre;

  console.log("Starting deployment...");

  // Network info
  const network = await ethers.provider.getNetwork();
  console.log("Network chainId:", network.chainId.toString());

  // Deployer account
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with account:", deployer.address);

  // 1️⃣ Deploy AuthorizationManager
  const AuthorizationManager = await ethers.getContractFactory(
    "AuthorizationManager"
  );

  const authorizationManager = await AuthorizationManager.deploy(
    deployer.address
  );
  await authorizationManager.waitForDeployment();

  const authManagerAddress = await authorizationManager.getAddress();
  console.log("AuthorizationManager deployed at:", authManagerAddress);

  // 2️⃣ Deploy SecureVault
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
