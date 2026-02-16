import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

/**
 * A reusable data table component that renders rows from data
 * using column definitions with `header` and `accessorKey`.
 *
 * @param {Object} props
 * @param {Array<{ header: string, accessorKey: string, cell?: (value, row) => React.ReactNode }>} props.columns
 * @param {Array<Object>} props.data
 *
 * @example
 * import { bankMasterColumns } from "@/columns/bank-master-cols"
 *
 * <MasterDataTable columns={bankMasterColumns} data={bankData} />
 */
export function MasterDataTable({ columns = [], data = [] }) {
  return (
    <div className="rounded-lg border border-border/60 overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="bg-brand-100 hover:bg-brand-100">
            {columns.map((col) => (
              <TableHead key={col.accessorKey} className="whitespace-nowrap">
                {col.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length > 0 ? (
            data.map((row, rowIndex) => (
              <TableRow key={row.id ?? rowIndex}>
                {columns.map((col) => (
                  <TableCell key={col.accessorKey} className="whitespace-nowrap">
                    {col.cell
                      ? col.cell(row[col.accessorKey], row)
                      : row[col.accessorKey] ?? "—"}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="h-24 text-center text-muted-foreground"
              >
                No results found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
