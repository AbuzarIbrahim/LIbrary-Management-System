import { Book, ApiResponse } from "@/types";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { actionGetBooks, actionAddBook, actionUpdateBook } from "@/actions";

export default function useBooks() {
  const queryClient = useQueryClient();
  const getBooks = useQuery({
    queryKey: ["getBooks"],
    queryFn: actionGetBooks,
    select: (res: { success: boolean; data?: Book[] }) => {
      if (res.success && res.data) {
        return res.data;
      }
      return [];
    },
  });
  const addBook = useMutation({
    mutationKey: ["addBook"],
    mutationFn: actionAddBook,
    onSuccess: (res: any) => {
      if (res.success) {
        queryClient.invalidateQueries({ queryKey: ["getBooks"] });
      }
    },
  });
  const updateBook = useMutation({
    mutationKey: ["updateBook"],
    mutationFn: actionUpdateBook,
    onSuccess: (res: any) => {
      if (res.success) {
        queryClient.invalidateQueries({ queryKey: ["getBooks"] });
      }
    },
  });
  return {
    getBooks,
    addBook,
    updateBook,
  };
}
