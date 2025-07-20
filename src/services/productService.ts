import { AddProductResponse, GetOneProductResponse, GetProductsResponse, LikeProductResponse, Product, RemoveProductResponse, UpdateProductResponse } from "@/types/product";
import http from "./httpService";

export function getProducts(qs: string, cookies: string): Promise<GetProductsResponse> {
    return http.get(`/product/list?${qs}`, {
        headers: {
            Cookie: cookies
        }
    }).then(({ data }) => data.data)
}

export function getOneProductBySlug(slug: string): Promise<GetOneProductResponse> {
    return http.get(`/product/slug/${slug}`).then(({ data }) => data.data);
}

export function getOneProductById(id: string): Promise<GetOneProductResponse> {
    return http.get(`/product/${id}`).then(({ data }) => data.data);
}

export function likeProduct(id: string): Promise<LikeProductResponse> {
    return http.post(`/product/like/${id}`).then(({ data }) => data.data);
}

// admin related function

export function addProduct(data: Partial<Product>): Promise<AddProductResponse> {
    return http.post(`/admin/product/add`, data).then(({ data }) => data.data);
}

export function removeProduct(id: string): Promise<RemoveProductResponse> {
    return http.delete(`/admin/product/remove/${id}`).then(({ data }) => data.data);
}

export function updateProduct({
    productId,
    data
}: {
    productId: string;
    data: Partial<Product>;
}): Promise<UpdateProductResponse> {
    return http.patch(`/admin/product/update/${productId}`, data).then(({ data }) => data.data);
}


