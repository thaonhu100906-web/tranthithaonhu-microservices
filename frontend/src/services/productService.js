import { productApi } from "./api";

export const productService = {
  getAll: async () => {
    const response = await productApi.get("/products");
    return response.data;
  },
  getById: async (id) => {
    const response = await productApi.get(`/products/${id}`);
    return response.data;
  }
};
