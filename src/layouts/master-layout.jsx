import { useState } from "react"
import { Filter, Search, X } from "lucide-react"
import { AppSidebar } from "@/components/app-sidebar"
import TopHeader from "@/components/top-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { useDataSearch } from "@/hooks/use-data-search"

export default function MasterLayout({
  title,
  description,
  data = [],
  columns = [],
  searchPlaceholder = "Search...",
  children,
}) {
  // Track which columns are selected for filtering
  const [selectedKeys, setSelectedKeys] = useState([])

  // Pass selected keys to hook — empty means search all
  const { query, setQuery, results, resultCount } = useDataSearch(data, selectedKeys)

  const toggleKey = (key) => {
    setSelectedKeys((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    )
  }

  const clearFilters = () => setSelectedKeys([])

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <TopHeader title={title} breadcrumb={["Home"]} />

        {/* Page content */}
        <div className="flex flex-1 flex-col gap-6 p-6 min-w-0">
          {/* Page header: title+desc left, filter+search right */}
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
              {description && (
                <p className="text-sm text-muted-foreground mt-1">
                  {description}
                </p>
              )}
            </div>

            <div className="flex items-center gap-2">
              {/* Filter dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon" className="relative">
                    <Filter className="h-4 w-4" />
                    {selectedKeys.length > 0 && (
                      <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-brand-600 text-[10px] font-medium text-white">
                        {selectedKeys.length}
                      </span>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel className="flex items-center justify-between">
                    <span>Filter by columns</span>
                    {selectedKeys.length > 0 && (
                      <button
                        onClick={clearFilters}
                        className="text-xs text-muted-foreground hover:text-foreground"
                      >
                        Clear all
                      </button>
                    )}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {columns.map((col) => (
                    <DropdownMenuCheckboxItem
                      key={col.accessorKey}
                      checked={selectedKeys.includes(col.accessorKey)}
                      onCheckedChange={() => toggleKey(col.accessorKey)}
                    >
                      {col.header}
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Search input */}
              <div className="relative w-72">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={searchPlaceholder}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
          </div>

          {/* Active filter chips */}
          {selectedKeys.length > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              {selectedKeys.map((key) => {
                const col = columns.find((c) => c.accessorKey === key)
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
              <button
                onClick={clearFilters}
                className="text-xs text-muted-foreground hover:text-foreground underline-offset-2 hover:underline"
              >
                Clear all
              </button>
            </div>
          )}

          {/* Page children — receives filtered results */}
          {typeof children === "function"
            ? children({ results, resultCount, query })
            : children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
