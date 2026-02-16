import { LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SidebarTrigger } from "@/components/ui/sidebar"

export default function TopHeader({
  title = "Dashboard",
  breadcrumb = ["Home"],
}) {
  return (
    <header className="sticky top-0 z-20 flex flex-col border-b border-border bg-white">
      {/* Primary bar */}
      <div className="flex h-14 items-center justify-between gap-4 px-4">
        {/* Left: trigger */}
        <div className="flex items-center gap-2">
          <SidebarTrigger className="-ml-1 text-muted-foreground hover:text-foreground" />
        </div>

        {/* Right: actions */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="h-8 gap-1.5 text-xs font-medium text-muted-foreground hover:text-red-600"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </div>
    </header>
  )
}
