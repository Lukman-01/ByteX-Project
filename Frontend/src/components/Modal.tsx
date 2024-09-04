import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "./ui/dialog";
import { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useWriteContract } from "wagmi";
import abi from "../constants/SupplyChain.json";
import { contractAddress } from "../constants/contractAddress";
import { parseEther } from "viem";
import { watchContractEvent } from '@wagmi/core'
import { config } from "../../config";


// addProduct

function Modal({ showModal, setShowModal, addProduct }: any) {
  const [newProduct, setNewProduct] = useState({
    name: "",
    serialNumber: "",
    transporter: "",
    health: "",
    customer: "",
    destination: "",
  });

  const unwatch = watchContractEvent(config, {
    address: '0x6b175474e89094c44da98b954eedeac495271d0f',
    abi: abi.abi,
    eventName: 'ProductAdded',
    onLogs(logs) {
      console.log('New logs!', logs)
    },
  })
  unwatch()

  const { writeContract, data } = useWriteContract();

  const handleInputChange = (e: any) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const handleCreateProduct = (e: any) => {
    e.preventDefault();
    console.log(abi.abi);
    writeContract(
      {
        abi: abi.abi,
        address: contractAddress,
        functionName: "addProduct",
        args: [
          newProduct.name,
          newProduct.serialNumber,
          "0x2224D97f78C719a83B08c3bdE14D7a8Fa8Ed3CF3",
          "0x2224D97f78C719a83B08c3bdE14D7a8Fa8Ed3CF3",
          newProduct.status,
          newProduct.location,
        ],
        value: parseEther("0.001"),
      },
      {
        onError: (e) => {
          console.log(e);
        },
      }
    );

    console.log(data);
  };

  return (
    <div>
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="sm:max-w-md text-black dark:text-white bg-white shadow-lg rounded-lg p-6">
          <DialogHeader>
            <DialogTitle>Add New Product</DialogTitle>
            <DialogDescription>
              Enter the details of the new product you want to track.
            </DialogDescription>
          </DialogHeader>
          <form
            onSubmit={(e) => {
              handleCreateProduct(e);
            }}
          >
            <div className="grid gap-4 space-y-2">
              <div className="grid gap-1">
                <Label htmlFor="name">Product Name</Label>
                <input
                  id="name"
                  className="outline-none dark:text-white rounded-md dark:bg-gray-900 dark:shadow-lg w-full border py-1 px-1"
                  name="name"
                  value={newProduct.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="grid gap-1">
                <Label htmlFor="serial">Serial Number</Label>
                <input
                  id="serial"
                  className="outline-none dark:text-white rounded-md dark:bg-gray-900 dark:shadow-lg w-full border py-1 px-1"
                  name="serial"
                  value={newProduct.serialNumber}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="grid gap-1">
                <Label htmlFor="transporter">Transporter</Label>
                <input
                  id="transporter"
                  className="outline-none dark:text-white rounded-md dark:bg-gray-900 dark:shadow-lg w-full border py-1 px-1 "
                  name="transporter"
                  value={newProduct.transporter}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="grid gap-1">
                <Label htmlFor="health">Product Health Condition</Label>
                <input
                  id="health"
                  className="outline-none dark:text-white rounded-md dark:bg-gray-900 dark:shadow-lg w-full border py-1 px-1 "
                  name="health"
                  value={newProduct.health}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="grid gap-1">
                <Label htmlFor="customer">Customer</Label>
                <input
                  id="customer"
                  className="outline-none dark:text-white rounded-md dark:bg-gray-900 dark:shadow-lg w-full border py-1 px-1 "
                  name="customer"
                  value={newProduct.customer}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="grid gap-1">
                <Label htmlFor="destination">Destination</Label>
                <input
                  id="destination"
                  className="outline-none dark:text-white rounded-md dark:bg-gray-900 dark:shadow-lg w-full border py-1 px-1 "
                  name="destination"
                  value={newProduct.destination}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <DialogFooter className="mt-4 flex justify-between">
              <Button type="submit" className="register dark:text-white">
                Add Product
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Modal;
