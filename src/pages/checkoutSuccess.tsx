// src/pages/CheckoutSuccess.tsx
import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function CheckoutSuccess() {
  const [order, setOrder] = useState<any>(null);
  const [params] = useSearchParams();
  const nav = useNavigate();

  useEffect(() => {
    const sid = params.get("session_id");
    if (!sid) {
      nav("/");
      return;
    }

    api
      .get(`/api/v1/checkout/confirm?session_id=${sid}`)
      .then(({ data }) => setOrder(data.data))
      .catch(() => nav("/"));
  }, []);

  if (!order) return <p className="text-center mt-20">Finalising payment…</p>;

  return (
    <div className="max-w-lg mx-auto p-8 text-center">
      <h1 className="text-2xl font-bold mb-4">Thank you for your purchase!</h1>
      <p>
        Your order&nbsp;
        <span className="font-mono">{order._id}</span>&nbsp;is confirmed.
      </p>
      <p className="text-sm text-gray-500 mt-2">
        A receipt has been sent to {order.billingAddress.email}.
      </p>
    </div>
  );
}
