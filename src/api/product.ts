import api from "./axios";
import {
  Product,
  ProductsResponse,
  SingleProductResponse,
} from "../types/product";

export interface SearchFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
}
export const getAllProducts = async (): Promise<Product[]> => {
  try {
    const res = await api.get("/api/v1/products");
    console.log("These are all the products: ", res.data);
    return res.data.data;
  } catch (error: any) {
    throw error;
  }
};

export const getProductBySlug = async (slug: string): Promise<Product> => {
  try {
    const res = await api.get(`/api/v1/products/${slug}`);
    return res.data.data;
  } catch (error: any) {
    if (error.response?.status === 404) {
      throw new Error(`Product with slug ${slug} not found`);
    }
    console.log(
      "This is the error for getProductBySlug endpoint",
      error.response?.data
    );
    throw error;
  }
};

export const getProductByCategory = async (
  categorySlug: any
): Promise<Product[]> => {
  try {
    const res = await api.get(`/api/v1/products/category/${categorySlug}`);
    console.log("This is the response for the category slug", res.data);
    return res.data.data;
  } catch (error: any) {
    console.log("Get product by category error: ", error.response?.data);
    throw error;
  }
};

export const searchProducts = async (
  query: string,
  filters?: SearchFilters
): Promise<Product[]> => {
  try {
    const params = new URLSearchParams();
    params.append("q", query);

    if (filters?.category) {
      params.append("category", filters.category);
    }
    if (filters?.minPrice !== undefined) {
      params.append("minPrice", filters.minPrice.toString());
    }
    if (filters?.maxPrice !== undefined) {
      params.append("maxPrice", filters.maxPrice.toString());
    }

    const res = await api.get(`/api/v1/products/search?${params.toString()}`);
    console.log("Search products response: ", res.data);
    return res.data.data;
  } catch (error: any) {
    console.log("There is an error searching products", error.response?.data);
    throw error;
  }
};
