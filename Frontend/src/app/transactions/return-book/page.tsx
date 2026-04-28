"use client"

import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { returnSchema, ReturnFormValues } from "@/lib/validation"
import useTransactions from "@/hooks/queries/useTransactions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Transaction, Book, Member } from "@/types"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function ReturnBookPage() {
  const router = useRouter()
  const { getTransactions, returnBook } = useTransactions()
  const transactions = getTransactions.data || []

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ReturnFormValues>({
    resolver: zodResolver(returnSchema),
    defaultValues: {
      transactionId: "",
      returnDate: new Date().toISOString().split('T')[0],
      remarks: "",
    },
  })

  const selectedTransactionId = watch("transactionId")
  const selectedTransaction = transactions.find(t => t._id === selectedTransactionId)
  const [fine, setFine] = useState(0)

  useEffect(() => {
    if (selectedTransaction) {
      // Requirement: Return Date is automatically populated to the date selected while issuing the book.
      const issueDateStr = new Date(selectedTransaction.issueDate).toISOString().split('T')[0]
      setValue("returnDate", issueDateStr)
      
      const due = new Date(selectedTransaction.dueDate)
      const ret = new Date(watch("returnDate") || new Date())
      if (ret > due) {
        const diffTime = Math.abs(ret.getTime() - due.getTime())
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
        setFine(diffDays * 1) 
      } else {
        setFine(0)
      }
    }
  }, [selectedTransaction, setValue])

  // Separate effect for fine calculation when returnDate changes
  useEffect(() => {
    if (selectedTransaction) {
      const due = new Date(selectedTransaction.dueDate)
      const ret = new Date(watch("returnDate") || new Date())
      if (ret > due) {
        const diffTime = Math.abs(ret.getTime() - due.getTime())
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
        setFine(diffDays * 1) 
      } else {
        setFine(0)
      }
    }
  }, [watch("returnDate"), selectedTransaction])

  const onSubmit = (data: ReturnFormValues) => {
    if (!data.transactionId) return
    router.push(`/transactions/pay-fine?transactionId=${data.transactionId}`)
  }

  return (
    <div className="p-8 flex justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Return Book</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Select Issued Book</Label>
              <Controller
                name="transactionId"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className={errors.transactionId ? 'border-destructive' : ''}>
                      <SelectValue placeholder="Select a book to return" />
                    </SelectTrigger>
                    <SelectContent>
                      {transactions.filter(t => t.status === 'issued').map((t) => {
                        const book = t.book as Book;
                        const member = t.member as Member;
                        return (
                          <SelectItem key={t._id} value={t._id}>
                            {book.title} ({member.name})
                          </SelectItem>
                        )
                      })}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.transactionId && <p className="text-destructive text-xs">{errors.transactionId.message}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Author</Label>
                <Input value={(selectedTransaction?.book as Book)?.author || ""} readOnly className="bg-muted" />
              </div>
              <div className="space-y-2">
                <Label>Serial No</Label>
                <Input value={(selectedTransaction?.book as Book)?.serialNumber || ""} readOnly className="bg-muted" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Issue Date</Label>
                <Input value={selectedTransaction ? new Date(selectedTransaction.issueDate).toISOString().split('T')[0] : ""} readOnly className="bg-muted" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="returnDate">Return Date</Label>
                <Input 
                  id="returnDate" 
                  type="date"
                  {...register("returnDate")}
                />
              </div>
            </div>

            {fine > 0 && (
              <div className="p-4 bg-yellow-100 dark:bg-yellow-900/30 rounded-md border border-yellow-200">
                <p className="font-bold text-yellow-800 dark:text-yellow-200 text-center">
                  ⚠️ Overdue Fine: ${fine}
                </p>
                <p className="text-xs text-yellow-700 dark:text-yellow-300 text-center mt-1">
                  You will be taken to the Fine Payment page.
                </p>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="remarks">Remarks</Label>
              <Input 
                id="remarks" 
                placeholder="Optional"
                {...register("remarks")}
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button type="submit" className="w-full">
              Confirm Return
            </Button>
            {Object.keys(errors).length > 0 && (
              <p className="text-destructive text-xs text-center">
                Please make a valid selection of the feature.
              </p>
            )}
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
