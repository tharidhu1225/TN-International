import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";

const OrdersTable = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(import.meta.env.VITE_BACKEND_URL + "/api/orders");
      setOrders(response.data);
    } catch (error) {
      setError("Failed to fetch orders. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const deleteOrder = async (orderId) => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;

    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/orders/${orderId}`);
      toast.success("Order deleted successfully!");
      setOrders(orders.filter((order) => order._id !== orderId));
    } catch (error) {
      toast.error("Failed to delete order.");
    }
  };

  const updateOrder = async (orderId, updatedData) => {
    try {
      await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/orders/${orderId}`, updatedData);
      toast.success("Order updated successfully!");
      fetchOrders();
    } catch (error) {
      toast.error("Failed to update order.");
    }
  };

  const handleEdit = (order) => {
    const newStatus = prompt("Enter new order status:", order.orderStatus);
    const newTrackingNumber = prompt("Enter tracking number:", order.trackingNumber || "");

    if (newStatus && newTrackingNumber !== null) {
      updateOrder(order._id, { orderStatus: newStatus, trackingNumber: newTrackingNumber });
    }
  };

  return (
    <div className="container mx-auto p-6">
      <Toaster />
      <h2 className="text-2xl font-bold mb-4 text-center">All Orders</h2>

      {loading && <p>Loading orders...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="border p-3">#</th>
                <th className="border p-3">My Name</th>
                <th className="border p-3">Customer Name</th>
                <th className="border p-3">Email</th>
                <th className="border p-3">Address</th>
                <th className="border p-3">Phone</th>
                <th className="border p-3">Order Items</th>
                <th className="border p-3">Payment Method</th>
                <th className="border p-3">Payment Status</th>
                <th className="border p-3">Order Status</th>
                <th className="border p-3">Tracking Number</th>
                <th className="border p-3">Date</th>
                <th className="border p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={order._id} className="border-t text-center">
                  <td className="border p-3">{index + 1}</td>
                  <td className="border p-3">{order.myName}</td>
                  <td className="border p-3">{order.customerName}</td>
                  <td className="border p-3">{order.email}</td>
                  <td className="border p-3">{order.address}</td>
                  <td className="border p-3">{order.phone}</td>
                  <td className="border p-3">
                    {order.orderItems.map((item, i) => (
                      <div key={i}>
                        {item.productName} (x{item.quantity}) - LKR.{item.price}
                      </div>
                    ))}
                  </td>
                  <td className="border p-3">{order.paymentMethod}</td>
                  <td className="border p-3">{order.paymentStatus}</td>
                  <td className="border p-3">{order.orderStatus}</td>
                  <td className="border p-3">{order.trackingNumber || "N/A"}</td>
                  <td className="border p-3">
                    {new Date(order.date).toLocaleDateString()}
                  </td>
                  <td className="border p-3">
                    <div className="flex space-x-2 justify-center">
                      <button className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition" onClick={() => handleEdit(order)}>
                        <FaEdit />
                      </button>
                      <button className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600 transition" onClick={() => deleteOrder(order._id)}>
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default OrdersTable;
