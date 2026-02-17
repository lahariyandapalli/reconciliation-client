import React, { useState, useRef, useCallback } from "react"
import {
  Home,
  ChevronDown,
  ChevronUp,
  Layers,
  Upload,
  CloudUpload,
  RefreshCw,
  Info,
  FileText,
  CreditCard,
} from "lucide-react"
import { Button } from "@/components/ui/button"

/* ─── Bank configuration ─── */
const banks = [
  { id: "indusind", name: "IndusInd", type: "manual" },
  { id: "sbi", name: "SBI", type: "auto" },
]

export default function BankStatement() {
  const [selectedBank, setSelectedBank] = useState(null)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null)
  const fileInputRef = useRef(null)
  const dropdownRef = useRef(null)

  const handleBankSelect = (bank) => {
    setSelectedBank(bank)
    setIsDropdownOpen(false)
    setSelectedFile(null)
  }

  /* ─── Drag & drop handlers ─── */
  const handleDrag = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true)
    else if (e.type === "dragleave") setDragActive(false)
  }, [])

  const handleDrop = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files?.[0]) setSelectedFile(e.dataTransfer.files[0])
  }, [])

  const handleFileChange = (e) => {
    if (e.target.files?.[0]) setSelectedFile(e.target.files[0])
  }

  return (
    <div className="flex items-start justify-center pt-8">
      <div className="w-full max-w-lg">
        {/* ─── Header card ─── */}
        <div className="rounded-xl border border-border bg-white p-8 shadow-lg">
          {/* Icon */}
          <div className="flex justify-center mb-5">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-400 to-brand-700 shadow-lg shadow-brand-200">
              <Home className="h-8 w-8 text-white" />
            </div>
          </div>

          {/* Title */}
          <h2 className="text-center text-2xl font-bold text-foreground">
            Bank Statement Upload
          </h2>
          <p className="mt-1.5 text-center text-sm text-muted-foreground">
            Securely upload and sync your banking data
          </p>

          {/* ─── Bank selector ─── */}
          <div className="mt-8">
            <label className="flex items-center gap-2 text-sm font-semibold text-foreground mb-2">
              <CreditCard className="h-4 w-4 text-muted-foreground" />
              Select Your Bank
            </label>

            <div className="relative" ref={dropdownRef}>
              <button
                id="bank-selector"
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex h-11 w-full items-center justify-between rounded-lg border border-border bg-white px-4 text-sm text-foreground transition-colors hover:border-brand-300 focus:outline-none focus:ring-2 focus:ring-brand-200 focus:border-brand-400"
              >
                <span className={selectedBank ? "text-foreground" : "text-muted-foreground"}>
                  {selectedBank ? selectedBank.name : "Choose your bank"}
                </span>
                {isDropdownOpen ? (
                  <ChevronUp className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                )}
              </button>

              {isDropdownOpen && (
                <div className="absolute z-10 mt-1 w-full rounded-lg border border-border bg-white shadow-lg overflow-hidden">
                  {banks.map((bank) => (
                    <button
                      key={bank.id}
                      onClick={() => handleBankSelect(bank)}
                      className="flex w-full items-center px-4 py-3 text-sm text-foreground hover:bg-brand-50 transition-colors text-left"
                    >
                      {bank.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* ─── Content area — depends on selection ─── */}
          {!selectedBank && (
            <div className="mt-10 flex flex-col items-center pb-2">
              <Layers className="h-14 w-14 text-brand-200 mb-3" />
              <p className="text-sm text-brand-400 font-medium">
                Select a bank to get started
              </p>
            </div>
          )}

          {/* ── Manual Upload (e.g. IndusInd) ── */}
          {selectedBank?.type === "manual" && (
            <div className="mt-6 space-y-5">
              {/* Badge */}
              <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 border border-brand-200 px-3 py-1 text-xs font-semibold text-brand-700">
                <FileText className="h-3.5 w-3.5" />
                Manual Upload
              </span>

              {/* Drop zone */}
              <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-8 cursor-pointer transition-all ${
                  dragActive
                    ? "border-brand-400 bg-brand-50"
                    : "border-border bg-surface-alt hover:border-brand-300 hover:bg-brand-50/30"
                }`}
              >
                <CloudUpload
                  className={`h-10 w-10 mb-3 ${
                    dragActive ? "text-brand-500" : "text-brand-300"
                  }`}
                />
                {selectedFile ? (
                  <p className="text-sm font-medium text-foreground text-center">
                    {selectedFile.name}
                  </p>
                ) : (
                  <p className="text-sm text-muted-foreground text-center leading-relaxed">
                    Drag & Drop or click to Upload{" "}
                    <span className="font-medium text-foreground">
                      {selectedBank.name}
                    </span>{" "}
                    Statement
                    <br />
                    <span className="text-xs text-muted-foreground">
                      (.csv, .xlsx, .xls)
                    </span>
                  </p>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".csv,.xlsx,.xls"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>

              {/* Upload button */}
              <Button
                id="upload-statement-btn"
                className="h-12 w-full text-base font-semibold shadow-md bg-gradient-to-r from-brand-500 to-violet-500 hover:from-brand-600 hover:to-violet-600 text-white"
              >
                <Upload className="h-5 w-5 mr-2" />
                Upload Statement
              </Button>
            </div>
          )}

          {/* ── Auto Sync (e.g. SBI) ── */}
          {selectedBank?.type === "auto" && (
            <div className="mt-6 space-y-5">
              {/* Badge */}
              <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 border border-brand-200 px-3 py-1 text-xs font-semibold text-brand-700">
                <RefreshCw className="h-3.5 w-3.5" />
                Auto Sync
              </span>

              {/* Info card */}
              <div className="flex items-start gap-3 rounded-xl border border-border bg-surface-alt p-5">
                <Info className="h-5 w-5 text-foreground shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    Automatic Synchronization
                  </p>
                  <p className="mt-0.5 text-xs text-muted-foreground leading-relaxed">
                    Connect directly to {selectedBank.name} servers for real-time data sync
                  </p>
                </div>
              </div>

              {/* Start sync button */}
              <Button
                id="start-sync-btn"
                className="h-12 w-full text-base font-semibold shadow-md bg-gradient-to-r from-brand-500 to-violet-500 hover:from-brand-600 hover:to-violet-600 text-white"
              >
                <RefreshCw className="h-5 w-5 mr-2" />
                Start Sync
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
