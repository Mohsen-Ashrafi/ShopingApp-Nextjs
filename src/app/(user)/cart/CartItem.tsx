"use client";
import {
  Box,
  Typography,
  Chip,
  IconButton,
  CircularProgress,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAddToCart, useDecrementFromCart } from "@/hooks/useCart";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import React from "react";
import { CartItemType } from "@/types/cart";
import { AxiosError } from "axios";

interface Props {
  cartItem: CartItemType;
}

const CartItem: React.FC<Props> = ({ cartItem }) => {
  const { isPending: isAdding, mutateAsync: addToCartAsync } = useAddToCart();
  const { isPending: isDecrementing, mutateAsync: decFromCart } =
    useDecrementFromCart();
  const QueryClient = useQueryClient();

  const adadToCartHandler = async () => {
    try {
      const { message } = await addToCartAsync(cartItem._id);
      toast.success(message);
      QueryClient.invalidateQueries({ queryKey: ["get-user"] });
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      if (axiosError?.response?.data) {
        toast.error(axiosError.response.data.message || "An error occurred");
      }
    }
  };

  const decrementHalnder = async () => {
    try {
      const { message } = await decFromCart(cartItem._id);
      toast.success(message);
      QueryClient.invalidateQueries({ queryKey: ["get-user"] });
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      if (axiosError?.response?.data) {
        toast.error(axiosError.response.data.message || "An error occurred");
      }
    }
  };

  return (
    <Box
      display="flex"
      flexDirection={{ xs: "column", sm: "row" }}
      justifyContent="space-between"
      alignItems={{ xs: "flex-start", sm: "center" }}
      border="none"
      borderRadius={2}
      p={2}
      mb={2}
      // boxShadow={1}
      gap={2}
    >
      <Typography
        variant="subtitle1"
        fontWeight="bold"
        flex={1}
        fontSize={{ xs: "0.95rem", sm: "1rem" }}
      >
        {cartItem.title}
      </Typography>

      <Box
        display="flex"
        flexWrap="wrap"
        gap={2}
        alignItems="center"
        justifyContent={{ xs: "space-between", sm: "flex-start" }}
      >
        <Box display="flex" alignItems="center" gap={1}>
          <Typography
            variant="body2"
            fontSize={{ xs: "0.85rem", sm: "1rem" }}
            sx={{
              textDecoration: cartItem.discount > 0 ? "line-through" : "none",
              color: cartItem.discount > 0 ? "gray" : "primary.main",
              fontWeight: cartItem.discount > 0 ? "normal" : "bold",
            }}
          >
            Price: ${cartItem.price}
          </Typography>

          {cartItem.discount > 0 && (
            <>
              <Typography
                variant="body2"
                fontWeight="bold"
                color="success.main"
                fontSize={{ xs: "0.85rem", sm: "1rem" }}
              >
                ${cartItem.offPrice}
              </Typography>
              <Chip
                label={`-${cartItem.discount}%`}
                size="small"
                color="error"
              />
            </>
          )}
        </Box>

        <Typography variant="body2" fontSize={{ xs: "0.85rem", sm: "1rem" }}>
          Quantity: {cartItem.quantity}
        </Typography>
        
        <Box
          display="flex"
          alignItems="center"
          justifyContent={{ xs: "flex-start", sm: "flex-end" }}
          gap={1}
          flexWrap="wrap"
          flex={1}
        >
          <IconButton
            onClick={adadToCartHandler}
            size="small"
            sx={{
              bgcolor: "primary.main",
              color: "white",
              "&:hover": { bgcolor: "primary.dark" },
            }}
          >
            {isAdding ? (
              <CircularProgress size={18} color="inherit" />
            ) : (
              <AddIcon fontSize="small" />
            )}
          </IconButton>

          <IconButton
            onClick={decrementHalnder}
            size="small"
            sx={{ border: "1px solid #ccc" }}
          >
            {isDecrementing ? (
              <CircularProgress size={18} />
            ) : cartItem.quantity > 1 ? (
              <RemoveIcon fontSize="small" />
            ) : (
              <DeleteIcon />
            )}
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default CartItem;
