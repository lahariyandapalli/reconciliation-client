import { cn } from "@/lib/utils"

const statusStyles = {
  completed: "bg-emerald-50 text-emerald-700 border-emerald-200",
  "in progress": "bg-blue-50 text-blue-700 border-blue-200",
  sent: "bg-amber-50 text-amber-700 border-amber-200",
  new: "bg-sky-50 text-sky-700 border-sky-200",
  "not interested": "bg-red-50 text-red-700 border-red-200",
  returning: "bg-violet-50 text-violet-700 border-violet-200",
  pending: "bg-orange-50 text-orange-700 border-orange-200",
  active: "bg-emerald-50 text-emerald-700 border-emerald-200",
  inactive: "bg-gray-50 text-gray-600 border-gray-200",
}

export default function StatusBadge({ status, className }) {
  const normalized = status?.toLowerCase() || ""
  const styles = statusStyles[normalized] || "bg-gray-50 text-gray-600 border-gray-200"

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-medium capitalize",
        styles,
        className
      )}
    >
      {status}
    </span>
  )
}
