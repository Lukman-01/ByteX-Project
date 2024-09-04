import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "./ui/dialog";
import { useState } from "react"
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

function Modal({ showModal, setShowModal, addProduct }:any) {
    const [newProduct, setNewProduct] = useState({
        name: "",
        status: "",
        location: "",
        serialNumber: "",
      })
    
      const handleInputChange = (e:any) => {
        setNewProduct({ ...newProduct, [e.target.name]: e.target.value })
      }

  return (
    <div>
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="sm:max-w-md text-black bg-white shadow-lg rounded-lg p-6">
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
                <Label htmlFor="name">Product Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={newProduct.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
             
              <div className="grid gap-1">
                <Label htmlFor="status">Serial Number</Label>
                <Input
                  id="status"
                  name="status"
                  value={newProduct.status}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="grid gap-1">
                <Label htmlFor="location">Transporter</Label>
                <Input
                  id="location"
                  name="location"
                  value={newProduct.location}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="grid gap-1">
                <Label htmlFor="serialNumber">Product Health Condition</Label>
                <Input
                  id="serialNumber"
                  name="serialNumber"
                  value={newProduct.serialNumber}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="grid gap-1">
                <Label htmlFor="serialNumber">Customer</Label>
                <Input
                  id="serialNumber"
                  name="serialNumber"
                  value={newProduct.serialNumber}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="grid gap-1">
                <Label htmlFor="serialNumber">Destination</Label>
                <Input
                  id="serialNumber"
                  name="serialNumber"
                  value={newProduct.serialNumber}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <DialogFooter className="mt-4 flex justify-between">
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

export default Modal;
