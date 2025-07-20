import { CartResponse } from "@/types/cart";
import http from "./httpService";

export function addToCart(productId: string): Promise<CartResponse> {
    return http.post("/cart/add", { productId }).then(({ data }) => data.data)
}

export function decrementFromCart(productId: string): Promise<CartResponse> {
    return http.post("/cart/remove", { productId }).then(({ data }) => data.data)
}

