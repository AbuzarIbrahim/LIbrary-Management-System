"use server";
import axiosInstance from "../utils/axios";
import {
  Member,
  ApiResponse,
  ActionResponse,
  AddMemberRequest,
  UpdateMemberRequest,
} from "../types";

export async function actionGetMembers(): Promise<ActionResponse<Member[]>> {
  try {
    const res = await axiosInstance.get<ApiResponse<Member[]>>(
      "/api/v1/members"
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

export async function actionAddMember(
  memberData: AddMemberRequest
): Promise<ActionResponse<Member>> {
  try {
    const res = await axiosInstance.post<ApiResponse<Member>>(
      "/api/v1/members",
      memberData
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

export async function actionUpdateMember({
  id,
  memberData,
}: UpdateMemberRequest): Promise<ActionResponse<Member>> {
  try {
    const res = await axiosInstance.patch<ApiResponse<Member>>(
      `/api/v1/members/${id}`,
      memberData
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
