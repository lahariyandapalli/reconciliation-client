import { useState } from "react"
import {
  Landmark,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Search,
  Filter,
  X,
} from "lucide-react"
import { MasterDataTable } from "@/components/master-data-table"
import { bankRecordColumns } from "@/columns/bank-record-cols"
import { bookRecordColumns } from "@/columns/book-record-cols"
import { useDataSearch } from "@/hooks/use-data-search"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

/* Build a merged column list with source labels to avoid key collisions */
const allFilterColumns = [
  ...bankRecordColumns.map((c) => ({ ...c, source: "Bank" })),
  ...bookRecordColumns
    .filter((c) => !bankRecordColumns.some((b) => b.accessorKey === c.accessorKey))
    .map((c) => ({ ...c, source: "Book" })),
]

export default function ReconciledItems({ bankData = [], bookData = [] }) {
  /* ─── Unified search ─── */
  const [filterKeys, setFilterKeys] = useState([])

  const {
    query: searchQuery,
    setQuery: setSearchQuery,
    results: bankResults,
  } = useDataSearch(bankData, filterKeys)

  const {
    query: _bookQuery,
    setQuery: _setBookQuery,
    results: bookResults,
  } = useDataSearch(bookData, filterKeys)

  /* Keep book query in sync with the single search input */
  const handleQueryChange = (val) => {
    setSearchQuery(val)
    _setBookQuery(val)
  }

  const toggleKey = (key) =>
    setFilterKeys((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    )
  const clearFilters = () => setFilterKeys([])

  return (
    <div className="space-y-6">
      {/* ─── Filter bar — right-aligned ─── */}
      <div className="flex items-center justify-end gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="relative shrink-0">
              <Filter className="h-4 w-4" />
              {filterKeys.length > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-brand-600 text-[10px] font-medium text-white">
                  {filterKeys.length}
                </span>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel className="flex items-center justify-between">
              <span>Filter columns</span>
              {filterKeys.length > 0 && (
                <button
                  onClick={clearFilters}
                  className="text-xs text-muted-foreground hover:text-foreground"
                >
                  Clear all
                </button>
              )}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {allFilterColumns.map((col) => (
              <DropdownMenuCheckboxItem
                key={col.accessorKey}
                checked={filterKeys.includes(col.accessorKey)}
                onCheckedChange={() => toggleKey(col.accessorKey)}
              >
                {col.header}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="relative w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search records..."
            value={searchQuery}
            onChange={(e) => handleQueryChange(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      {/* ─── Active filter chips ─── */}
      {filterKeys.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          {filterKeys.map((key) => {
            const col = allFilterColumns.find((c) => c.accessorKey === key)
            return (
              <span
                key={key}
                className="inline-flex items-center gap-1 rounded-md border border-brand-200 bg-brand-50 px-2.5 py-1 text-xs font-medium text-brand-700"
              >
                {col?.header ?? key}
                <button
                  onClick={() => toggleKey(key)}
                  className="ml-0.5 rounded-sm hover:bg-brand-200/50 p-0.5"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            )
          })}
        </div>
      )}

      {/* ─── Tables grid ─── */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        {/* ─── Bank Records panel ─── */}
        <div className="rounded-xl border border-border bg-white shadow-sm overflow-hidden">
          <div className="flex items-center justify-between bg-brand-50 border-b border-border px-4 py-3">
            <div className="flex items-center gap-2">
              <Landmark className="h-4 w-4 text-brand-600" />
              <span className="text-sm font-semibold text-foreground uppercase tracking-wide">
                Bank Records
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span>
                Showing {bankResults.length} of {bankData.length}
              </span>
              <button className="h-6 w-6 rounded border border-border bg-white flex items-center justify-center hover:bg-muted transition-colors">
                <ChevronLeft className="h-3.5 w-3.5" />
              </button>
              <button className="h-6 w-6 rounded border border-border bg-white flex items-center justify-center hover:bg-muted transition-colors">
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          <div className="p-0">
            <MasterDataTable columns={bankRecordColumns} data={bankResults} />
          </div>

          {bankResults.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mb-3 text-muted-foreground/40">
                <path d="M16 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8Z" />
                <path d="M15 3v4a2 2 0 0 0 2 2h4" />
                <line x1="9" y1="15" x2="15" y2="15" />
                <line x1="12" y1="18" x2="12" y2="12" />
              </svg>
              <p className="text-sm">No reconciled bank records</p>
            </div>
          )}
        </div>

        {/* ─── Company (Book) Records panel ─── */}
        <div className="rounded-xl border border-border bg-white shadow-sm overflow-hidden">
          <div className="flex items-center justify-between bg-brand-50 border-b border-border px-4 py-3">
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-brand-600" />
              <span className="text-sm font-semibold text-foreground uppercase tracking-wide">
                Company Records
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span>
                Showing {bookResults.length} of {bookData.length}
              </span>
              <button className="h-6 w-6 rounded border border-border bg-white flex items-center justify-center hover:bg-muted transition-colors">
                <ChevronLeft className="h-3.5 w-3.5" />
              </button>
              <button className="h-6 w-6 rounded border border-border bg-white flex items-center justify-center hover:bg-muted transition-colors">
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          <div className="p-0">
            <MasterDataTable columns={bookRecordColumns} data={bookResults} />
          </div>

          {bookResults.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mb-3 text-muted-foreground/40">
                <path d="M16 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8Z" />
                <path d="M15 3v4a2 2 0 0 0 2 2h4" />
                <line x1="9" y1="15" x2="15" y2="15" />
                <line x1="12" y1="18" x2="12" y2="12" />
              </svg>
              <p className="text-sm">No reconciled company records</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
