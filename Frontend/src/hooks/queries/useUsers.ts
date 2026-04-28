"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { actionGetUsers, actionCreateUser } from "@/actions/users";
export default function useUsers() {
  const queryClient = useQueryClient();
  const getUsers = useQuery({
    queryKey: ["getUsers"],
    queryFn: actionGetUsers,
    select: (res: any) => {
      if (res.success) {
        return res.data;
      }
      return [];
    },
  });
  const createUser = useMutation({
    mutationKey: ["createUser"],
    mutationFn: actionCreateUser,
    onSuccess: (res: any) => {
      if (res.success) {
        queryClient.invalidateQueries({ queryKey: ["getUsers"] });
      }
    },
  });
  return {
    getUsers,
    createUser,
  };
}
