import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function ShippingPage() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [myName, setmyName] = useState("");
  const [customerName, setcustomerName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");
  const [orderStatus, setOrderStatus] = useState("Pending");
  const [loading, setLoading] = useState(false);

  const addItem = () => {
    setItems([...items, { productName: "", quantity: 1, price: 0 }]);
  };

  const removeItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const updateItem = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  const handleOrder = async () => {
    if (!myName ||!customerName|| !email || !address || !phone || items.length === 0) {
      toast.error("All fields are required!");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(import.meta.env.VITE_BACKEND_URL + "/api/orders", {
        myName, customerName,email, address, phone, orderItems: items, paymentMethod, orderStatus
      });

      if (response.status === 201) {
        toast.success("Order placed successfully!");
        setTimeout(() => navigate("/home/home"), 2000);
      }
    } catch (error) {
      toast.error("Failed to place order.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
      <Toaster />
      <h1 className="text-2xl font-bold text-center mb-4">Checkout</h1>

      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-3">Order Items</h2>
        {items.map((item, index) => (
          <div key={index} className="flex flex-col sm:flex-row sm:space-x-2 mb-4">
            <input type="text" placeholder="Product Name" className="border p-2 flex-1 mb-2 sm:mb-0" value={item.productName} onChange={(e) => updateItem(index, "productName", e.target.value)} />
            <input type="number" placeholder="Qty" className="border p-2 w-full sm:w-24" value={item.quantity} min="1" onChange={(e) => updateItem(index, "quantity", parseInt(e.target.value) || 1)} />
            <input type="number" placeholder="Price" className="border p-2 w-full sm:w-24" value={item.price} min="0" step="0.01" onChange={(e) => updateItem(index, "price", parseFloat(e.target.value) || 0)} />
            <button className="bg-red-500 text-white p-2 mt-2 sm:mt-0 sm:w-10 rounded" onClick={() => removeItem(index)}>X</button>
          </div>
        ))}
        <button className="mt-3 bg-blue-500 text-white p-2 rounded w-full sm:w-auto" onClick={addItem}>Add Item</button>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium mb-1">Enter Your Name</label>
        <input type="text" className="border p-2 w-full" value={myName} onChange={(e) => setmyName(e.target.value)} placeholder="Enter Your Name" />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium mb-1">Enter Customer Name</label>
        <input type="text" className="border p-2 w-full" value={customerName} onChange={(e) => setcustomerName(e.target.value)} placeholder="Enter Customer Name" />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium mb-1">Enter Your Email</label>
        <input type="email" className="border p-2 w-full" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium mb-1">Customer Address</label>
        <input type="text" className="border p-2 w-full" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Enter Customer address" />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium mb-1">Customer Phone Number</label>
        <input type="tel" className="border p-2 w-full" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Enter Customer phone number" />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium mb-1">Payment Method</label>
        <select className="border p-2 w-full" value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
          <option value="Cash on Delivery">Cash on Delivery</option>
        </select>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium mb-1">Order Status</label>
        <select className="border p-2 w-full" value={orderStatus} onChange={(e) => setOrderStatus(e.target.value)}>
          <option value="Pending">Pending</option>
        </select>
      </div>

      <button className={`bg-green-500 text-white p-2 rounded w-full ${loading ? "opacity-50 cursor-not-allowed" : ""}`} onClick={handleOrder} disabled={loading}>
        {loading ? "Placing Order..." : "Place Order"}
      </button>
    </div>
  );
}

//Success