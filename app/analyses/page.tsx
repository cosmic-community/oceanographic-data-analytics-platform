import Link from 'next/link'
import { getDataAnalyses } from '@/lib/cosmic'
import { FileText, Calendar, CheckCircle, Clock, AlertCircle } from 'lucide-react'
import type { Dataset } from '@/types'

export default async function AnalysesPage() {
  const analyses = await getDataAnalyses()

  const getStatusIcon = (status: string) => {
    const icons = {
      pending: <Clock className="w-4 h-4 text-yellow-500" />,
      processing: <Clock className="w-4 h-4 text-blue-500" />,
      completed: <CheckCircle className="w-4 h-4 text-green-500" />,
      error: <AlertCircle className="w-4 h-4 text-red-500" />
    }
    return icons[status as keyof typeof icons] || icons.pending
  }

  const getDatasetDisplayValue = (dataset: string | Dataset): string => {
    if (typeof dataset === 'string') {
      return dataset
    }
    return dataset.metadata?.dataset_id || dataset.title || 'Unknown Dataset'
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-secondary-900">Data Analyses</h1>
          <p className="text-secondary-600 mt-2">
            View and manage your oceanographic data analysis results
          </p>
        </div>
        <div className="text-sm text-secondary-500">
          {analyses.length} analysis{analyses.length !== 1 ? 'es' : ''} total
        </div>
      </div>

      {analyses.length === 0 ? (
        <div className="text-center py-12">
          <FileText className="w-16 h-16 text-secondary-300 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-secondary-900 mb-2">No analyses found</h3>
          <p className="text-secondary-600">
            Your data analyses will appear here once they're added to your Cosmic bucket.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {analyses.map((analysis) => (
            <Link key={analysis.id} href={`/analyses/${analysis.slug}`}>
              <div className="card hover:shadow-lg transition-shadow cursor-pointer">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-lg font-semibold text-secondary-900 line-clamp-2">
                      {analysis.title}
                    </h3>
                    <div className="flex items-center gap-2 ml-4 flex-shrink-0">
                      {analysis.metadata.data_quality && (
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          analysis.metadata.data_quality.key === 'excellent' 
                            ? 'bg-green-100 text-green-700'
                            : analysis.metadata.data_quality.key === 'good'
                            ? 'bg-blue-100 text-blue-700'
                            : analysis.metadata.data_quality.key === 'fair'
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-red-100 text-red-700'
                        }`}>
                          {analysis.metadata.data_quality.value}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="space-y-3 text-sm text-secondary-600">
                    {analysis.metadata.analysis_type && (
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4" />
                        <span>{analysis.metadata.analysis_type.value}</span>
                      </div>
                    )}
                    
                    {analysis.metadata.dataset && (
                      <div className="flex items-center gap-2">
                        <span className="w-4 h-4 text-center">📊</span>
                        <span>Dataset: {getDatasetDisplayValue(analysis.metadata.dataset)}</span>
                      </div>
                    )}
                    
                    {analysis.metadata.processing_date && (
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(analysis.metadata.processing_date).toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>

                  {analysis.metadata.key_findings && (
                    <div className="mt-4 p-3 bg-secondary-50 rounded-lg">
                      <p className="text-sm text-secondary-700 line-clamp-3">
                        {analysis.metadata.key_findings}
                      </p>
                    </div>
                  )}

                  {analysis.metadata.excel_output_file && (
                    <div className="mt-3 flex items-center gap-2 text-sm text-primary-600">
                      <FileText className="w-4 h-4" />
                      <span>Excel output available</span>
                    </div>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}