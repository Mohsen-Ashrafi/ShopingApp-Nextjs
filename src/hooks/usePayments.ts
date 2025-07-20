import { getAllPayments, getOnePaymentById } from "@/services/paymentService";
import { GetAllPaymentsResponse, GetOnePaymentResponse } from "@/types/payment";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

export const useGetPayments = (): UseQueryResult<GetAllPaymentsResponse, Error> =>
    useQuery<GetAllPaymentsResponse, Error>({
        queryKey: ["payments",],
        queryFn: getAllPayments,
        retry: false,
    });

export const useGetPaymentById = (id: string): UseQueryResult<GetOnePaymentResponse, Error> =>
    useQuery<GetOnePaymentResponse, Error>({
        queryKey: ["payment", id],
        queryFn: () => getOnePaymentById(id),
        retry: false,
        refetchOnWindowFocus: true,
    });