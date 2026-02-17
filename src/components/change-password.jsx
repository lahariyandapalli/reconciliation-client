import React, { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"


export default function ChangePassword() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)

  return (
    <div className="flex items-start justify-center pt-8">
      <div className="w-full max-w-md rounded-xl border border-border bg-white p-8 shadow-lg">
        <h2 className="mb-8 text-center text-2xl font-bold text-gray-800">
          Change Password
        </h2>

        <div className="space-y-5">
          {/* User ID - using placeholder to mimic the look in the image */}
          <div className="relative">
             <Input
               placeholder="User ID"
               className="h-12 border-gray-200 text-base"
               readOnly // Assuming it's a static field based on 'User ID' text
             />
          </div>

          <div className="relative">
            <Input
              type={showCurrentPassword ? "text" : "password"}
              placeholder="Current Password"
              className="h-12 border-gray-200 pr-10 text-base"
            />
            <button
              type="button"
              onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showCurrentPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>

          <div className="relative">
            <Input
              type={showNewPassword ? "text" : "password"}
              placeholder="New Password"
              className="h-12 border-gray-200 pr-10 text-base"
            />
            <button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showNewPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>

          <div className="space-y-3 pt-4">
            <Button
              className="h-12 w-full text-base font-semibold shadow-md"
            >
              Update Password
            </Button>

          </div>
        </div>
      </div>
    </div>
  )
}
