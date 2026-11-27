import { orderApi } from "./api";

export const orderService = {
  create: async (data) => {
    const response = await orderApi.post("/orders", data);
    return response.data;
  },
  getAll: async () => {
    const response = await orderApi.get("/orders");
    return response.data;
  },
  getById: async (id) => {
    const response = await orderApi.get(`/orders/${id}`);
    return response.data;
  }
};
