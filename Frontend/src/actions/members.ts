"use server";
import axiosInstance from "../utils/axios";
import { Member, ApiResponse } from "../types";

export async function actionGetMembers(): Promise<{ success: boolean; data?: Member[]; message?: string }> {
  try {
    const res = await axiosInstance.get<ApiResponse<Member[]>>("/api/v1/members");
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

export async function actionAddMember(memberData: Partial<Member>): Promise<{ success: boolean; data?: Member; message?: string }> {
  try {
    const res = await axiosInstance.post<ApiResponse<Member>>("/api/v1/members", memberData);
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

export async function actionUpdateMember({ id, memberData }: { id: string; memberData: Partial<Member> }): Promise<{ success: boolean; data?: Member; message?: string }> {
  try {
    const res = await axiosInstance.patch<ApiResponse<Member>>(`/api/v1/members/${id}`, memberData);
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
