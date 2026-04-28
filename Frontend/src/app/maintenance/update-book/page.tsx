"use client"

import { useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { bookSchema, BookFormValues } from "@/lib/validation"
import useBooks from "@/hooks/queries/useBooks"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Book } from "@/types"
import { Search } from "lucide-react"

export default function UpdateBookPage() {
  const { getBooks, updateBook } = useBooks()
  const books = getBooks.data || []
  
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedBook, setSelectedBook] = useState<Book | null>(null)
  const [error, setError] = useState("")

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<BookFormValues>({
    resolver: zodResolver(bookSchema),
    defaultValues: {
      title: "",
      author: "",
      type: "book",
      serialNumber: "",
    },
  })

  const handleSearch = () => {
    if (!searchTerm) {
      setError("Please enter a book title or serial number to search.")
      return
    }
    const found = books.find(b => 
      b.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      b.serialNumber.toLowerCase() === searchTerm.toLowerCase()
    )
    if (found) {
      setSelectedBook(found)
      setValue("title", found.title)
      setValue("author", found.author)
      setValue("type", found.type as "book" | "movie")
      setValue("serialNumber", found.serialNumber)
      setError("")
    } else {
      setSelectedBook(null)
      setError("No book found with that title or serial number.")
    }
  }

  const onSubmit = (data: BookFormValues) => {
    if (!selectedBook) return
    
    updateBook.mutate({ id: selectedBook._id, ...data } as any, {
      onSuccess: (res: { success: boolean; message?: string }) => {
        if (res.success) {
          alert("Book updated successfully")
          setSelectedBook(null)
          setSearchTerm("")
        } else {
          alert(res.message || "Failed to update book")
        }
      },
    })
  }

  return (
    <div className="p-8 space-y-8 flex flex-col items-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Search Book to Update</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <div className="flex-1 space-y-2">
              <Label htmlFor="search">Title or Serial Number</Label>
              <Input 
                id="search" 
                placeholder="Enter search term..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button className="mt-8" onClick={handleSearch}>
              <Search className="h-4 w-4" />
            </Button>
          </div>
          {error && <p className="text-destructive text-sm">{error}</p>}
        </CardContent>
      </Card>

      {selectedBook && (
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Update Details</CardTitle>
          </CardHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Type</Label>
                <Controller
                  name="type"
                  control={control}
                  render={({ field }) => (
                    <RadioGroup 
                      value={field.value} 
                      onValueChange={field.onChange}
                      className="flex gap-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="book" id="book" />
                        <Label htmlFor="book">Book</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="movie" id="movie" />
                        <Label htmlFor="movie">Movie</Label>
                      </div>
                    </RadioGroup>
                  )}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input 
                  id="title" 
                  {...register("title")}
                  className={errors.title ? 'border-destructive' : ''}
                />
                {errors.title && <p className="text-destructive text-xs">{errors.title.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="author">Author</Label>
                <Input 
                  id="author" 
                  {...register("author")}
                  className={errors.author ? 'border-destructive' : ''}
                />
                {errors.author && <p className="text-destructive text-xs">{errors.author.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="serialNumber">Serial Number</Label>
                <Input 
                  id="serialNumber" 
                  {...register("serialNumber")}
                  className={errors.serialNumber ? 'border-destructive' : ''}
                />
                {errors.serialNumber && <p className="text-destructive text-xs">{errors.serialNumber.message}</p>}
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full" disabled={updateBook.isPending}>
                {updateBook.isPending ? "Updating..." : "Confirm Update"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      )}
    </div>
  )
}
