import { addNewCoupon, getAllCoupns, getOneCoupon, removeCoupon, updateCoupon } from "@/services/couponService"
import { AddCouponPayload, CouponResponse, GetAllCouponsResponse, RemoveCouponResponse, UpdateCouponParams } from "@/types/coupon";
import { useMutation, UseMutationResult, useQuery, UseQueryResult } from "@tanstack/react-query"

export const useGetCoupons = (): UseQueryResult<GetAllCouponsResponse, Error> =>
    useQuery<GetAllCouponsResponse, Error>({
        queryKey: ["get-coupons"],
        queryFn: getAllCoupns,
        retry: false,
        refetchOnWindowFocus: true,
    })

export const useGetOneCoupon = (id: string): UseQueryResult<CouponResponse, Error> =>
    useQuery<CouponResponse, Error>({
        queryKey: ["get-coupon", id],
        queryFn: () => getOneCoupon(id),
        retry: false,
        refetchOnWindowFocus: true,
    })



export const useAddNewCoupon = (): UseMutationResult<CouponResponse, Error, AddCouponPayload> =>
    useMutation<CouponResponse, Error, AddCouponPayload>({
        mutationFn: addNewCoupon
    });


export const useUpdateCoupon = (): UseMutationResult<CouponResponse, Error, UpdateCouponParams> =>
    useMutation<CouponResponse, Error, UpdateCouponParams>({
        mutationFn: updateCoupon
    });

export const useRemoveCoupon = (): UseMutationResult<RemoveCouponResponse, Error, string> => {
    return useMutation<RemoveCouponResponse, Error, string>({
        mutationFn: removeCoupon
    });
};


