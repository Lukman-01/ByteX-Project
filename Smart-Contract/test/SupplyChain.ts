import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import hre, { ethers } from "hardhat";

describe("SupplyChain", function () {
  async function deploySupplyChain() {
    // Contracts are deployed using the first signer/account by default
    const [owner, transporter, consumer] = await hre.ethers.getSigners();

    // Deploy the SupplyChain contract
    const SupplyChain = await hre.ethers.getContractFactory("SupplyChain");
    const supplyChain = await SupplyChain.deploy();

    return { supplyChain, owner, transporter, consumer };
  }

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      const { supplyChain, owner } = await loadFixture(deploySupplyChain);

      expect(await supplyChain.owner()).to.equal(owner.address);
    });

    it("Should have a default creation fee", async function () {
      const { supplyChain } = await loadFixture(deploySupplyChain);

      const creationFee = await supplyChain.creationFee();
      expect(creationFee).to.equal(ethers.parseUnits("0.001", 18));
    });
  });

  describe("Product Management", function () {
    // it("Should add a product and emit ProductAdded event", async function () {
    //   const { supplyChain, owner, transporter, consumer } = await loadFixture(deploySupplyChain);

    //   const productName = "Test Product";
    //   const serialNumber = "SN12345";
    //   const destination = "123 Test St, Test City";
    //   const healthCondition = 0; // New

    //   const productId = ethers.keccak256(
    //     ethers.defaultPath.encode(
    //       ["string", "string", "address"],
    //       [productName, serialNumber, owner.address]
    //     )
    //   );

    //   await expect(
    //     supplyChain.addProduct(
    //       productName,
    //       serialNumber,
    //       transporter.address,
    //       consumer.address,
    //       healthCondition,
    //       destination,
    //       { value: ethers.parseUnits("0.001", 18) }
    //     )
    //   )
    //     .to.emit(supplyChain, "ProductAdded")
    //     .withArgs(productId, owner.address);

    //   const product = await supplyChain.getProduct(productId);
    //   expect(product.name).to.equal(productName);
    //   expect(product.serialNumber).to.equal(serialNumber);
    //   expect(product.status).to.equal(0); // Ordered
    //   expect(product.transporter).to.equal(transporter.address);
    //   expect(product.consumer).to.equal(consumer.address);
    //   expect(product.healthCondition).to.equal(healthCondition);
    //   expect(product.destination).to.equal(destination);
    // });

    it("Should revert if product creation fee is incorrect", async function () {
      const { supplyChain, transporter, consumer } = await loadFixture(deploySupplyChain);

      await expect(
        supplyChain.addProduct(
          "Product",
          "SN12345",
          transporter.address,
          consumer.address,
          0,
          "Destination",
          { value: ethers.parseUnits("0.0001", 18) } // Incorrect fee
        )
      ).to.be.revertedWithCustomError(supplyChain, "IncorrectFee");
    });

    it("Should revert if a product with the same ID already exists", async function () {
      const { supplyChain, owner, transporter, consumer } = await loadFixture(deploySupplyChain);

      const productName = "Test Product";
      const serialNumber = "SN12345";
      const destination = "123 Test St, Test City";

      await supplyChain.addProduct(
        productName,
        serialNumber,
        transporter.address,
        consumer.address,
        0,
        destination,
        { value: ethers.parseUnits("0.001", 18) }
      );

      await expect(
        supplyChain.addProduct(
          productName,
          serialNumber,
          transporter.address,
          consumer.address,
          0,
          destination,
          { value: ethers.parseUnits("0.001", 18) }
        )
      ).to.be.revertedWithCustomError(supplyChain, "ProductExists");
    });
  });

  describe("Status and Health Condition Updates", function () {
    // it("Should update status to InTransit by transporter", async function () {
    //   const { supplyChain, owner, transporter, consumer } = await loadFixture(deploySupplyChain);

    //   const productId = await supplyChain.addProduct(
    //     "Product",
    //     "SN12345",
    //     transporter.address,
    //     consumer.address,
    //     0,
    //     "Destination",
    //     { value: ethers.parseUnits("0.001", 18) }
    //   );

    //   await supplyChain.connect(transporter).updateStatusInTransit(productId);

    //   const product = await supplyChain.getProduct(productId);
    //   expect(product.status).to.equal(1); // InTransit
    // });

    // it("Should revert if non-transporter tries to update status to InTransit", async function () {
    //   const { supplyChain, owner, transporter, consumer } = await loadFixture(deploySupplyChain);

    //   const productId = await supplyChain.addProduct(
    //     "Product",
    //     "SN12345",
    //     transporter.address,
    //     consumer.address,
    //     0,
    //     "Destination",
    //     { value: ethers.parseUnits("0.001", 18) }
    //   );

    //   await expect(
    //     supplyChain.connect(consumer).updateStatusInTransit(productId)
    //   ).to.be.revertedWithCustomError(supplyChain, "NotAuthorized");
    // });

    // it("Should update status to Delivered by consumer", async function () {
    //   const { supplyChain, owner, transporter, consumer } = await loadFixture(deploySupplyChain);

    //   const productId = await supplyChain.addProduct(
    //     "Product",
    //     "SN12345",
    //     transporter.address,
    //     consumer.address,
    //     0,
    //     "Destination",
    //     { value: ethers.parseUnits("0.001", 18) }
    //   );

    //   await supplyChain.connect(transporter).updateStatusInTransit(productId);
    //   await supplyChain.connect(consumer).updateStatusDelivered(productId);

    //   const product = await supplyChain.getProduct(productId);
    //   expect(product.status).to.equal(2); // Delivered
    // });

    // it("Should revert if status transition is invalid", async function () {
    //   const { supplyChain, transporter, consumer } = await loadFixture(deploySupplyChain);

    //   const productId = await supplyChain.addProduct(
    //     "Product",
    //     "SN12345",
    //     transporter.address,
    //     consumer.address,
    //     0,
    //     "Destination",
    //     { value: ethers.parseUnits("0.001", 18) }
    //   );

    //   // Trying to set status to Delivered directly from Ordered
    //   await expect(
    //     supplyChain.connect(consumer).updateStatusDelivered(productId)
    //   ).to.be.revertedWithCustomError(supplyChain, "InvalidStatusTransition");
    // });

  //   it("Should update health condition by authorized user", async function () {
  //     const { supplyChain, owner, transporter, consumer } = await loadFixture(deploySupplyChain);

  //     const productId = await supplyChain.addProduct(
  //       "Product",
  //       "SN12345",
  //       transporter.address,
  //       consumer.address,
  //       0,
  //       "Destination",
  //       { value: ethers.parseUnits("0.001", 18) }
  //     );

  //     await supplyChain.connect(consumer).updateHealthCondition(productId, 2); // Damaged

  //     const product = await supplyChain.getProduct(productId);
  //     expect(product.healthCondition).to.equal(2); // Damaged
  //   });
  // });

  describe("Ownership and Authorization", function () {
    // it("Should allow owner to withdraw funds", async function () {
    //   const { supplyChain, owner, transporter, consumer } = await loadFixture(deploySupplyChain);

    //   await supplyChain.addProduct(
    //     "Product",
    //     "SN12345",
    //     transporter.address,
    //     consumer.address,
    //     0,
    //     "Destination",
    //     { value: ethers.parseUnits("0.001", 18) }
    //   );

    //   const ownerBalanceBefore = await ethers.provider.getBalance(owner.address);

    //   const tx = await supplyChain.withdrawFunds();
    //   const receipt = await tx.wait();

    //   const gasUsed = receipt.gasUsed.mul(receipt.effectiveGasPrice);

    //   const ownerBalanceAfter = await ethers.provider.getBalance(owner.address);
    //   expect(ownerBalanceAfter).to.equal(
    //     ownerBalanceBefore.add(ethers.parseUnits("0.001", 18)).sub(gasUsed)
    //   );
    // });

    it("Should revert if non-owner tries to withdraw funds", async function () {
      const { supplyChain, transporter } = await loadFixture(deploySupplyChain);

      await expect(
        supplyChain.connect(transporter).withdrawFunds()
      ).to.be.revertedWithCustomError(supplyChain, "NotOwner");
    });

    it("Should allow owner to update the creation fee", async function () {
      const { supplyChain, owner } = await loadFixture(deploySupplyChain);

      await supplyChain.updateCreationFee(ethers.parseUnits("0.002", 18));

      const creationFee = await supplyChain.creationFee();
      expect(creationFee).to.equal(ethers.parseUnits("0.002", 18));
    });
  });
})
});
