import api from "./axios";

export const cartApi = {
  syncCart: async (items: Array<{ productId: string; quantity: number }>) => {
    const response = await api.post("/api/v1/cart/sync", { items });
    return response.data;
  },

  getCart: async () => {
    const response = await api.get("/api/v1/cart");
    return response.data;
  },

  clearCart: async () => {
    const response = await api.delete("/api/v1/cart");
    console.log(
      "Clear cart request sent to backend successfully: ",
      response.data
    );
    return response.data;
  },
};
