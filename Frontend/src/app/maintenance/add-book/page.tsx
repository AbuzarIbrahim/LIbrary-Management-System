"use client"

import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { bookSchema, BookFormValues } from "@/lib/validation"
import useBooks from "@/hooks/queries/useBooks"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Book, ApiResponse } from "@/types"

export default function AddBookPage() {
  const { addBook } = useBooks()
  
  const {
    register,
    handleSubmit,
    control,
    reset,
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

  const onSubmit = (data: BookFormValues) => {
    addBook.mutate(data, {
      onSuccess: (res: { success: boolean; data?: Book; message?: string }) => {
        if (res.success) {
          alert("Book/Movie added successfully")
          reset()
        } else {
          alert(res.message || "Failed to add book")
        }
      },
    })
  }

  return (
    <div className="p-8 flex justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Add Book / Movie</CardTitle>
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
              {errors.type && <p className="text-destructive text-xs">{errors.type.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input 
                id="title" 
                className={errors.title ? 'border-destructive' : ''}
                {...register("title")}
              />
              {errors.title && <p className="text-destructive text-xs">{errors.title.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="author">Author</Label>
              <Input 
                id="author" 
                className={errors.author ? 'border-destructive' : ''}
                {...register("author")}
              />
              {errors.author && <p className="text-destructive text-xs">{errors.author.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="serialNumber">Serial Number</Label>
              <Input 
                id="serialNumber" 
                className={errors.serialNumber ? 'border-destructive' : ''}
                {...register("serialNumber")}
              />
              {errors.serialNumber && <p className="text-destructive text-xs">{errors.serialNumber.message}</p>}
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={addBook.isPending}>
              {addBook.isPending ? "Adding..." : "Confirm"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
