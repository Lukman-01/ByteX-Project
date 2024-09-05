import hre, { ethers } from "hardhat"; // Import ethers from hardhat
import { encryptDataField, decryptNodeResponse } from "@swisstronik/utils";

const sendShieldedQuery = async (provider, destination, data) => {
  const rpclink = hre.network.config.url;
  const [encryptedData, usedEncryptedKey] = await encryptDataField(rpclink, data);
  const response = await provider.call({
    to: destination,
    data: encryptedData,
  });
  return await decryptNodeResponse(rpclink, response, usedEncryptedKey);
};

async function main() {
  const contractAddress = "0xFc1169dEaF7D43DC80fB924DCCdCf8A184791c6a";
  const [signer] = await hre.ethers.getSigners();
  const contractFactory = await hre.ethers.getContractFactory("SupplyChain");
  const contract = contractFactory.attach(contractAddress);
  const functionName = "creationFee";
  const responseMessage = await sendShieldedQuery(signer.provider, contractAddress, contract.interface.encodeFunctionData(functionName));
  console.log("Decoded response:", contract.interface.decodeFunctionResult(functionName, responseMessage)[0]);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
