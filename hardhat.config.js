require("@nomicfoundation/hardhat-ethers");

module.exports = {
  solidity: "0.8.20",
  networks: {
    localhost: {
      url: "http://blockchain:8545",
    },
  },
};
