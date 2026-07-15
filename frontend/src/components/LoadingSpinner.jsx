import { Loader } from 'lucide-react'

export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <Loader className="mx-auto animate-spin text-blue-600" size={48} />
        <p className="text-gray-600 mt-4">Loading...</p>
      </div>
    </div>
  )
}
