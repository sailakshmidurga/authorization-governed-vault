import { ethers } from "hardhat";

async function main() {
  console.log("Starting deployment...");

  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with account:", deployer.address);

  const AuthorizationManager = await ethers.getContractFactory(
    "AuthorizationManager"
  );
  const authManager = await AuthorizationManager.deploy(deployer.address);
  await authManager.waitForDeployment();

  console.log(
    "AuthorizationManager deployed at:",
    await authManager.getAddress()
  );

  const SecureVault = await ethers.getContractFactory("SecureVault");
  const vault = await SecureVault.deploy(await authManager.getAddress());
  await vault.waitForDeployment();

  console.log("SecureVault deployed at:", await vault.getAddress());
  console.log("Deployment completed successfully.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
