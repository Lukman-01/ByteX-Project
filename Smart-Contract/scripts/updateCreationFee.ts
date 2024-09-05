import hre, { ethers } from "hardhat"; // Import ethers from hardhat
import { encryptDataField, decryptNodeResponse } from "@swisstronik/utils";

const sendShieldedTransaction = async (signer, destination, data, value) => {
  const rpclink = hre.network.config.url;
  const [encryptedData] = await encryptDataField(rpclink, data);
  return await signer.sendTransaction({
    from: signer.address,
    to: destination,
    data: encryptedData,
    value,
  });
};

async function main() {
  const contractAddress = "0xFc1169dEaF7D43DC80fB924DCCdCf8A184791c6a";
  const [signer] = await hre.ethers.getSigners();
  const contractFactory = await hre.ethers.getContractFactory("SupplyChain");
  const contract = contractFactory.attach(contractAddress);
  const functionName = "updateCreationFee";
  const messageToSet = 1;
  const setMessageTx = await sendShieldedTransaction(signer, contractAddress, contract.interface.encodeFunctionData(functionName, [messageToSet]), 0);
  await setMessageTx.wait();
  console.log("Transaction Receipt: ", setMessageTx);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});