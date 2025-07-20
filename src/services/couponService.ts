import { AddCouponPayload, CouponResponse, GetAllCouponsResponse, RemoveCouponResponse, UpdateCouponParams } from "@/types/coupon";
import http from "./httpService";

export function getAllCoupns(): Promise<GetAllCouponsResponse> {
  return http.get("/admin/coupon/list").then(({ data }) => data.data);
}

export function getOneCoupon(id: string): Promise<CouponResponse> {
  return http.get(`/admin/coupon/${id}`).then(({ data }) => data.data);
}

export function addNewCoupon(data: AddCouponPayload): Promise<CouponResponse> {
  return http.post("/admin/coupon/add", data).then(({ data }) => data.data);
}

export function updateCoupon({ id, data }: UpdateCouponParams): Promise<CouponResponse> {
  return http.patch(`/admin/coupon/update/${id}`, data).then(({ data }) => data.data);
}

export function removeCoupon(id: string): Promise<RemoveCouponResponse> {
  return http.delete(`/admin/coupon/remove/${id}`).then(({ data }) => data.data);
}