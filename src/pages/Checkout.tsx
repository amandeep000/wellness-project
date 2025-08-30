import api from "../api/axios";
import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useNavigate } from "react-router-dom";
import { Summary } from "motion/react";
import axios from "axios";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);
type summary = {
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
};

const Checkout = () => {
  const [summary, setSummary] = useState<Summary | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/api/v1/cart")
      .then(({ data }) => setSummary(data.data.responseData))
      .catch((error) => navigate("/"));
  }, []);

  const payNow = async () => {
    if (!summary) return;
    setLoading(true);
    try {
      const { data } = await api.post("/api/v1/checkout/session");
      const stripe = await stripePromise;
      await stripe?.redirectToCheckout({ sessionId: data.data.sessionId });
    } catch (error) {
      alert("unable to start payment-try again.");
      setLoading(false);
    }
  };

  if (!summary) return null;
  return <div></div>;
};

export default Checkout;
