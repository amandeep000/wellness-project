import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { searchProducts, SearchFilters } from "../api/product";
import { Product } from "../types/product";
import {
  getAllProducts,
  getProductBySlug,
  getProductByCategory,
} from "../api/product";

export function useProducts() {
  return useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: getAllProducts,
    staleTime: 5 * 60 * 1000,
  });
}

export function useProductBySlug(slug: string) {
  return useQuery<Product>({
    queryKey: ["products", slug],
    queryFn: () => getProductBySlug(slug),
    enabled: !!slug,
    staleTime: 10 * 60 * 1000,
  });
}

export function useproductByCategory(categorySlug: string) {
  return useQuery<Product[]>({
    queryKey: ["products", "category", categorySlug],
    queryFn: () => getProductByCategory(categorySlug),
    enabled: !!categorySlug,
    staleTime: 5 * 60 * 1000,
  });
}

export function usePrefetchProduct() {
  const queryclient = useQueryClient();
  return (slug: string) => {
    queryclient.prefetchQuery({
      queryKey: ["products", slug],
      queryFn: () => getProductBySlug(slug),
      staleTime: 10 * 60 * 1000,
    });
  };
}

export function useSearchProducts(query: string, filters?: SearchFilters) {
  return useQuery<Product[]>({
    queryKey: ["products", "search", query, filters],
    queryFn: () => searchProducts(query, filters),
    enabled: !!query && query.trim().length > 0,
    staleTime: 5 * 60 * 1000,
  });
}
