import hre from "hardhat";

async function main() {
  console.log("Starting deployment...");

  // Get viem clients (Hardhat v3 default)
  const publicClient = await hre.viem.getPublicClient();
  const [walletClient] = await hre.viem.getWalletClients();

  const deployer = walletClient.account.address;
  console.log("Deploying contracts with account:", deployer);

  // -------------------------------
  // Deploy AuthorizationManager
  // -------------------------------
  const authManager = await hre.viem.deployContract(
    "AuthorizationManager",
    [deployer]
  );

  console.log(
    "AuthorizationManager deployed at:",
    authManager.address
  );

  // -------------------------------
  // Deploy SecureVault
  // -------------------------------
  const vault = await hre.viem.deployContract(
    "SecureVault",
    [authManager.address]
  );

  console.log("SecureVault deployed at:", vault.address);

  console.log("Deployment completed successfully.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
