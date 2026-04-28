"use client"
import useTransactions from "@/hooks/queries/useTransactions"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
export default function ReportsPage() {
  const { getTransactions } = useTransactions()
  const transactions = getTransactions.data
  const isLoading = getTransactions.isLoading
  if (isLoading) return <div className="p-8">Loading reports...</div>
  return (
    <div className="p-8 space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Master List of Books Issued</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Serial No</TableHead>
                <TableHead>Book Name</TableHead>
                <TableHead>Member Name</TableHead>
                <TableHead>Issue Date</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Return Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions?.map((t: any) => (
                <TableRow key={t._id}>
                  <TableCell>{t.book?.serialNumber}</TableCell>
                  <TableCell>{t.book?.title}</TableCell>
                  <TableCell>{t.member?.name}</TableCell>
                  <TableCell>{new Date(t.issueDate).toLocaleDateString()}</TableCell>
                  <TableCell>{new Date(t.dueDate).toLocaleDateString()}</TableCell>
                  <TableCell>{t.returnDate ? new Date(t.returnDate).toLocaleDateString() : "Pending"}</TableCell>
                </TableRow>
              ))}
              {transactions?.length === 0 && (
                <TableRow>
                   <TableCell colSpan={6} className="text-center">No records found</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
