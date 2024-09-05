import "@rainbow-me/rainbowkit/styles.css";
import { useEffect, useState } from "react";
import Web3 from "web3";
import { SwisstronikPlugin } from "@swisstronik/web3-plugin-swisstronik";
import { Button } from "./ui/button";
import Navbar from "./Navbar";
import Modal from "./Modal";
import Sidebar from "./Sidebar";
import abi from "../constants/SupplyChain.json";
import { contractAddress } from "../constants/contractAddress";

export default function TrackingPage() {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    serialNumber: "",
    transporter: "",
    consumer: "",
    healthCondition: 0,
    destination: "",
  });

  // Initialize Web3.js and Swisstronik plugin
  const web3 = new Web3("https://json-rpc.testnet.swisstronik.com/");
  web3.registerPlugin(new SwisstronikPlugin());
  const contract = new web3.eth.Contract(abi.abi, contractAddress);

  // Load products from the smart contract
  const loadProducts = async () => {
    try {
      const productsOnChain = await contract.methods.getAllProducts().call();
      setProducts(productsOnChain);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Add new product to the contract
  const addProductToChain = async (product) => {
    try {
      const [account] = await web3.eth.getAccounts(); // Get the user's wallet address

      const tx = {
        from: account,
        to: contractAddress,
        data: contract.methods
          .addProduct(
            product.name,
            product.serialNumber,
            product.transporter,
            product.consumer,
            product.healthCondition,
            product.destination
          )
          .encodeABI(),
        value: web3.utils.toWei("0.001", "ether"), // Send 0.001 ETH as creation fee
      };

      // Send the shielded transaction using the Swisstronik plugin
      const receipt = await web3.swisstronik.sendTransaction(tx);
      console.log("Transaction successful:", receipt);

      // After successful transaction, fetch the updated list of products
      loadProducts();
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  // Handle form submission to add a new product
  const handleFormSubmit = (e) => {
    e.preventDefault();
    addProductToChain(newProduct);
    setShowModal(false);
  };

  useEffect(() => {
    loadProducts(); // Load products when the component mounts
  }, []);

  return (
    <div className="flex flex-col md:flex-row min-h-screen dark:bg-black bg-muted/40 w-11/12">
      <div className="hidden md:block">
        <Sidebar />
      </div>

      <div className="flex flex-col w-full p-4 sm:gap-4 md:pl-10 md:pt-6">
        <Navbar />
        <main className="flex-1 mt-6 p-2 md:p-4">
          <div className="mb-6 text-center md:text-left">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Welcome to Supply Chain Tracker
            </h1>
            <p className="text-sm sm:text-lg text-gray-600 dark:text-gray-300">
              Our blockchain-based supply chain tracking system provides
              real-time visibility into the movement of your products.
            </p>
          </div>

          <section className="mb-8 flex justify-center md:justify-end">
            <Button
              className="px-5 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg dark:shadow-slate-900 shadow-md hover:bg-gradient-to-l transition-transform transform hover:scale-105"
              onClick={() => setShowModal(true)}
            >
              Add New Product
            </Button>
          </section>

          <section>
            <div className="space-y-6">
              {products.map((item, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-900 rounded-xl p-4 md:p-6 shadow-lg transition transform hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="flex flex-col sm:flex-row sm:justify-between">
                    <div className="mb-4 sm:mb-0">
                      <h3 className="text-md font-medium dark:text-white">
                        Product
                      </h3>
                      <p className="text-sm text-gray-500">{item.name}</p>
                    </div>
                    <div className="mb-4 sm:mb-0">
                      <h3 className="text-md font-medium dark:text-white">
                        Serial Number
                      </h3>
                      <p className="text-sm text-gray-500 font-semibold">
                        {item.serialNumber}
                      </p>
                    </div>
                    <div className="mb-4 sm:mb-0">
                      <h3 className="text-md font-medium dark:text-white">
                        Transporter
                      </h3>
                      <p className="text-sm text-gray-500 font-semibold">
                        {item.transporter}
                      </p>
                    </div>

                    <div className="mb-4 sm:mb-0">
                      <h3 className="text-md font-medium dark:text-white">
                        Status
                      </h3>
                      <p className="text-sm text-green-500 font-semibold">
                        {item.status}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-md font-medium dark:text-white">
                        Action
                      </h3>
                      <select className="border p-2 border-gray-300 rounded dark:bg-gray-800 dark:border-gray-600">
                        <option>pending</option>
                        <option>intransit</option>
                        <option>delivered</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>

      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        addProduct={addProductToChain}
      >
        <form onSubmit={handleFormSubmit}>
          <input
            type="text"
            placeholder="Product Name"
            value={newProduct.name}
            onChange={(e) =>
              setNewProduct({ ...newProduct, name: e.target.value })
            }
            required
          />
          <input
            type="text"
            placeholder="Serial Number"
            value={newProduct.serialNumber}
            onChange={(e) =>
              setNewProduct({ ...newProduct, serialNumber: e.target.value })
            }
            required
          />
          <input
            type="text"
            placeholder="Transporter Address"
            value={newProduct.transporter}
            onChange={(e) =>
              setNewProduct({ ...newProduct, transporter: e.target.value })
            }
            required
          />
          <input
            type="text"
            placeholder="Consumer Address"
            value={newProduct.consumer}
            onChange={(e) =>
              setNewProduct({ ...newProduct, consumer: e.target.value })
            }
            required
          />
          <input
            type="text"
            placeholder="Destination"
            value={newProduct.destination}
            onChange={(e) =>
              setNewProduct({ ...newProduct, destination: e.target.value })
            }
            required
          />
          <select
            value={newProduct.healthCondition}
            onChange={(e) =>
              setNewProduct({
                ...newProduct,
                healthCondition: Number(e.target.value),
              })
            }
            required
          >
            <option value={0}>New</option>
            <option value={1}>Good</option>
            <option value={2}>Damaged</option>
          </select>
          <Button type="submit">Submit</Button>
        </form>
      </Modal>
    </div>
  );
}
