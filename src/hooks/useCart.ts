import { addToCart, decrementFromCart } from "@/services/cartService";
import { useMutation } from "@tanstack/react-query";

export const useAddToCart = () => {
    return useMutation({
        mutationFn: addToCart,
    });
}

export const useDecrementFromCart = () => {
    return useMutation({
        mutationFn: decrementFromCart,
    });
}