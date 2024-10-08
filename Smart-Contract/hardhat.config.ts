// import { HardhatUserConfig } from "hardhat/config";
// import "@nomicfoundation/hardhat-toolbox";
// import * as dotenv from "dotenv";
// dotenv.config();

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
  defaultNetwork: "swisstronik",
  solidity: "0.8.26",
  networks: {
    swisstronik: {
      url: "https://json-rpc.testnet.swisstronik.com/", 
      accounts: [`0x${PRIVATE_KEY}`],
    },
  },
  etherscan: {
    apiKey: `ANY_STRING_WILL_DO`,
    customChains: [
      {
        network: "swisstronik",
        chainId: 1291,
        urls: {
          apiURL: "https://explorer-evm.testnet.swisstronik.com/api",
          browserURL: "https://explorer-evm.testnet.swisstronik.com",
        },
      },
    ],
  },
};
<<<<<<< HEAD
=======

0xFc1169dEaF7D43DC80fB924DCCdCf8A184791c6a
>>>>>>> b669eed (update)
