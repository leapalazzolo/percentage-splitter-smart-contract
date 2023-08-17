import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.17",
  networks: {
    hardhat: {},
    mainnet: {
      accounts: [`${process.env.PRIVATE_KEY}`],
      url: "https://eth.llamarpc.com",
    },
    sepolia: {
      chainId: 11155111,
      url: "https://eth-sepolia.public.blastapi.io",
      accounts: [`${process.env.PRIVATE_KEY}`],
    },
    goerli: {
      chainId: 5,
      url: "https://goerli.blockpi.network/v1/rpc/public",
      accounts: [`${process.env.PRIVATE_KEY}`],
    },
    polygon: {
      chainId: 137,
      url: "https://polygon.llamarpc.com",
      accounts: [`${process.env.PRIVATE_KEY}`],
    },
    mumbai: {
      chainId: 80001,
      url: "https://polygon-mumbai.blockpi.network/v1/rpc/public",
      accounts: [`${process.env.PRIVATE_KEY}`],
    },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
};

export default config;
