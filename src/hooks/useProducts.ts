import { addProduct, getOneProductById, getProducts, removeProduct, updateProduct } from "@/services/productService";
import { AddProductResponse, GetOneProductResponse, GetProductsResponse, RemoveProductResponse, UpdateProductResponse } from "@/types/product";
import { useMutation, UseMutationResult, useQuery, UseQueryResult } from "@tanstack/react-query";

export const useGetProducts = (
  qs: string,
  cookies: string
): UseQueryResult<GetProductsResponse, Error> =>
  useQuery<GetProductsResponse, Error>({
    queryKey: ["get-products", qs, cookies],
    queryFn: () => getProducts(qs, cookies),
    retry: false,
    refetchOnWindowFocus: true,
  });

export const useAddProduct = (): UseMutationResult<AddProductResponse, Error, FormData> => {
  return useMutation({ mutationFn: addProduct });
}


export const useUpdateProduct = (): UseMutationResult<
  UpdateProductResponse,
  Error,
  { productId: string; data: FormData }
> => {
  return useMutation<UpdateProductResponse, Error, { productId: string; data: FormData }>({ mutationFn: updateProduct })
}

export const useGetProductById = (id: string): UseQueryResult<GetOneProductResponse, Error> =>
  useQuery<GetOneProductResponse, Error>({
    queryKey: ["get-product", id],
    queryFn: () => getOneProductById(id),
    retry: false,
    refetchOnWindowFocus: true,
  });

export const useRemoveProduct = (): UseMutationResult<RemoveProductResponse, Error, string> => {
  return useMutation<RemoveProductResponse, Error, string>({ mutationFn: removeProduct });
};