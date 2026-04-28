"use client"

import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { issueSchema, IssueFormValues } from "@/lib/validation"
import useTransactions from "@/hooks/queries/useTransactions"
import useBooks from "@/hooks/queries/useBooks"
import useMembers from "@/hooks/queries/useMembers"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Transaction } from "@/types"

export default function BookIssuePage() {
  const { getBooks } = useBooks()
  const { getMembers } = useMembers()
  const { issueBook } = useTransactions()
  
  const books = getBooks.data || []
  const members = getMembers.data || []

  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors },
  } = useForm<IssueFormValues>({
    resolver: zodResolver(issueSchema),
    defaultValues: {
      bookId: "",
      memberId: "",
      dueDate: new Date(new Date().setDate(new Date().getDate() + 14)).toISOString().split('T')[0],
      remarks: "",
    },
  })

  const selectedBookId = watch("bookId")
  const selectedBook = books.find(b => b._id === selectedBookId)

  const onSubmit = (data: IssueFormValues) => {
    issueBook.mutate(data, {
      onSuccess: (res: { success: boolean; data?: Transaction; message?: string }) => {
        if (res.success) {
          alert("Book issued successfully")
          reset()
        } else {
          alert(res.message || "Failed to issue book")
        }
      },
    })
  }

  return (
    <div className="p-8 flex justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Book Issue</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Select Book</Label>
              <Controller
                name="bookId"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className={errors.bookId ? 'border-destructive' : ''}>
                      <SelectValue placeholder="Select a book" />
                    </SelectTrigger>
                    <SelectContent>
                      {books.filter(b => b.available).map((book) => (
                        <SelectItem key={book._id} value={book._id}>{book.title}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.bookId && <p className="text-destructive text-xs">{errors.bookId.message}</p>}
            </div>

            <div className="space-y-2">
              <Label>Author</Label>
              <Input value={selectedBook?.author || ""} readOnly className="bg-muted" />
            </div>

            <div className="space-y-2">
              <Label>Select Member</Label>
              <Controller
                name="memberId"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className={errors.memberId ? 'border-destructive' : ''}>
                      <SelectValue placeholder="Select a member" />
                    </SelectTrigger>
                    <SelectContent>
                      {members.filter(m => m.status === 'active').map((member) => (
                        <SelectItem key={member._id} value={member._id}>
                          {member.name} ({member.membershipNumber})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.memberId && <p className="text-destructive text-xs">{errors.memberId.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="dueDate">Due Date</Label>
              <Input 
                id="dueDate" 
                type="date"
                className={errors.dueDate ? 'border-destructive' : ''}
                {...register("dueDate")}
              />
              {errors.dueDate && <p className="text-destructive text-xs">{errors.dueDate.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="remarks">Remarks</Label>
              <Input 
                id="remarks" 
                placeholder="Optional"
                {...register("remarks")}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={issueBook.isPending}>
              {issueBook.isPending ? "Issuing..." : "Confirm Issue"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
