import { getAllUsers, getOneUser, getUserProfile } from "@/services/authServices";
import { GetOneUserResponse, GetUserProfileResponse, GetUsersResponse } from "@/types/authTypes";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

export const useGetUser = (): UseQueryResult<GetUserProfileResponse, Error> =>
  useQuery<GetUserProfileResponse, Error>({
    queryKey: ["get-user"],
    queryFn: getUserProfile,
    retry: false,
    refetchOnWindowFocus: true,
  });


export const useGetUsers = (): UseQueryResult<GetUsersResponse, Error> =>
  useQuery<GetUsersResponse, Error>({
    queryKey: ["get-users"],
    queryFn: getAllUsers,
    retry: false,
    refetchOnWindowFocus: true,
  });


export const useGetOneUser = (id: string): UseQueryResult<GetOneUserResponse, Error> =>
  useQuery<GetOneUserResponse, Error>({
    queryKey: ["get-user", id],
    queryFn: () => getOneUser(id),
    retry: false,
    refetchOnWindowFocus: true,
  });
