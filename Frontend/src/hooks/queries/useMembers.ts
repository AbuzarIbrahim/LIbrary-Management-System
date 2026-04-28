import { Member, ApiResponse } from "@/types";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { actionGetMembers, actionAddMember, actionUpdateMember } from "@/actions";

export default function useMembers() {
  const queryClient = useQueryClient();
  const getMembers = useQuery({
    queryKey: ["getMembers"],
    queryFn: actionGetMembers,
    select: (res: { success: boolean; data?: Member[] }) => {
      if (res.success && res.data) {
        return res.data;
      }
      return [];
    },
  });
  const addMember = useMutation({
    mutationKey: ["addMember"],
    mutationFn: actionAddMember,
    onSuccess: (res: any) => {
      if (res.success) {
        queryClient.invalidateQueries({ queryKey: ["getMembers"] });
      }
    },
  });
  const updateMember = useMutation({
    mutationKey: ["updateMember"],
    mutationFn: actionUpdateMember,
    onSuccess: (res: any) => {
      if (res.success) {
        queryClient.invalidateQueries({ queryKey: ["getMembers"] });
      }
    },
  });
  return {
    getMembers,
    addMember,
    updateMember,
  };
}
