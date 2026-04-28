"use server";
import axiosInstance from "../utils/axios";
import { Transaction, ApiResponse } from "../types";

export async function actionGetTransactions(): Promise<{ success: boolean; data?: Transaction[]; message?: string }> {
  try {
    const res = await axiosInstance.get<ApiResponse<Transaction[]>>("/api/v1/transactions");
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

export async function actionIssueBook(issueData: { bookId: string; memberId: string; dueDate: string; remarks?: string }): Promise<{ success: boolean; data?: Transaction; message?: string }> {
  try {
    const res = await axiosInstance.post<ApiResponse<Transaction>>("/api/v1/transactions/issue", issueData);
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

export async function actionReturnBook(returnData: { transactionId: string; returnDate?: string; remarks?: string }): Promise<{ success: boolean; data?: Transaction; message?: string }> {
  try {
    const res = await axiosInstance.post<ApiResponse<Transaction>>("/api/v1/transactions/return", returnData);
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
