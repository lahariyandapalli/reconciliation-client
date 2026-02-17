import React, { useState, useRef } from "react"
import {
  ChevronDown,
  ChevronUp,
  ArrowRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const roles = ["Admin", "Manager", "Operator", "Viewer"]

export default function CreateUser() {
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [role, setRole] = useState("")
  const [isRoleOpen, setIsRoleOpen] = useState(false)
  const dropdownRef = useRef(null)

  const handleRoleSelect = (r) => {
    setRole(r)
    setIsRoleOpen(false)
  }

  return (
    <div className="flex items-start justify-center pt-8">
      <div className="w-full max-w-md">
        {/* Main card */}
        <div className="rounded-xl border border-border bg-white p-8 shadow-lg">
          {/* Card header */}
          <h2 className="text-2xl font-bold text-foreground">User Details</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Fill in the information below to set up a new account.
          </p>

          {/* Form — vertical stack */}
          <div className="mt-8 space-y-5">
            {/* Full Name */}
            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Full Name
              </label>
              <Input
                id="create-user-name"
                placeholder="e.g. John Doe"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="h-11 text-sm"
              />
            </div>

            {/* Email Address */}
            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Email Address
              </label>
              <Input
                id="create-user-email"
                type="email"
                placeholder="john@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-11 text-sm"
              />
            </div>

            {/* User Role — custom dropdown */}
            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                User Role
              </label>
              <div className="relative" ref={dropdownRef}>
                <button
                  id="create-user-role"
                  type="button"
                  onClick={() => setIsRoleOpen(!isRoleOpen)}
                  className="flex h-11 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 text-sm shadow-sm transition-colors hover:border-brand-300 focus:outline-none focus:ring-1 focus:ring-ring"
                >
                  <span className={role ? "text-foreground" : "text-muted-foreground"}>
                    {role || "Select a role"}
                  </span>
                  {isRoleOpen ? (
                    <ChevronUp className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  )}
                </button>

                {isRoleOpen && (
                  <div className="absolute z-10 mt-1 w-full rounded-lg border border-border bg-white shadow-lg overflow-hidden">
                    {roles.map((r) => (
                      <button
                        key={r}
                        onClick={() => handleRoleSelect(r)}
                        className="flex w-full items-center px-4 py-2.5 text-sm text-foreground hover:bg-brand-50 transition-colors text-left"
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Submit button */}
          <div className="mt-8">
            <Button
              id="create-user-btn"
              className="h-12 w-full text-base font-semibold shadow-md"
            >
              Create User
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

