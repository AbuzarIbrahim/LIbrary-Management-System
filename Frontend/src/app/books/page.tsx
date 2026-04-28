"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import useBooks from "@/hooks/queries/useBooks"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
export default function BooksPage() {
  const { getBooks } = useBooks()
  const { data: books, isLoading } = getBooks
  const [isAdmin, setIsAdmin] = useState(false)
  useEffect(() => {
    const userStr = localStorage.getItem("user")
    if (userStr) {
      try {
        const user = JSON.parse(userStr)
        setIsAdmin(user.role === "admin")
      } catch (e) {
        console.error(e)
      }
    }
  }, [])
  if (isLoading) return <div>Loading...</div>
  return (
    <div className="p-8">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Available Books</CardTitle>
          {isAdmin && (
            <Link href="/maintenance/add-book">
              <Button size="sm" className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add New Book
              </Button>
            </Link>
          )}
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Serial No</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {books?.map((book: any) => (
                <TableRow key={book._id}>
                  <TableCell>{book.title}</TableCell>
                  <TableCell>{book.author}</TableCell>
                  <TableCell className="capitalize">{book.type}</TableCell>
                  <TableCell>{book.serialNumber}</TableCell>
                  <TableCell>{book.available ? "Available" : "Issued"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
