import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";


const SupplyChainModule = buildModule("SupplyChainModule", (m) => {

  const supplyChain = m.contract("SupplyChain");

  return { supplyChain };
});

export default SupplyChainModule;


// contract add: 0x7a298514739C0F45DBB9199b9CBaEdD3507A7283
