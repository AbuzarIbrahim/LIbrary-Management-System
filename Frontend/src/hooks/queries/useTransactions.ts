import { Transaction, ApiResponse } from "@/types";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { actionGetTransactions, actionIssueBook, actionReturnBook } from "@/actions";

export default function useTransactions() {
  const queryClient = useQueryClient();
  const getTransactions = useQuery({
    queryKey: ["getTransactions"],
    queryFn: actionGetTransactions,
    select: (res: { success: boolean; data?: Transaction[] }) => {
      if (res.success && res.data) {
        return res.data;
      }
      return [];
    },
  });
  const issueBook = useMutation({
    mutationKey: ["issueBook"],
    mutationFn: actionIssueBook,
    onSuccess: (res: any) => {
      if (res.success) {
        queryClient.invalidateQueries({ queryKey: ["getTransactions"] });
        queryClient.invalidateQueries({ queryKey: ["getBooks"] });
      }
    },
  });
  const returnBook = useMutation({
    mutationKey: ["returnBook"],
    mutationFn: actionReturnBook,
    onSuccess: (res: any) => {
      if (res.success) {
        queryClient.invalidateQueries({ queryKey: ["getTransactions"] });
        queryClient.invalidateQueries({ queryKey: ["getBooks"] });
      }
    },
  });
  return {
    getTransactions,
    issueBook,
    returnBook,
  };
}
