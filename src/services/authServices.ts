import {
  GetOtpRequest,
  GetOtpResponse,
  CheckOtpRequest,
  CheckOtpResponse,
  CompleteProfileRequest,
  UpdateProfileRequest,
  User,
  GetOneUserResponse,
  GetUsersResponse,
  GetUserProfileResponse,
} from "@/types/authTypes";

import http from "./httpService";

export function getOtp(data: GetOtpRequest): Promise<GetOtpResponse> {
  return http.post("/user/get-otp", data).then(({ data }) => data.data);
}

export function checkOtp(data: CheckOtpRequest): Promise<CheckOtpResponse> {
  return http.post("/user/check-otp", data).then(({ data }) => data.data);
}

export function completeProfile(data: CompleteProfileRequest): Promise<User> {
  return http.post("/user/complete-profile", data).then(({ data }) => data.data);
}

export function getUserProfile(): Promise<GetUserProfileResponse> {
  return http.get("/user/profile").then(({ data }) => data.data);
}

export function updateProfile(data: UpdateProfileRequest): Promise<User> {
  return http.patch("/user/update", data).then(({ data }) => data.data);
}

export function logout(): Promise<void> {
  return http.post("/user/logout");
}

// Admin APIs
export function getAllUsers(): Promise<GetUsersResponse> {
  return http.get("/admin/user/list").then(({ data }) => data.data);
}

export function getOneUser(id: string): Promise<GetOneUserResponse> {
  return http.get(`/admin/user/profile/${id}`).then(({ data }) => data.data);
}
