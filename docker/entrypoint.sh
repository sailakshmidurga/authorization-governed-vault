#!/bin/sh
set -e

echo "Installing & compiling contracts..."
npx hardhat compile

echo "Entrypoint completed."
