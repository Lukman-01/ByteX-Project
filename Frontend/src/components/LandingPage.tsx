/**
 * v0 by Vercel.
 * @see https://v0.dev/t/AOQc8dBWVhd
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "./ui/table";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "./ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

export default function LandingPage() {
  const [walletConnected, setWalletConnected] = useState(false);
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    status: "",
    location: "",
    serialNumber: "",
  });
  const [showModal, setShowModal] = useState(false);
  const connectWallet = () => {
    setWalletConnected(true);
  };

  const handleInputChange = (e: any) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };
  const addProduct = () => {
    // setProducts([...products, newProduct]);
    setNewProduct({
      name: "",
      status: "",
      location: "",
      serialNumber: "",
    });
    setShowModal(false);
  };
  const updateProductStatus = (index: any, status: any) => {
    const updatedProducts = [...products];
    // updatedProducts[index].status = status
    setProducts(updatedProducts);
  };
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-green-700 text-primary-foreground py-4 px-6">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Supply Chain Tracker</h1>
          {/* {!walletConnected && (
            <Button onClick={connectWallet}>Connect Wallet</Button>
          )} */}
        </div>
      </header>
      <main className="flex-1 py-8 px-6">
        <div className="container mx-auto">
          <section className="mb-8">
            <h2 className="text-3xl font-bold mb-4">
              Welcome to Supply Chain Tracker
            </h2>
            <p className="text-lg text-muted-foreground mb-4">
              Our blockchain-based supply chain tracking system provides
              real-time visibility into the movement of your products.
            </p>
            <Button onClick={() => setShowModal(true)}>Add New Product</Button>
          </section>
          <section>
            <h2 className="text-2xl font-bold mb-4">Tracked Products</h2>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Serial Number</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product, index) => (
                  <TableRow key={index}>
                    {/* <TableCell>{product.name}</TableCell>
                    <TableCell>{product.status}</TableCell>
                    <TableCell>{product.location}</TableCell>
                    <TableCell>{product.serialNumber}</TableCell> */}
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button size="icon" variant="outline">
                            <MoveVerticalIcon className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() =>
                              updateProductStatus(index, "Shipped")
                            }
                          >
                            Mark as Shipped
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              updateProductStatus(index, "Delivered")
                            }
                          >
                            Mark as Delivered
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </section>
        </div>
      </main>
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="sm:max-w-md text-black">
          <DialogHeader>
            <DialogTitle>Add New Product</DialogTitle>
            <DialogDescription>
              Enter the details of the new product you want to track.
            </DialogDescription>
          </DialogHeader>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              addProduct();
            }}
          >
            <div className="grid gap-4 space-y-5">
              <div className="grid gap-1">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={newProduct.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="grid gap-1">
                <Label htmlFor="status">Status</Label>
                <Input
                  id="status"
                  name="status"
                  value={newProduct.status}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="grid gap-1">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  name="location"
                  value={newProduct.location}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="grid gap-1">
                <Label htmlFor="serialNumber">Serial Number</Label>
                <Input
                  id="serialNumber"
                  name="serialNumber"
                  value={newProduct.serialNumber}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Add Product</Button>
              <div>
                <Button variant="outline">Cancel</Button>
              </div>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
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
