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
  const contractAddress = "0x6E76a6C99cBDBf9d32D248907842707D52309f3e";
  const [signer] = await hre.ethers.getSigners();
  const contractFactory = await hre.ethers.getContractFactory("SupplyChain");
  const contract = contractFactory.attach(contractAddress);
  const functionName = "updateCreationFee";
  const messageToSet = 2;
  const setMessageTx = await sendShieldedTransaction(signer, contractAddress, contract.interface.encodeFunctionData(functionName, [messageToSet]), 0);
  await setMessageTx.wait();
  console.log("Transaction Receipt: ", setMessageTx);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});