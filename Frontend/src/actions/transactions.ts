"use server";
import axiosInstance from "../utils/axios";
import {
  Transaction,
  ApiResponse,
  IssueBookRequest,
  ReturnBookRequest,
  ActionResponse,
} from "../types";

export async function actionGetTransactions(): Promise<
  ActionResponse<Transaction[]>
> {
  try {
    const res = await axiosInstance.get<ApiResponse<Transaction[]>>(
      "/api/v1/transactions"
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

export async function actionIssueBook(
  issueData: IssueBookRequest
): Promise<ActionResponse<Transaction>> {
  try {
    const res = await axiosInstance.post<ApiResponse<Transaction>>(
      "/api/v1/transactions/issue",
      issueData
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

export async function actionReturnBook(
  returnData: ReturnBookRequest
): Promise<ActionResponse<Transaction>> {
  try {
    const res = await axiosInstance.post<ApiResponse<Transaction>>(
      "/api/v1/transactions/return",
      returnData
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
