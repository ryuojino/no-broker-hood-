import { AlertCircle } from 'lucide-react'

export default function ErrorMessage({ message, onDismiss }) {
  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start space-x-3">
      <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={20} />
      <div className="flex-1">
        <p className="text-red-800">{message}</p>
      </div>
      {onDismiss && (
        <button
          onClick={onDismiss}
          className="text-red-600 hover:text-red-800 font-bold"
        >
          ×
        </button>
      )}
    </div>
  )
}
