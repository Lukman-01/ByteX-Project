import "@rainbow-me/rainbowkit/styles.css";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import Navbar from "./Navbar";
import Modal from "./Modal";
import Sidebar from "./Sidebar";
import { useReadContract } from "wagmi";
import abi from "../constants/SupplyChain.json";
import { contractAddress } from "../constants/contractAddress";

export default function TrackingPage() {
  const [products, setProducts]: any = useState([]);
  const [showModal, setShowModal] = useState(false);

  const addProduct = (newProduct: any) => {
    setProducts([...products, newProduct]);
  };

  const updateProductStatus = (index: any, status: any) => {
    const updatedProducts = [...products];
    updatedProducts[index].status = status;
    setProducts(updatedProducts);
  };

  const result = useReadContract({
    abi: abi.abi,
    address: contractAddress,
    functionName: "getProduct",
    args: [
      "0x7706b20a76deb11ecdfdbb29297593256756867caed913c420b9b5560a6cc846",
    ],
  });

  useEffect(() => {
    console.log("Hello World");
    console.log(result);
  }, [result.data]);

  const data = [
    {
      id: 1,
      name: "Biro",
      serialNumber: "5B38Da6a701c568545dCfcB0FcB875f56beddC4",
      transp: "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4",
      status: "pending",
      statusupdate: ["pending", "intransit"],
    },
    {
      id: 2,
      name: "Car",
      serialNumber: "5B38Da6a701c568545dCfcB0FcB875f56beddC4",
      transp: "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4",
      status: "pending",
      statusupdate: ["pending", "intransit"],
    },
  ];

  return (
    <div className="flex flex-col md:flex-row min-h-screen dark:bg-black bg-muted/40 w-11/12">
      {/* Sidebar - Hidden on small screens */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Main content */}
      <div className="flex flex-col w-full p-4 sm:gap-4 md:pl-10 md:pt-6">
        <Navbar />
        <main className="flex-1 mt-6 p-2 md:p-4">
          {/* Header */}
          <div className="mb-6 text-center md:text-left">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Welcome to Supply Chain Tracker
            </h1>
            <p className="text-sm sm:text-lg text-gray-600 dark:text-gray-300">
              Our blockchain-based supply chain tracking system provides
              real-time visibility into the movement of your products.
            </p>
          </div>

          {/* Add Product Button */}
          <section className="mb-8 flex justify-center md:justify-end">
            <Button
              className="px-5 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg dark:shadow-slate-900 shadow-md hover:bg-gradient-to-l transition-transform transform hover:scale-105"
              onClick={() => setShowModal(true)}
            >
              Add New Product
            </Button>
          </section>

          {/* Product List */}
          <section>
            <div className="space-y-6">
              {data.map((item) => (
                <div
                  key={item.id}
                  className="bg-white dark:bg-gray-900 rounded-xl p-4 md:p-6 shadow-lg transition transform hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="flex flex-col sm:flex-row sm:justify-between">
                    {/* Product Details */}
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
                      <div className="relative group">
                        <p className="text-sm text-gray-500 font-semibold truncate max-w-[120px]">
                          {item.serialNumber}
                        </p>

                        {/* Tooltip - Full serial number */}
                        <span className="absolute left-0 hidden w-auto p-2 text-xs text-white bg-black rounded-lg group-hover:block dark:bg-gray-700 whitespace-nowrap">
                          {item.serialNumber}
                        </span>
                      </div>
                    </div>
                    <div className="mb-4 sm:mb-0">
                      <h3 className="text-md font-medium dark:text-white">
                        Transporter
                      </h3>
                      <div className="relative group">
                        <p className="text-sm text-gray-500 font-semibold truncate max-w-[120px]">
                          {item.transp}
                        </p>

                        {/* Tooltip - Full serial number */}
                        <span className="absolute left-0 hidden w-auto p-2 text-xs text-white bg-black rounded-lg group-hover:block dark:bg-gray-700 whitespace-nowrap">
                          {item.serialNumber}
                        </span>
                      </div>
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

      {/* Modal */}
      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        addProduct={addProduct}
      />
    </div>
  );
}
