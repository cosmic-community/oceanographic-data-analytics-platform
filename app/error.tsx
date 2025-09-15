'use client'

import { useEffect } from 'react'
import { AlertTriangle, RefreshCw } from 'lucide-react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center max-w-md mx-auto">
        <div className="w-16 h-16 bg-error/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <AlertTriangle className="w-8 h-8 text-error" />
        </div>
        
        <h2 className="text-2xl font-bold text-secondary-900 mb-2">
          Something went wrong
        </h2>
        
        <p className="text-secondary-600 mb-6">
          An error occurred while loading this page. Please try again or contact support if the problem persists.
        </p>
        
        <button
          onClick={reset}
          className="btn btn-primary inline-flex items-center gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          Try again
        </button>
      </div>
    </div>
  )
}