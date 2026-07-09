import { AlertCircle } from 'lucide-react'

interface FieldErrorSummaryProps {
  errors: Record<string, any>
  title?: string
}

export function FieldErrorSummary({ errors, title = 'Please fill in the required fields:' }: FieldErrorSummaryProps) {
  const errorMessages: string[] = []

  const flattenErrors = (obj: any, prefix = '') => {
    for (const key in obj) {
      const path = prefix ? `${prefix}.${key}` : key
      const value = obj[key]

      if (value?.message) {
        errorMessages.push(`${path}: ${value.message}`)
      } else if (typeof value === 'object' && value !== null) {
        flattenErrors(value, path)
      }
    }
  }

  flattenErrors(errors)

  if (errorMessages.length === 0) return null

  return (
    <div className="mb-6 rounded-sm border border-red-500/30 bg-red-50 dark:bg-red-950/20 p-4">
      <div className="flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
        <div>
          <h3 className="font-medium text-red-900 dark:text-red-100 text-sm mb-2">{title}</h3>
          <ul className="space-y-1 text-sm text-red-800 dark:text-red-200">
            {errorMessages.slice(0, 5).map((msg, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-red-500 flex-shrink-0">•</span>
                <span>{msg}</span>
              </li>
            ))}
            {errorMessages.length > 5 && (
              <li className="text-red-700 dark:text-red-300 font-medium">
                ...and {errorMessages.length - 5} more
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  )
}
