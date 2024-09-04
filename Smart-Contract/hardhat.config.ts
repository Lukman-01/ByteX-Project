// import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";
dotenv.config();

// const config: HardhatUserConfig = {
//   solidity: "0.8.26",
//   networks: {
//     // for testnet
//     "lisk-sepolia": {
//       url: process.env.LISK_RPC_URL!,
//       accounts: [process.env.PRIVATE_KEY!],
//       gasPrice: 1000000000,
//     },
//   },
//   etherscan: {
//     // Use "123" as a placeholder, because Blockscout doesn't need a real API key, and Hardhat will complain if this property isn't set.
//     apiKey: {
//       "lisk-sepolia": "123",
//     },
//     customChains: [
//       {
//         network: "lisk-sepolia",
//         chainId: 4202,
//         urls: {
//           apiURL: "https://sepolia-blockscout.lisk.com/api",
//           browserURL: "https://sepolia-blockscout.lisk.com/",
//         },
//       },
//     ],
//   },
//   sourcify: {
//     enabled: false,
//   },
// };

// export default config;


require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config({ path: ".env" });

const { PRIVATE_KEY } = process.env;
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.26",
  networks: {
    swisstronik: {
      url: "https://json-rpc.testnet.swisstronik.com/", 
      accounts: [`0x${PRIVATE_KEY}`],
    },
  },
};

//  0x2224D97f78C719a83B08c3bdE14D7a8Fa8Ed3CF3