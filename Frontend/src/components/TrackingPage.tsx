import "@rainbow-me/rainbowkit/styles.css";
import { useState } from "react";
import { Button } from "./ui/button";
import Navbar from "./Navbar";
import Modal from "./Modal";
import Sidebar from "./Sidebar";

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
    {
      id: 3,
      name: "shoes",
      serialNumber: "5B38Da6a701c568545dCfcB0FcB875f56beddC4",
      transp: "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4",
      status: "pending",
    },
  ];

  return (
    <div className="flex min-h-screen dark:text-black w-full bg-muted/40">
      <div className="hidden md:block">
        <Sidebar />
      </div>
      <div className="flex flex-col sm:gap-x-9 sm:py-4 sm:pl-14">
        <Navbar />
        <main className="grid flex-1 mt-9 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <section>
            <h2 className="text-3xl font-bold mb-4">
              Welcome to Supply Chain Tracker
            </h2>
            <p className="text-lg text-muted-foreground mb-4">
              Our blockchain-based supply chain tracking system provides
              real-time visibility into the movement of your products.
            </p>
          </section>
          <section className="mb-8 flex justify-end">
            <Button
              className="relative  px-6 py-3 bg-[#a405cc] text-white font-semibold rounded-lg shadow-md hover:bg-[#bc0ae9] focus:outline-none focus:ring-opacity-75 transition-transform transform hover:scale-105"
              onClick={() => setShowModal(true)}
            >
              <span className="absolute inset-0  opacity-0 transition-opacity duration-300 rounded-lg hover:opacity-10"></span>
              Add New Product
            </Button>
          </section>
          <section>
            <div className="mx-auto space-y-6">
              {data.map((item) => (
                <div
                  key={item.id}
                  className="bg-white dark:bg-gray-900 dark:shadow-xl shadow-lg rounded-lg p-6 transition transform hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="flex justify-between items-center space-x-6">
                    <div className="space-y-1">
                      <h3 className="text-md font-medium text-gray-900">
                        Product
                      </h3>
                      <p className="text-sm text-gray-500">{item.name}</p>
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-md font-medium text-gray-900">
                        Serial Number
                      </h3>
                      <p className="text-sm text-gray-500 font-semibold">
                        {item.serialNumber}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-md font-medium text-gray-900">
                        Transporter
                      </h3>
                      <p className="text-sm text-gray-500 font-semibold">
                        {item.transp}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-md font-medium text-gray-900">
                        Status
                      </h3>
                      <p className="text-sm text-green-500 font-semibold">
                        {item.status}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-md font-medium text-gray-900">
                        Action
                      </h3>
                      <p className="text-sm text-gray-500 font-semibold">
                        <select className="border border-gray-300 rounded">
                          <option className="p-2">pending</option>
                          <option className="p-2">intransit</option>
                          <option className="p-2">delivered</option>
                        </select>
                      </p>
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
        addProduct={addProduct}
      />
    </div>
  );
}

function MoveVerticalIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="8 18 12 22 16 18" />
      <polyline points="8 6 12 2 16 6" />
      <line x1="12" x2="12" y1="2" y2="22" />
    </svg>
  );
}
