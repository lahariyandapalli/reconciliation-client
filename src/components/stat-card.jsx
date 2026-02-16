import { cn } from "@/lib/utils"

const colorMap = {
  blue: {
    icon: "bg-brand-100 text-brand-600",
    bar: "bg-brand-600",
    barTrack: "bg-brand-100",
    trend: "text-brand-600",
  },
  green: {
    icon: "bg-emerald-100 text-emerald-600",
    bar: "bg-emerald-500",
    barTrack: "bg-emerald-100",
    trend: "text-emerald-600",
  },
  orange: {
    icon: "bg-amber-100 text-amber-600",
    bar: "bg-amber-500",
    barTrack: "bg-amber-100",
    trend: "text-amber-600",
  },
  purple: {
    icon: "bg-violet-100 text-violet-600",
    bar: "bg-violet-500",
    barTrack: "bg-violet-100",
    trend: "text-violet-600",
  },
}

export default function StatCard({
  icon: Icon,
  value,
  total,
  label,
  sublabel,
  secondaryLabel,
  secondaryValue,
  progress = 0,
  color = "blue",
  className,
}) {
  const colors = colorMap[color] || colorMap.blue

  return (
    <div
      className={cn(
        "group relative rounded-xl border border-border bg-white p-5 shadow-sm transition-shadow hover:shadow-md",
        className
      )}
    >
      {/* Top section */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-lg",
              colors.icon
            )}
          >
            <Icon className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-foreground">
                {value}
                {total && (
                  <span className="text-base font-medium text-muted-foreground">
                    /{total}
                  </span>
                )}
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">{label}</p>
          </div>
        </div>

        {/* Three-dot menu (decorative) */}
        <button className="text-muted-foreground/50 hover:text-muted-foreground">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="currentColor"
          >
            <circle cx="8" cy="3" r="1.5" />
            <circle cx="8" cy="8" r="1.5" />
            <circle cx="8" cy="13" r="1.5" />
          </svg>
        </button>
      </div>

      {/* Progress bar section */}
      <div className="mt-4">
        <div className="flex items-center justify-between text-xs mb-1.5">
          <span className="text-muted-foreground">{sublabel}</span>
          {secondaryValue && (
            <span className="font-medium text-foreground">
              {secondaryLabel && (
                <span className="text-muted-foreground mr-1">
                  {secondaryLabel}
                </span>
              )}
              {secondaryValue}
            </span>
          )}
        </div>
        <div
          className={cn("h-1.5 w-full overflow-hidden rounded-full", colors.barTrack)}
        >
          <div
            className={cn("h-full rounded-full transition-all duration-500", colors.bar)}
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
      </div>
    </div>
  )
}
