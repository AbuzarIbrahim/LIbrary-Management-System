"use server";
import axiosInstance from "../utils/axios";
import {
  Book,
  ApiResponse,
  ActionResponse,
  AddBookRequest,
  UpdateBookRequest,
} from "../types";

export async function actionGetBooks(): Promise<ActionResponse<Book[]>> {
  try {
    const res = await axiosInstance.get<ApiResponse<Book[]>>(
      "/api/v1/books"
    );
    return {
      success: true,
      data: res.data.data,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || "Something went wrong",
    };
  }
}

export async function actionAddBook(
  bookData: AddBookRequest
): Promise<ActionResponse<Book>> {
  try {
    const res = await axiosInstance.post<ApiResponse<Book>>(
      "/api/v1/books",
      bookData
    );
    return {
      success: true,
      data: res.data.data,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || "Something went wrong",
    };
  }
}

export async function actionUpdateBook({
  id,
  bookData,
}: UpdateBookRequest): Promise<ActionResponse<Book>> {
  try {
    const res = await axiosInstance.patch<ApiResponse<Book>>(
      `/api/v1/books/${id}`,
      bookData
    );
    return {
      success: true,
      data: res.data.data,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || "Something went wrong",
    };
  }
}
