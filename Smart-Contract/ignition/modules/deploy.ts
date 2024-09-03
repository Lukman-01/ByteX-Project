import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";


const SupplyChainModule = buildModule("SupplyChainModule", (m) => {

  const supplyChain = m.contract("SupplyChain");

  return { supplyChain };
});

export default SupplyChainModule;


// contract add: 0x80bE4B8A31f4c54371D6563C61E1fb7317F506Af
