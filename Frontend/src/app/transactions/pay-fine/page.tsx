"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import toast from "react-hot-toast"
import useTransactions from "@/hooks/queries/useTransactions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Transaction, Book, Member } from "@/types"

function PayFineContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const transactionId = searchParams.get("transactionId")
  
  const { getTransactions, returnBook } = useTransactions()
  const transactions = getTransactions.data || []
  
  const [transaction, setTransaction] = useState<Transaction | null>(null)
  const [fine, setFine] = useState(0)
  const [finePaid, setFinePaid] = useState(false)
  const [remarks, setRemarks] = useState("")
  const [error, setError] = useState("")

  useEffect(() => {
    if (transactionId && transactions) {
      const trans = transactions.find(t => t._id === transactionId)
      if (trans) {
        setTransaction(trans)
        const due = new Date(trans.dueDate)
        const ret = new Date() 
        if (ret > due) {
          const diffTime = Math.abs(ret.getTime() - due.getTime())
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
          setFine(diffDays * 1)
        } else {
          setFine(0)
        }
      }
    }
  }, [transactionId, transactions])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!transactionId) {
      setError("No transaction ID provided.")
      return
    }

    if (fine > 0 && !finePaid) {
      setError("For a pending fine, the paid fine check box needs to be selected before the user can complete the return book transaction. Please make a valid selection of the feature. And book will not be returned until then.")
      return
    }

    setError("")
    returnBook.mutate({
      transactionId: transactionId,
      returnDate: new Date().toISOString().split("T")[0],
      remarks,
      finePaid: fine > 0 ? finePaid : true
    }, {
      onSuccess: () => {
        toast.success("Transaction completed successfully")
        router.push("/transactions/return-book")
      },
      onError: (err: any) => {
        setError(err.response?.data?.message || "Failed to complete transaction")
      }
    })
  }

  if (!transaction) return <div className="p-8 text-center">Loading transaction details...</div>

  const book = transaction.book as Book;
  const member = transaction.member as Member;

  return (
    <div className="p-8 flex justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Pay Fine / Confirm Return</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {error && <p className="text-destructive text-sm bg-destructive/10 p-2 rounded">{error}</p>}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Book</Label>
                <Input value={book?.title} readOnly className="bg-muted" />
              </div>
              <div className="space-y-2">
                <Label>Member</Label>
                <Input value={member?.name} readOnly className="bg-muted" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Issue Date</Label>
                <Input value={new Date(transaction.issueDate).toLocaleDateString()} readOnly className="bg-muted" />
              </div>
              <div className="space-y-2">
                <Label>Due Date</Label>
                <Input value={new Date(transaction.dueDate).toLocaleDateString()} readOnly className="bg-muted" />
              </div>
            </div>
            <div className="p-4 bg-primary/5 rounded-md border border-primary/10">
              <p className="text-sm font-medium text-muted-foreground mb-1">Calculated Fine</p>
              <p className="text-2xl font-bold text-primary">${fine}</p>
            </div>
            {fine > 0 && (
              <div className="flex items-center space-x-2 p-2 border rounded-md border-yellow-200 bg-yellow-50 dark:bg-yellow-900/10">
                <Checkbox 
                  id="finePaid" 
                  checked={finePaid} 
                  onCheckedChange={(checked) => setFinePaid(!!checked)} 
                />
                <Label htmlFor="finePaid" className="text-yellow-800 dark:text-yellow-200">I have received the fine payment</Label>
              </div>
            )}
            <div className="space-y-2">
              <Label>Remarks</Label>
              <Input 
                value={remarks} 
                onChange={(e) => setRemarks(e.target.value)} 
                placeholder="Optional remarks"
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={returnBook.isPending}>
              {returnBook.isPending ? "Completing..." : "Confirm & Complete"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

export default function PayFinePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PayFineContent />
    </Suspense>
  )
}
