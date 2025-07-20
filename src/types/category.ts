export type CategoryType = "product" | "post" | "ticket" | "comment" | (string & {});

export interface Category {
    _id: string;
    title: string;
    englishTitle: string
    description: string;
    type: CategoryType;
    createdAt?: string;
    updatedAt?: string;
}

export interface GetCategoriesResponse {
    categories: Category[];
}

export interface CategoryResponse {
    message: string;
    category: Category;
}

export interface RemoveCategoryResponse {
    message: string;
}

export interface UpdateCategoryParams {
    id: string;
    data: Partial<Pick<Category, "title" | "description" | "type">>;
}

export interface AddCategoryPayload {
    title: string;
    description: string;
    type: CategoryType;
}


export interface CategoryFormValues {
    title: string;
    description: string;
    englishTitle: string;
}

export interface CategoryPayload extends CategoryFormValues {
    type: string;
}


export type CategoryFormData = {
    title?: string;
    englishTitle?: string;
    description?: string;
};