require("@nomicfoundation/hardhat-toolbox");
require("@openzeppelin/hardhat-upgrades");
require('dotenv').config()

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.20",
  networks: {
    mumbai: {
      url: process.env.URL,
      accounts: [process.env.IDENTITY_PK],
    }
  },
  etherscan: {
    apiKey: process.env.API_KEY
  }
};
