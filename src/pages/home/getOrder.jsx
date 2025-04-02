import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = () => {
    setLoading(true);
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/orders`)
      .then((res) => {
        setOrders(res.data);
        setLoading(false);
      })
      .catch(() => {
        toast.error("Error loading orders");
        setLoading(false);
      });
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold text-center mb-4">Orders</h1>
      {loading ? (
        <div className="text-center text-gray-500">Loading orders...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-md">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="px-4 py-2 text-left">Customer</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Phone</th>
                <th className="px-4 py-2 text-left">Order Items</th>
                <th className="px-4 py-2 text-left">Total Price</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Payment</th>
                <th className="px-4 py-2 text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2">{order.customerName}</td>
                  <td className="px-4 py-2">{order.email}</td>
                  <td className="px-4 py-2">{order.phone}</td>
                  <td className="px-4 py-2">
                    <ul>
                      {order.orderItems.map((item, index) => (
                        <li key={index}>{item.productName} (x{item.quantity})</li>
                      ))}
                    </ul>
                  </td>
                  <td className="px-4 py-2">LKR. {order.orderItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}</td>
                  <td className="px-4 py-2 font-semibold">{order.orderStatus}</td>
                  <td className="px-4 py-2">{order.paymentStatus}</td>
                  <td className="px-4 py-2">{new Date(order.date).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
