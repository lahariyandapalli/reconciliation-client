import { useState, useMemo } from "react"
import { Pencil, Save, Trash2, RotateCcw } from "lucide-react"
import MasterLayout from "@/layouts/master-layout"
import { MasterDataTable } from "@/components/master-data-table"
import { userManagementData } from "@/mock-data/user-management-data"
import { userColumns as baseUserColumns } from "@/columns/user-cols"
import { Input } from "@/components/ui/input"

export default function UserManagement() {
  const [users, setUsers] = useState(userManagementData)
  const [editingId, setEditingId] = useState(null)
  const [editDraft, setEditDraft] = useState({})

  /* ── Edit / Save ── */
  const startEdit = (row) => {
    setEditingId(row.id)
    setEditDraft({
      name: row.name,
      email: row.email,
      company_name: row.company_name,
      role_name: row.role_name,
    })
  }

  const saveEdit = (id) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, ...editDraft } : u))
    )
    setEditingId(null)
    setEditDraft({})
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditDraft({})
  }

  /* ── Soft Delete ── */
  const softDelete = (id) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, status: "Deleted" } : u))
    )
  }

  /* ── Retrieve ── */
  const retrieve = (id) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, status: "Active" } : u))
    )
  }

  /* ── Build columns with custom cell renderers ── */
  const columns = useMemo(() => {
    return baseUserColumns.map((col) => {
      /* Status badge */
      if (col.accessorKey === "status") {
        return {
          ...col,
          cell: (value) => {
            const styles = {
              Active:
                "bg-emerald-50 text-emerald-700 border-emerald-200",
              Inactive:
                "bg-amber-50 text-amber-700 border-amber-200",
              Deleted:
                "bg-red-50 text-red-600 border-red-200",
            }
            return (
              <span
                className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${
                  styles[value] ?? "bg-muted text-muted-foreground border-border"
                }`}
              >
                {value}
              </span>
            )
          },
        }
      }

      /* Editable text cells */
      if (["name", "email", "company_name", "role_name"].includes(col.accessorKey)) {
        return {
          ...col,
          cell: (value, row) => {
            if (editingId === row.id) {
              return (
                <Input
                  value={editDraft[col.accessorKey] ?? value}
                  onChange={(e) =>
                    setEditDraft((d) => ({
                      ...d,
                      [col.accessorKey]: e.target.value,
                    }))
                  }
                  className="h-8 text-sm min-w-[120px]"
                />
              )
            }
            return value
          },
        }
      }

      /* Actions column */
      if (col.accessorKey === "_actions") {
        return {
          ...col,
          cell: (_value, row) => {
            const isDeleted = row.status === "Deleted"
            const isEditing = editingId === row.id

            return (
              <div className="flex items-center gap-1">
                {/* Edit / Save */}
                {!isDeleted && !isEditing && (
                  <button
                    onClick={() => startEdit(row)}
                    title="Edit"
                    className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-brand-50 hover:text-brand-600 transition-colors"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                )}
                {isEditing && (
                  <>
                    <button
                      onClick={() => saveEdit(row.id)}
                      title="Save"
                      className="inline-flex h-8 w-8 items-center justify-center rounded-md text-emerald-600 hover:bg-emerald-50 transition-colors"
                    >
                      <Save className="h-4 w-4" />
                    </button>
                    <button
                      onClick={cancelEdit}
                      title="Cancel"
                      className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-muted transition-colors text-xs font-medium px-2 w-auto"
                    >
                      Cancel
                    </button>
                  </>
                )}

                {/* Soft Delete */}
                {!isDeleted && !isEditing && (
                  <button
                    onClick={() => softDelete(row.id)}
                    title="Delete"
                    className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-red-50 hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}

                {/* Retrieve */}
                {isDeleted && (
                  <button
                    onClick={() => retrieve(row.id)}
                    title="Retrieve"
                    className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-brand-50 hover:text-brand-600 transition-colors"
                  >
                    <RotateCcw className="h-4 w-4" />
                  </button>
                )}
              </div>
            )
          },
        }
      }

      return col
    })
  }, [editingId, editDraft])

  return (
    <MasterLayout
      title="User Management"
      description="Manage user accounts, roles, and access control."
      data={users}
      columns={columns}
      searchPlaceholder="Search users..."
    >
      {({ results }) => (
        <MasterDataTable columns={columns} data={results} />
      )}
    </MasterLayout>
  )
}
