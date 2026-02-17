import React from "react"
import { BookOpen, RefreshCw, Info } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function BookStatement() {
  return (
    <div className="flex items-start justify-center pt-8">
      <div className="w-full max-w-lg">
        <div className="rounded-xl border border-border bg-white p-8 shadow-lg">
          {/* Icon */}
          <div className="flex justify-center mb-5">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-400 to-brand-700 shadow-lg shadow-brand-200">
              <BookOpen className="h-8 w-8 text-white" />
            </div>
          </div>

          {/* Title */}
          <h2 className="text-center text-2xl font-bold text-foreground">
            Book Statement Sync
          </h2>
          <p className="mt-1.5 text-center text-sm text-muted-foreground">
            Synchronize your book statement data from Tally
          </p>

          {/* Info card */}
          <div className="mt-8 flex items-start gap-3 rounded-xl border border-border bg-surface-alt p-5">
            <Info className="h-5 w-5 text-foreground shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-foreground">
                Automatic Synchronization
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground leading-relaxed">
                Connect directly to your book-keeping system to pull the latest
                statement records in real time.
              </p>
            </div>
          </div>

          {/* Sync button */}
          <div className="mt-6">
            <Button
              id="start-book-sync-btn"
              className="h-12 w-full text-base font-semibold shadow-md bg-gradient-to-r from-brand-500 to-violet-500 hover:from-brand-600 hover:to-violet-600 text-white"
            >
              <RefreshCw className="h-5 w-5 mr-2" />
              Start Book Statement Sync
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
