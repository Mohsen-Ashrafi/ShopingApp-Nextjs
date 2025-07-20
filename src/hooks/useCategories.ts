import { addNewCategory, getCategories, getCategoryById, removeCategory, updateCategory } from "@/services/categoryService";
import { AddCategoryPayload, CategoryResponse, GetCategoriesResponse, RemoveCategoryResponse, UpdateCategoryParams } from "@/types/category";
import { useMutation, UseMutationResult, useQuery, UseQueryResult } from "@tanstack/react-query";

export const useGetCategories = (): UseQueryResult<GetCategoriesResponse, Error> =>
    useQuery<GetCategoriesResponse, Error>({
        queryKey: ["get-categories"],
        queryFn: getCategories,
        retry: false,
        refetchOnWindowFocus: true,
    });

export const useGetCategoryById = (id: string): UseQueryResult<CategoryResponse, Error> =>
    useQuery<CategoryResponse, Error>({
        queryKey: ["get-category", id],
        queryFn: () => getCategoryById(id),
        retry: false,
        refetchOnWindowFocus: true,
    });

export const useAddCategory = (): UseMutationResult<CategoryResponse, Error, AddCategoryPayload> =>
    useMutation<CategoryResponse, Error, AddCategoryPayload>({
        mutationFn: addNewCategory
    });

export const useUpdateCategory = (): UseMutationResult<CategoryResponse, Error, UpdateCategoryParams> =>
    useMutation<CategoryResponse, Error, UpdateCategoryParams>({
        mutationFn: updateCategory
    });

export const useRemoveCategory = (): UseMutationResult<RemoveCategoryResponse, Error, string> => {
    return useMutation<RemoveCategoryResponse, Error, string>({
        mutationFn: removeCategory
    });
};