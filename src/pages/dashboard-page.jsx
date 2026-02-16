import {
  DollarSign,
  UserCheck,
  Briefcase,
  TrendingUp,
  ArrowUpRight,
  MoreHorizontal,
  Calendar,
  Star,
} from "lucide-react"
import StatCard from "@/components/stat-card"
import StatusBadge from "@/components/status-badge"
import TopHeader from "@/components/top-header"
import { AppSidebar } from "@/components/app-sidebar"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

/* ─── Mock data ─── */
const latestLeads = [
  { name: "Archie Cantones", email: "archie.tones@gmail.com", proposal: "Sent", date: "11/06/2023 10:53", status: "Completed", avatar: "AC" },
  { name: "Holmes Cherryman", email: "golms.chan@gmail.com", proposal: "New", date: "11/06/2023 10:53", status: "In Progress", avatar: "HC" },
  { name: "Melanie Harvey", email: "lanie.mevyn@gmail.com", proposal: "Sent", date: "11/06/2023 10:53", status: "Completed", avatar: "MH" },
  { name: "Kenneth Hune", email: "knethi.une@gmail.com", proposal: "Returning", date: "11/06/2023 10:53", status: "Not Interested", avatar: "KH" },
  { name: "Valentine Maton", email: "sienna.aron@gmail.com", proposal: "Sent", date: "11/06/2023 10:53", status: "Completed", avatar: "VM" },
]

const upcomingSchedule = [
  { day: 20, month: "DEC", title: "React Dashboard Design", time: "11:30am - 11:30pm", color: "bg-brand-100 text-brand-700" },
  { day: 30, month: "DEC", title: "Admin Design Concept", time: "10:00am - 12:00pm", color: "bg-emerald-100 text-emerald-700" },
  { day: 17, month: "DEC", title: "Standup Team Meeting", time: "6:00am - 9:00am", color: "bg-amber-100 text-amber-700" },
  { day: 25, month: "DEC", title: "Zoom Team Meeting", time: "03:30pm - 05:30pm", color: "bg-rose-100 text-rose-700" },
]

const projectStatus = [
  { name: "Apps Development", category: "Applications", progress: 54, color: "bg-red-500" },
  { name: "Dashboard Design", category: "App UI UX", progress: 85, color: "bg-violet-500" },
  { name: "Facebook Marketing", category: "Marketing", progress: 90, color: "bg-emerald-500" },
  { name: "React Dashboard Github", category: "React", progress: 37, color: "bg-brand-600" },
  { name: "Paypal Payment Gateway", category: "Payment", progress: 29, color: "bg-amber-500" },
]

const teamProgress = [
  { name: "Alexandra Della", role: "Frontend Developer", progress: 40 },
  { name: "Archie Cantones", role: "UI/UX Designer", progress: 65 },
  { name: "Melanie Harvey", role: "Backend Developer", progress: 50 },
  { name: "Kenneth Hune", role: "Digital Marketer", progress: 75 },
]

const recentSales = [
  { name: "Shopify eCommerce Store", category: "Development", amount: "$1200", icon: "🛒" },
  { name: "iOS Apps Development", category: "Development", amount: "$1450", icon: "📱" },
  { name: "Figma Dashboard Design", category: "UI/UX Design", amount: "$1250", icon: "🎨" },
]

