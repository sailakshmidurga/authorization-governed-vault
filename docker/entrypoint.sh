#!/bin/sh
set -e

echo "Waiting for blockchain..."
sleep 5

echo "Compiling contracts..."
npx hardhat compile

echo "Deploying contracts..."
npx hardhat run scripts/deploy.js --network localhost

echo "All contracts deployed successfully."
