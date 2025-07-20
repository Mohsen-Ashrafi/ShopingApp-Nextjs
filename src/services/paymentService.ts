import {
    CreatePaymentResponse,
    GetAllPaymentsResponse,
    GetOnePaymentResponse
} from "@/types/payment";
import http from "./httpService";

export function createPayment(): Promise<CreatePaymentResponse> {
    return http.post("/payment/create").then(({ data }) => data.data)
}

export function getOnePaymentById(id: string): Promise<GetOnePaymentResponse> {
    return http.get(`/admin/payment/${id}`).then(({ data }) => data.data);
}

export function getAllPayments(): Promise<GetAllPaymentsResponse> {
    return http.get("/admin/payment/list").then(({ data }) => data.data)
}
