"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import useBooks from "@/hooks/queries/useBooks"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { Search, Info } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function BooksPage() {
  const { getBooks } = useBooks()
  const allBooks = getBooks.data || []
  const [filteredBooks, setFilteredBooks] = useState<any[]>([])
  const [isAdmin, setIsAdmin] = useState(false)
  
  const [searchTitle, setSearchTitle] = useState("")
  const [searchType, setSearchType] = useState("all")
  const [searchError, setSearchError] = useState("")
  const [hasSearched, setHasSearched] = useState(false)
  const [selectedBookId, setSelectedBookId] = useState("")

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
    // Initially show nothing or all? 
    // Requirement says "Book Available: One of the text box or drop down to be filled in before submitting the form"
    // So we should probably wait for search.
  }, [])

  const handleSearch = () => {
    if (!searchTitle && searchType === "all") {
      setSearchError("Please fill in at least one search criteria (Title or Type).")
      return
    }
    setSearchError("")
    
    const filtered = allBooks.filter(book => {
      const matchTitle = !searchTitle || book.title.toLowerCase().includes(searchTitle.toLowerCase())
      const matchType = searchType === "all" || book.type === searchType
      return matchTitle && matchType
    })
    
    setFilteredBooks(filtered)
    setHasSearched(true)
  }

  if (getBooks.isLoading) return <div className="p-8 text-center">Loading collection...</div>

  return (
    <div className="p-8 space-y-8">
      <Card className="border-border/40 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="font-serif text-2xl">Book Search</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="searchTitle">Book Title</Label>
              <Input 
                id="searchTitle" 
                placeholder="Enter book title..." 
                value={searchTitle}
                onChange={(e) => setSearchTitle(e.target.value)}
                className="bg-background/50"
              />
            </div>
            <div className="space-y-2">
              <Label>Book Type</Label>
              <Select value={searchType} onValueChange={setSearchType}>
                <SelectTrigger className="bg-background/50">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="book">Book</SelectItem>
                  <SelectItem value="movie">Movie</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          {searchError && <p className="text-destructive text-sm font-medium">{searchError}</p>}
          <Button onClick={handleSearch} className="w-full md:w-auto px-8 gap-2">
            <Search className="h-4 w-4" /> Search Availability
          </Button>
        </CardContent>
      </Card>

      {hasSearched && (
        <Card className="overflow-hidden border-border/40">
          <CardHeader className="flex flex-row items-center justify-between bg-muted/30">
            <CardTitle className="font-serif">Search Results</CardTitle>
            {isAdmin && (
              <Link href="/maintenance/add-book">
                <Button size="sm" variant="outline" className="flex items-center gap-2">
                  <Plus className="h-4 w-4" /> Add New
                </Button>
              </Link>
            )}
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/10">
                  <TableHead className="pl-6">Title</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Serial No</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right pr-6">Select</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBooks.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="h-32 text-center text-muted-foreground">
                      No books found matching your criteria.
                    </TableCell>
                  </TableRow>
                ) : (
                  <RadioGroup value={selectedBookId} onValueChange={setSelectedBookId}>
                    {filteredBooks.map((book: any) => (
                      <TableRow key={book._id} className="group hover:bg-muted/5 transition-colors">
                        <TableCell className="font-medium pl-6">{book.title}</TableCell>
                        <TableCell>{book.author}</TableCell>
                        <TableCell className="capitalize">{book.type}</TableCell>
                        <TableCell className="font-mono text-xs">{book.serialNumber}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${book.available ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                            {book.available ? "Available" : "Issued"}
                          </span>
                        </TableCell>
                        <TableCell className="text-right pr-6">
                          <div className="flex justify-end min-h-[24px]">
                            {book.available && (
                              <RadioGroupItem 
                                value={book._id} 
                                id={book._id}
                                className="border-primary text-primary"
                              />
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </RadioGroup>
                )}
              </TableBody>
            </Table>
          </CardContent>
          {selectedBookId && (
            <CardFooter className="bg-muted/20 border-t p-4 flex justify-end gap-4">
              <p className="text-sm text-muted-foreground self-center">
                Book selected: <span className="font-bold text-foreground">{filteredBooks.find(b => b._id === selectedBookId)?.title}</span>
              </p>
              <Link href={`/transactions/issue-book?bookId=${selectedBookId}`}>
                <Button size="sm">Proceed to Issue</Button>
              </Link>
            </CardFooter>
          )}
        </Card>
      )}
    </div>
  )
}

