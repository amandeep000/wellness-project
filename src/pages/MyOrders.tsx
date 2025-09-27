import { useEffect, useState } from "react";
import api from "../api/axios";
import { useGetUserOrders } from "../hooks/useUpdateProfile";
import Loader from "../components/Loader";

export default function MyOrdersPage() {
  const [error, setError] = useState("");
  const { data: orders, isLoading } = useGetUserOrders();

  if (isLoading)
    return (
      <div className="w-full m-auto min-h-screen flex justify-center items-center">
        <Loader />
      </div>
    );
  if (error)
    return <p className="mt-16 text-center text-red-600">⚠ {error}</p>;
  if (!orders?.length) {
    return <p className="mt-16 text-center">You don’t have any orders yet.</p>;
  }

  return (
    <section className="max-w-4xl mx-auto px-4 py-10 text-black">
      <h1 className="text-3xl font-semibold mb-6">My Orders</h1>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-black">
              <th className="py-2 pr-3 text-left font-medium">#</th>
              <th className="py-2 pr-3 text-left font-medium">Date</th>
              <th className="py-2 pr-3 text-left font-medium">Status</th>
              <th className="py-2 pr-3 text-left font-medium">Items</th>
              <th className="py-2 text-left font-medium">Total (₹)</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((o, i) => {
              const total = o.orderItems.reduce(
                (sum, it) => sum + it.productPrice * it.productQuantity,
                0
              );
              return (
                <tr key={o._id} className="border-b last:border-b-0">
                  <td className="py-2 pr-3 font-mono">{i + 1}</td>
                  <td className="py-2 pr-3">
                    {new Date(o.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-2 pr-3">{o.orderStatus}</td>
                  <td className="py-2 pr-3 font-mono">{o.orderItems.length}</td>
                  <td className="py-2 font-mono">{total.toFixed(2)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