export default function DashboardPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <TopHeader title="Dashboard" breadcrumb={["Home"]} />

        <div className="flex-1 space-y-6 p-6">
          {/* ─── Stat cards row ─── */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
              icon={DollarSign}
              value="45"
              total="76"
              label="Invoices Awaiting Payment"
              sublabel="Invoices Awaiting"
              secondaryValue="$5,569 (68%)"
              progress={68}
              color="blue"
            />
            <StatCard
              icon={UserCheck}
              value="48"
              total="86"
              label="Converted Leads"
              sublabel="Converted Leads"
              secondaryValue="57 Completed (61%)"
              progress={61}
              color="green"
            />
            <StatCard
              icon={Briefcase}
              value="16"
              total="20"
              label="Projects In Progress"
              sublabel="Projects In Progress"
              secondaryValue="14 Completed (74%)"
              progress={74}
              color="orange"
            />
            <StatCard
              icon={TrendingUp}
              value="46.59%"
              label="Conversion Rate"
              sublabel="Conversion Rate"
              secondaryValue="$1,754 (48%)"
              progress={48}
              color="purple"
            />
          </div>

          {/* ─── Main content grid ─── */}
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
            {/* Payment Record chart placeholder */}
            <div className="col-span-1 xl:col-span-2 rounded-xl border border-border bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-base font-semibold text-foreground">
                  Payment Record
                </h3>
                <button className="text-muted-foreground/50 hover:text-muted-foreground">
                  <MoreHorizontal className="h-4 w-4" />
                </button>
              </div>
              {/* Chart placeholder — styled bars */}
              <div className="flex items-end gap-3 h-52 mb-6">
                {[60, 35, 80, 25, 50, 90, 45, 70, 30, 55, 40, 65].map(
                  (h, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1">
                      <div
                        className="w-full rounded-t-md bg-brand-600 transition-all hover:bg-brand-500"
                        style={{ height: `${h}%` }}
                      />
                      <span className="text-[10px] text-muted-foreground">
                        {["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"][i]}
                      </span>
                    </div>
                  )
                )}
              </div>
              {/* Summary row */}
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                {[
                  { label: "Awaiting", value: "$5,486", color: "bg-blue-500" },
                  { label: "Completed", value: "$9,275", color: "bg-emerald-500" },
                  { label: "Rejected", value: "$3,868", color: "bg-red-500" },
                  { label: "Revenue", value: "$50,668", color: "bg-amber-500" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-lg border border-border p-3"
                  >
                    <p className="text-xs text-muted-foreground mb-1">
                      {item.label}
                    </p>
                    <p className="text-lg font-bold text-foreground">
                      {item.value}
                    </p>
                    <div className={`mt-2 h-1 w-12 rounded-full ${item.color}`} />
                  </div>
                ))}
              </div>
            </div>

            {/* Total Sales card */}
            <div className="col-span-1 flex flex-col gap-5">
              <div className="rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 p-6 text-white shadow-lg">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-3xl font-bold">30,569</p>
                    <p className="text-sm text-white/70 mt-1">Total Sales</p>
                  </div>
                  <span className="rounded-md bg-white/20 px-2 py-0.5 text-xs font-medium backdrop-blur-sm">
                    <ArrowUpRight className="mr-0.5 inline h-3 w-3" />
                    19%
                  </span>
                </div>
                {/* Mini sparkline area */}
                <svg viewBox="0 0 200 60" className="w-full h-16 mt-2">
                  <defs>
                    <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="rgba(255,255,255,0.3)" />
                      <stop offset="100%" stopColor="rgba(255,255,255,0.02)" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M0,45 Q20,40 40,35 T80,20 T120,30 T160,15 T200,25"
                    fill="none"
                    stroke="rgba(255,255,255,0.8)"
                    strokeWidth="2"
                  />
                  <path
                    d="M0,45 Q20,40 40,35 T80,20 T120,30 T160,15 T200,25 L200,60 L0,60 Z"
                    fill="url(#salesGradient)"
                  />
                </svg>
              </div>

              {/* Recent activity */}
              <div className="flex-1 rounded-xl border border-border bg-white p-5 shadow-sm">
                <div className="space-y-4">
                  {recentSales.map((sale, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3"
                    >
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-50 text-base">
                        {sale.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">
                          {sale.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {sale.category}
                        </p>
                      </div>
                      <span className="text-sm font-semibold text-foreground">
                        {sale.amount}
                      </span>
                    </div>
                  ))}
                </div>
                <button className="mt-4 w-full text-center text-xs font-semibold uppercase tracking-wide text-muted-foreground hover:text-foreground">
                  FULL DETAILS
                </button>
              </div>
            </div>
          </div>

          {/* ─── Leads Overview + Latest Leads ─── */}
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
            {/* Leads Overview donut chart placeholder */}
            <div className="rounded-xl border border-border bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-base font-semibold text-foreground">Leads Overview</h3>
                <button className="text-muted-foreground/50 hover:text-muted-foreground">
                  <MoreHorizontal className="h-4 w-4" />
                </button>
              </div>
              {/* Donut chart placeholder */}
              <div className="flex items-center justify-center mb-5">
                <svg viewBox="0 0 120 120" className="h-40 w-40">
                  <circle cx="60" cy="60" r="52" fill="none" stroke="#e2e8f0" strokeWidth="12" />
                  <circle cx="60" cy="60" r="52" fill="none" stroke="#3b4cca" strokeWidth="12"
                    strokeDasharray="240 327" strokeDashoffset="0" strokeLinecap="round"
                    transform="rotate(-90 60 60)" />
                  <text x="60" y="55" textAnchor="middle" className="text-xl font-bold" fill="#1e293b" fontSize="18">73%</text>
                  <text x="60" y="72" textAnchor="middle" fill="#64748b" fontSize="9">Converted</text>
                </svg>
              </div>
              {/* Legend */}
              <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                {["New (206)", "Contacted (116)", "Working (186)", "Customer (166)", "Leads (186)", "Progress (186)", "Qualified (100)", "Proposal (156)"].map((item) => (
                  <div key={item} className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-brand-600" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Latest Leads table */}
            <div className="col-span-1 xl:col-span-2 rounded-xl border border-border bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-base font-semibold text-foreground">Latest Leads</h3>
                <button className="text-muted-foreground/50 hover:text-muted-foreground">
                  <MoreHorizontal className="h-4 w-4" />
                </button>
              </div>
              <div className="overflow-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border text-left">
                      <th className="pb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Users</th>
                      <th className="pb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Proposal</th>
                      <th className="pb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Date</th>
                      <th className="pb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Status</th>
                      <th className="pb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {latestLeads.map((lead, i) => (
                      <tr key={i} className="border-b border-border/50 last:border-0">
                        <td className="py-3.5">
                          <div className="flex items-center gap-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-brand-100 to-brand-200 text-xs font-semibold text-brand-700">
                              {lead.avatar}
                            </div>
                            <div>
                              <p className="font-medium text-foreground">{lead.name}</p>
                              <p className="text-xs text-muted-foreground">{lead.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3.5">
                          <StatusBadge status={lead.proposal} />
                        </td>
                        <td className="py-3.5 text-muted-foreground">{lead.date}</td>
                        <td className="py-3.5">
                          <StatusBadge status={lead.status} />
                        </td>
                        <td className="py-3.5">
                          <button className="text-muted-foreground/50 hover:text-muted-foreground">
                            <MoreHorizontal className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {/* Pagination */}
              <div className="mt-4 flex items-center justify-center gap-1">
                <button className="h-7 w-7 rounded-md text-xs text-muted-foreground hover:bg-muted">←</button>
                <button className="h-7 w-7 rounded-md bg-brand-600 text-xs font-medium text-white shadow-sm">1</button>
                <button className="h-7 w-7 rounded-md text-xs text-muted-foreground hover:bg-muted">2</button>
                <button className="h-7 w-7 rounded-md text-xs text-muted-foreground hover:bg-muted">...</button>
                <button className="h-7 w-7 rounded-md text-xs text-muted-foreground hover:bg-muted">8</button>
                <button className="h-7 w-7 rounded-md text-xs text-muted-foreground hover:bg-muted">9</button>
                <button className="h-7 w-7 rounded-md text-xs text-muted-foreground hover:bg-muted">→</button>
              </div>
            </div>
          </div>

          {/* ─── Bottom row: Schedule, Project Status, Team Progress ─── */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Upcoming Schedule */}
            <div className="rounded-xl border border-border bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-base font-semibold text-foreground">Upcoming Schedule</h3>
                <button className="text-muted-foreground/50 hover:text-muted-foreground">
                  <MoreHorizontal className="h-4 w-4" />
                </button>
              </div>
              <div className="space-y-3">
                {upcomingSchedule.map((item, i) => (
                  <div key={i} className="flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-muted/50">
                    <div className={`flex h-12 w-12 flex-col items-center justify-center rounded-lg text-center ${item.color}`}>
                      <span className="text-lg font-bold leading-none">{item.day}</span>
                      <span className="text-[10px] font-medium uppercase">{item.month}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{item.title}</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {item.time}
                      </p>
                    </div>
                    <div className="flex -space-x-1.5">
                      {[0, 1, 2].map((j) => (
                        <div key={j} className="h-6 w-6 rounded-full border-2 border-white bg-gradient-to-br from-brand-200 to-brand-400" />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <button className="mt-4 w-full text-center text-xs font-semibold uppercase tracking-wide text-muted-foreground hover:text-foreground">
                UPCOMMING SCHEDULE
              </button>
            </div>

            {/* Project Status */}
            <div className="rounded-xl border border-border bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-base font-semibold text-foreground">Project Status</h3>
                <button className="text-muted-foreground/50 hover:text-muted-foreground">
                  <MoreHorizontal className="h-4 w-4" />
                </button>
              </div>
              <div className="space-y-4">
                {projectStatus.map((project, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className={`h-9 w-9 rounded-lg ${project.color} flex items-center justify-center`}>
                      <Star className="h-4 w-4 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground">{project.name}</p>
                      <p className="text-xs text-muted-foreground uppercase">{project.category}</p>
                    </div>
                    <div className="flex items-center gap-2 w-28">
                      <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${project.color}`} style={{ width: `${project.progress}%` }} />
                      </div>
                      <span className="text-xs font-medium text-muted-foreground w-8 text-right">{project.progress}%</span>
                    </div>
                  </div>
                ))}
              </div>
              <button className="mt-5 w-full text-center text-xs font-semibold uppercase tracking-wide text-muted-foreground hover:text-foreground">
                UPCOMMING PROJECTS
              </button>
            </div>

            {/* Team Progress */}
            <div className="rounded-xl border border-border bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-base font-semibold text-foreground">Team Progress</h3>
                <button className="text-muted-foreground/50 hover:text-muted-foreground">
                  <MoreHorizontal className="h-4 w-4" />
                </button>
              </div>
              <div className="space-y-4">
                {teamProgress.map((member, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-brand-100 to-brand-200 text-xs font-semibold text-brand-700">
                      {member.name.split(" ").map(n => n[0]).join("")}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground">{member.name}</p>
                      <p className="text-xs text-muted-foreground">{member.role}</p>
                    </div>
                    {/* Circular progress */}
                    <div className="relative h-10 w-10">
                      <svg viewBox="0 0 36 36" className="h-full w-full -rotate-90">
                        <circle cx="18" cy="18" r="14" fill="none" stroke="#e2e8f0" strokeWidth="3" />
                        <circle cx="18" cy="18" r="14" fill="none" stroke={
                          member.progress >= 70 ? "#10b981" :
                          member.progress >= 50 ? "#3b4cca" :
                          "#f59e0b"
                        } strokeWidth="3" strokeDasharray={`${member.progress * 0.88} 88`} strokeLinecap="round" />
                      </svg>
                      <span className="absolute inset-0 flex items-center justify-center text-[10px] font-semibold text-foreground">
                        {member.progress}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-5 text-center text-[11px] text-muted-foreground">
                UPDATE 30 MIN AGO
              </p>
            </div>
          </div>

          {/* ─── Footer ─── */}
          <footer className="flex items-center justify-between border-t border-border pt-4 pb-2 text-xs text-muted-foreground">
            <span>COPYRIGHT © 2026</span>
            <div className="flex gap-4">
              <a href="#" className="hover:text-foreground">HELP</a>
              <a href="#" className="hover:text-foreground">TERMS</a>
              <a href="#" className="hover:text-foreground">PRIVACY</a>
            </div>
          </footer>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
