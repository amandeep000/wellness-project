import { useEffect, useState } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import api from "../api/axios";
import { useAppDispatch } from "../hooks/TypedHooks";
import { clearCart } from "../store/slices/cartSlice";

interface OrderItem {
  productName: string;
  productPrice: number;
  quantity: number;
  productImage?: string;
}

interface Order {
  orderId?: string;
  billingAddress?: {
    email?: string;
  };
  totalPrice?: number;
  items?: OrderItem[];
  [key: string]: any;
}

export default function CheckoutSuccess() {
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const confirmPayment = async () => {
      try {
        const sessionId = params.get("session_id")?.trim();
        if (!sessionId) {
          navigate("/", { replace: true });
          return;
        }

        const response = await api.get(
          `/api/v1/checkout/confirm?session_id=${encodeURIComponent(sessionId)}`
        );

        const orderData = response.data?.data;
        if (!orderData) throw new Error("Invalid order data received");

        setOrder(orderData);

        // Clear local cart and Redux store
        localStorage.removeItem("cart");
        dispatch(clearCart());
      } catch (err: any) {
        console.error("Payment confirmation error:", err);
        setError(
          err.response?.data?.message ||
            err.message ||
            "Unable to confirm your payment. Please contact support."
        );

        setTimeout(() => {
          navigate("/", { replace: true });
        }, 6000); // shorter redirect time
      } finally {
        setIsLoading(false);
      }
    };

    confirmPayment();
  }, [params, navigate, dispatch]);

  if (isLoading) {
    return (
      <div className="max-w-lg mx-auto p-8 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-green-600 mx-auto mb-6"></div>
        <h2 className="text-xl font-semibold mb-2">
          Confirming your payment...
        </h2>
        <p className="text-gray-600">
          Please wait while we process your order.
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-lg mx-auto p-8 text-center">
        <div className="mb-6">
          <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Payment Confirmation Failed
          </h1>
          <p className="text-gray-600 mb-4">{error}</p>
          <p className="text-sm text-gray-500">
            If you were charged, please contact our support team.
          </p>
        </div>

        <div className="space-y-3">
          <Link
            to="/"
            className="block w-full bg-gray-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
          >
            Return Home
          </Link>
          <Link
            to="/contact"
            className="block w-full border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
          >
            Contact Support
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-8">
      <div className="text-center mb-8">
        <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
          <svg
            className="w-8 h-8 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Thank you for your purchase!
        </h1>
        <p className="text-gray-600">
          Your order has been confirmed and will be processed shortly.
        </p>
      </div>

      {/* Order Details */}
      <div className="bg-gray-50 rounded-lg p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">Order Details</h2>

        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">Order ID:</span>
            <span className="font-mono font-medium">
              {order?.orderId ?? "-"}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-600">Total Amount:</span>
            <span className="font-semibold">
              ${order?.totalPrice?.toFixed(2) ?? "0.00"}
            </span>
          </div>

          {order?.billingAddress?.email && (
            <div className="flex justify-between">
              <span className="text-gray-600">Receipt sent to:</span>
              <span className="font-medium">{order.billingAddress.email}</span>
            </div>
          )}
        </div>
      </div>

      {/* Optional: Purchased Items */}
      {order?.items?.length ? (
        <div className="bg-white rounded-lg p-6 mb-6 border">
          <h2 className="text-lg font-semibold mb-4">Items Purchased</h2>
          <ul className="space-y-2">
            {order.items.map((item, idx) => (
              <li key={idx} className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  {item.productImage && (
                    <img
                      src={item.productImage}
                      alt={item.productName}
                      className="w-12 h-12 object-cover rounded"
                    />
                  )}
                  <span>{item.productName}</span>
                </div>
                <span>
                  {item.quantity} × ${item.productPrice.toFixed(2)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="text-center space-y-4">
        <Link
          to="/"
          className="inline-block bg-green-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-green-700 transition-colors"
        >
          Continue Shopping
        </Link>

        <div className="text-sm text-gray-500">
          <p>
            You will receive an email confirmation shortly with your order
            details.
          </p>
        </div>
      </div>
    </div>
  );
}
