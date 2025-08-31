// src/pages/CheckoutSuccess.tsx
import { useEffect, useState } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import api from "../api/axios";

interface Order {
  _id?: string;
  billingAddress?: {
    email?: string;
  };
  [key: string]: any;
}

export default function CheckoutSuccess() {
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [debugInfo, setDebugInfo] = useState<string[]>([]);
  const [params] = useSearchParams();
  const navigate = useNavigate();

  // Debug logging function
  const addDebug = (message: string) => {
    console.log(`[DEBUG] ${message}`);
    setDebugInfo((prev) => [
      ...prev,
      `${new Date().toISOString()}: ${message}`,
    ]);
  };

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        addDebug("Starting fetchOrder function");

        const sessionId = params.get("session_id");
        addDebug(`Session ID extracted: ${sessionId}`);
        addDebug(`Session ID type: ${typeof sessionId}`);

        if (
          !sessionId ||
          typeof sessionId !== "string" ||
          sessionId.trim() === ""
        ) {
          addDebug("Invalid session ID - navigating to home");
          navigate("/", { replace: true });
          return;
        }

        setIsLoading(true);
        setError(null);
        addDebug("Loading state set to true");

        // Construct URL carefully
        const cleanSessionId = sessionId.trim();
        const apiUrl = `/api/v1/checkout/confirm?session_id=${encodeURIComponent(cleanSessionId)}`;
        addDebug(`API URL constructed: ${apiUrl}`);

        addDebug("About to make API call...");

        // Make the API call with timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(() => {
          controller.abort();
          addDebug("API call timed out");
        }, 30000); // 30 second timeout

        try {
          const response = await api.get(apiUrl, {
            signal: controller.signal,
            timeout: 30000,
          });

          clearTimeout(timeoutId);
          addDebug("API call successful - received response");
          addDebug(`Response status: ${response.status}`);
          addDebug(
            `Response data keys: ${Object.keys(response.data || {}).join(", ")}`
          );

          // Log response structure safely
          try {
            addDebug(
              `Response structure: ${JSON.stringify(response.data, null, 2).substring(0, 500)}`
            );
          } catch (jsonError) {
            addDebug(`Could not stringify response: ${String(jsonError)}`);
          }

          // Validate response structure more carefully
          if (!response) {
            throw new Error("No response received");
          }

          if (!response.data) {
            throw new Error("No data in response");
          }

          if (!response.data.data) {
            addDebug(
              `Response.data structure: ${JSON.stringify(response.data).substring(0, 200)}`
            );
            throw new Error("No data.data in response structure");
          }

          addDebug("Response validation passed - setting order");
          setOrder(response.data.data);
          addDebug("Order set successfully");
        } catch (apiError) {
          clearTimeout(timeoutId);
          throw apiError;
        }
      } catch (err) {
        addDebug("=== ERROR OCCURRED ===");
        addDebug(`Error name: ${(err as any)?.name || "Unknown"}`);
        addDebug(`Error message: ${(err as any)?.message || "Unknown"}`);

        try {
          if (err && typeof err === "object") {
            Object.keys(err).forEach((key) => {
              try {
                const value = (err as any)[key];
                addDebug(`Error.${key}: ${String(value).substring(0, 200)}`);
              } catch (keyError) {
                addDebug(`Error.${key}: [Could not stringify]`);
              }
            });
          }
        } catch (errorLogError) {
          addDebug(`Could not log error properties: ${String(errorLogError)}`);
        }

        // Safe error message extraction with extra protection
        let errorMessage = "Failed to confirm payment";
        try {
          const errAny = err as any;
          const possibleMessages = [
            errAny?.response?.data?.message,
            errAny?.response?.data?.error,
            errAny?.message,
            errAny?.response?.statusText,
          ].filter(Boolean);

          if (possibleMessages.length > 0) {
            errorMessage = String(possibleMessages[0]);
          }
        } catch (msgError) {
          addDebug(`Error extracting message: ${String(msgError)}`);
        }

        addDebug(`Final error message: ${errorMessage}`);
        setError(errorMessage);

        // Delayed navigation
        setTimeout(() => {
          addDebug("Navigating to home page");
          navigate("/", { replace: true });
        }, 5000); // Increased to 5 seconds for debugging
      } finally {
        addDebug("Setting loading to false");
        setIsLoading(false);
      }
    };

    addDebug("useEffect triggered - calling fetchOrder");
    fetchOrder();
  }, [params, navigate]);

  // Debug display in loading state
  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto p-8">
        <div className="text-center mb-8">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-gray-300 border-t-blue-600 mx-auto mb-4"></div>
          <p>Finalising payment…</p>
        </div>

        {/* Debug info */}
        <div className="mt-8 p-4 bg-gray-100 rounded-lg">
          <h3 className="font-bold mb-2">Debug Information:</h3>
          <div className="text-xs space-y-1 max-h-60 overflow-y-auto">
            {debugInfo.map((info, i) => (
              <div key={i} className="font-mono">
                {info}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Error state with debug info
  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-8">
        <div className="text-center text-red-600 mb-4">
          <h1 className="text-2xl font-bold mb-2">
            Payment Confirmation Failed
          </h1>
          <p className="text-sm">{error}</p>
          <p className="text-gray-500 text-sm mt-2">
            Redirecting to home page in 5 seconds...
          </p>
        </div>

        <Link
          to="/"
          className="block text-center bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors mb-8"
        >
          Go Home Now
        </Link>

        {/* Debug info */}
        <div className="mt-8 p-4 bg-red-50 border border-red-200 rounded-lg">
          <h3 className="font-bold mb-2">Debug Information:</h3>
          <div className="text-xs space-y-1 max-h-60 overflow-y-auto">
            {debugInfo.map((info, i) => (
              <div key={i} className="font-mono">
                {info}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Success state
  return (
    <div className="max-w-lg mx-auto p-8 text-center">
      <h1 className="text-2xl font-bold mb-4">Thank you for your purchase!</h1>

      <p className="mb-2">
        Your order&nbsp;
        <span className="font-mono bg-gray-100 px-2 py-1 rounded">
          {order?._id || "N/A"}
        </span>
        &nbsp;is confirmed.
      </p>

      {order?.billingAddress?.email && (
        <p className="text-sm text-gray-500 mt-2 mb-6">
          A receipt has been sent to{" "}
          <strong>{order.billingAddress.email}</strong>.
        </p>
      )}

      <Link
        to="/"
        className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-green-700 transition-colors"
      >
        Continue Shopping
      </Link>
    </div>
  );
}
