import { AddCategoryPayload, CategoryResponse, GetCategoriesResponse, RemoveCategoryResponse, UpdateCategoryParams } from "@/types/category";
import http from "./httpService";

export function getCategories(): Promise<GetCategoriesResponse> {
    return http.get("/category/list").then(({ data }) => data.data)
}

export function addNewCategory(data: AddCategoryPayload): Promise<CategoryResponse> {
    return http.post("/admin/category/add", data).then(({ data }) => data.data);
}

export function removeCategory(id: string): Promise<RemoveCategoryResponse> {
    return http.delete(`/admin/category/remove/${id}`).then(({ data }) => data.data);
}


export function getCategoryById(id: string): Promise<CategoryResponse> {
    return http.get(`/category/${id}`).then(({ data }) => data.data);
}

export function updateCategory({ id, data }: UpdateCategoryParams): Promise<CategoryResponse> {
    return http
        .patch(`/admin/category/update/${id}`, data)
        .then(({ data }) => data.data);
}