# Supply Chain Management Smart Contract

## 1. **Introduction**
The Supply Chain Management Smart Contract is a decentralized application built on the Ethereum blockchain, designed to streamline and improve transparency in tracking product movements, statuses, and conditions across the supply chain. The contract allows manufacturers, transporters, and consumers to monitor the status and health of products at every stage of the supply chain.

## 4. **Smart Contract Setup, Config, Deployment, and Interaction**

### Prerequisites
1. **Hardhat**: Ensure that you have Hardhat installed.
2. **Node.js**: You’ll need Node.js and npm installed.
3. **MetaMask**: A wallet for deploying the contract on a testnet/mainnet.
4. **Private Key**: You need your private key stored in an `.env` file for deployment.
5. **Swisstronik utilities**: You’ll use `@swisstronik/utils` for encryption and interaction with the Swisstronik network.

### Setting Up the Contract

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Lukman-01/ByteX-Project.git
   cd Smart-Contract
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Create `.env` file**:
   Set up your `.env` file with the following content:
   ```
   PRIVATE_KEY=your_private_key_here
   ```

4. **Configure Hardhat**:
   The Hardhat configuration is already set up in `hardhat.config.js`. It includes:
   - **Swisstronik testnet URL**: `https://json-rpc.testnet.swisstronik.com/`
   - Your private key for account management.

### Hardhat Config:
```javascript
require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config({ path: ".env" });

const { PRIVATE_KEY } = process.env;

module.exports = {
  solidity: "0.8.26",
  networks: {
    swisstronik: {
      url: "https://json-rpc.testnet.swisstronik.com/", 
      accounts: [`0x${PRIVATE_KEY}`],
    },
  },
};
```

### Deploy the Smart Contract

1. **Compile the Contract**:
   Run the following command to compile the Solidity contract:
   ```bash
   npx hardhat compile
   ```

2. **Deploy the Contract**:

   Run the deployment script:
   ```bash
   npx hardhat ignition deploy ./ignition/modules/deploy.ts --network swisstronik
   ```