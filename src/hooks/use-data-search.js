import { useState, useMemo } from "react"

/**
 * A reusable hook for searching/filtering an array of objects.
 *
 * @param {Array<Object>} data - The array of objects to search through
 * @param {string|string[]} searchKeys - The key(s) to search against (supports dot notation for nested keys)
 * @returns {{ query, setQuery, results, resultCount }}
 *
 * @example
 * const { query, setQuery, results } = useDataSearch(bankAccounts, ["customerNo", "bankName", "ifscCode"])
 */
export function useDataSearch(data = [], searchKeys = []) {
  const [query, setQuery] = useState("")

  const keys = Array.isArray(searchKeys) ? searchKeys : [searchKeys]

  const results = useMemo(() => {
    const trimmed = query.trim().toLowerCase()

    if (!trimmed) return data

    return data.filter((item) => {
      // If keys are provided, search only those keys; otherwise search all values
      const valuesToSearch =
        keys.length > 0
          ? keys.map((key) => getNestedValue(item, key))
          : Object.values(item)

      return valuesToSearch.some((value) => {
        if (value == null) return false
        return String(value).toLowerCase().includes(trimmed)
      })
    })
  }, [data, query, keys])

  return {
    query,
    setQuery,
    results,
    resultCount: results.length,
  }
}

/**
 * Safely access nested object properties using dot notation.
 * e.g. getNestedValue({ bank: { name: "SBI" } }, "bank.name") => "SBI"
 */
function getNestedValue(obj, path) {
  return path.split(".").reduce((acc, part) => acc?.[part], obj)
}
