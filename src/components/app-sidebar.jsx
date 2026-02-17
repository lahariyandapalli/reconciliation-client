import * as React from "react"
import {
  LayoutDashboard,
  Users,
  Landmark,
  KeyRound,
  ChevronsUpDown,
  FileSpreadsheet,
  BookOpen,
  CheckSquare,
  UserCog,
  UserPlus,
  ClipboardList,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"

const menuItems = [
  {
    title: "Dashboards",
    url: "#/",
    icon: LayoutDashboard,
  },
  {
    title: "Bank Master",
    url: "#/bank-master",
    icon: Landmark,
  },
  {
    title: "Client Master",
    url: "#/client-master",
    icon: Users,
  },
  {
    title: "Bank Statement",
    url: "#/bank-statement",
    icon: FileSpreadsheet,
  },
  {
    title: "Book Statement",
    url: "#/book-statement",
    icon: BookOpen,
  },
  {
    title: "Reconciled Items",
    url: "#/reconciled-items",
    icon: CheckSquare,
  },
  {
    title: "Reconciliation Summary",
    url: "#/reconciliation-summary",
    icon: ClipboardList,
  },
  {
    title: "User Management",
    url: "#/user-management",
    icon: UserCog,
  },
  {
    title: "Create User",
    url: "#/create-user",
    icon: UserPlus,
  },
]

const data = {
  user: {
    name: "Admin User",
    email: "admin@reconciliation.io",
    avatar: "",
  },
}

export function AppSidebar({ ...props }) {
  const [currentHash, setCurrentHash] = React.useState(window.location.hash || "#/")

  React.useEffect(() => {
    const onHashChange = () => setCurrentHash(window.location.hash || "#/")
    window.addEventListener("hashchange", onHashChange)
    return () => window.removeEventListener("hashchange", onHashChange)
  }, [])

  return (
    <Sidebar collapsible="icon" {...props}>
      {/* Brand header */}
      <SidebarHeader className="border-b border-sidebar-border px-4 h-14 justify-center">
        <a href="#/" className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-white text-sm font-bold shadow-sm">
            R
          </div>
          <span className="text-lg font-bold tracking-tight text-foreground group-data-[collapsible=icon]:hidden">
            RECONCILE
          </span>
        </a>
      </SidebarHeader>

      <SidebarContent className="px-1 pt-2">
        <SidebarGroup>
          <SidebarGroupLabel className="px-3 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/70 mb-1">
            Navigation
          </SidebarGroupLabel>
          <SidebarMenu>
            {menuItems.map((item) => {
              const isActive = currentHash === item.url
              return (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive}
                    tooltip={item.title}
                    className="h-9 gap-3 rounded-lg px-3 text-[13px] font-medium text-sidebar-foreground transition-all duration-150 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground data-[active=true]:bg-brand-600 data-[active=true]:text-white data-[active=true]:shadow-sm"
                  >
                    <a href={item.url}>
                      <item.icon className="h-4 w-4 shrink-0" />
                      <span className="flex-1">{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border px-4 py-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex w-full items-center gap-2.5 rounded-md p-1 -m-1 hover:bg-sidebar-accent transition-colors outline-none">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-400 to-brand-600 text-xs font-bold text-white shadow-sm">
                {data.user.name.charAt(0)}
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
                <span className="truncate font-semibold text-foreground">{data.user.name}</span>
                <span className="truncate text-xs text-muted-foreground">{data.user.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto h-4 w-4 text-muted-foreground group-data-[collapsible=icon]:hidden" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="top" align="start" className="w-56">
            <DropdownMenuItem onClick={() => (window.location.hash = '#/change-password')}>
              <KeyRound className="mr-2 h-4 w-4" />
              Change Password
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
