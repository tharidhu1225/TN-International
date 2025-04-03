import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function CheckoutPage() {
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
    if (!myName || !customerName || !email || !address || !phone || items.length === 0) {
      toast.error("All fields are required!");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(import.meta.env.VITE_BACKEND_URL + "/api/orders", {
        myName,
        customerName,
        email,
        address,
        phone,
        orderItems: items,
        paymentMethod,
        orderStatus,
      });

      if (response.status === 201) {
        toast.success("Order placed successfully!");
        setTimeout(() => navigate("/"), 2000);
      }
    } catch (error) {
      toast.error("Failed to place order.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 sm:p-8 bg-white shadow-lg rounded-lg">
      <Toaster />
      <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Checkout</h1>

      {/* Order Items Section */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-3">Order Items</h2>
        {items.map((item, index) => (
          <div key={index} className="flex flex-col sm:flex-row items-center sm:space-x-2 mb-4 bg-gray-100 p-3 rounded-lg">
            <input
              type="text"
              placeholder="Product Name"
              className="border border-gray-300 p-2 rounded-md flex-1"
              value={item.productName}
              onChange={(e) => updateItem(index, "productName", e.target.value)}
            />
            <input
              type="number"
              placeholder="Qty"
              className="border border-gray-300 p-2 w-20 rounded-md"
              value={item.quantity}
              min="1"
              onChange={(e) => updateItem(index, "quantity", parseInt(e.target.value) || 1)}
            />
            <input
              type="number"
              placeholder="Price"
              className="border border-gray-300 p-2 w-24 rounded-md"
              value={item.price}
              min="0"
              step="0.01"
              onChange={(e) => updateItem(index, "price", parseFloat(e.target.value) || 0)}
            />
            <button
              className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-md transition duration-200"
              onClick={() => removeItem(index)}
            >
              ✖
            </button>
          </div>
        ))}
        <button
          className="mt-3 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-md w-full sm:w-auto transition duration-200"
          onClick={addItem}
        >
          + Add Item
        </button>
      </div>

      {/* Customer Details */}
      {[
        { label: "Enter Your Name", value: myName, setter: setmyName },
        { label: "Enter Customer Name", value: customerName, setter: setcustomerName },
        { label: "Enter Your Phone Number", value: email, setter: setEmail },
        { label: "Customer Address", value: address, setter: setAddress },
        { label: "Customer Phone Number", value: phone, setter: setPhone },
      ].map((field, index) => (
        <div className="mb-4" key={index}>
          <label className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
          <input
            type="text"
            className="border border-gray-300 p-2 w-full rounded-md focus:ring-2 focus:ring-blue-500"
            value={field.value}
            onChange={(e) => field.setter(e.target.value)}
            placeholder={field.label}
          />
        </div>
      ))}

      {/* Payment & Order Status */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
          <select
            className="border border-gray-300 p-2 w-full rounded-md"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <option value="Cash on Delivery">Cash on Delivery</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Order Status</label>
          <select
            className="border border-gray-300 p-2 w-full rounded-md"
            value={orderStatus}
            onChange={(e) => setOrderStatus(e.target.value)}
          >
            <option value="Pending">Pending</option>
          </select>
        </div>
      </div>

      {/* Place Order Button */}
      <button
        className={`bg-green-500 hover:bg-green-600 text-white p-3 rounded-md w-full font-semibold transition duration-200 ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={handleOrder}
        disabled={loading}
      >
        {loading ? (
          <div className="flex items-center justify-center space-x-2">
            <div className="w-4 h-4 bg-white rounded-full animate-bounce"></div>
            <div className="w-4 h-4 bg-white rounded-full animate-bounce delay-150"></div>
            <div className="w-4 h-4 bg-white rounded-full animate-bounce delay-300"></div>
          </div>
        ) : (
          "Place Order"
        )}
      </button>
    </div>
  );
}
