require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  networks:{
    hardhat: {
      chainId: 1337,
    },
  },
  solidity: "0.8.17",
};
