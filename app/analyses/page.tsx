import Link from 'next/link'
import { getDataAnalyses } from '@/lib/cosmic'
import { Activity, Calendar, CheckCircle, Clock } from 'lucide-react'
import type { Dataset } from '@/types'

export default async function AnalysesPage() {
  const analyses = await getDataAnalyses()

  const getStatusColor = (status: string | undefined) => {
    switch (status) {
      case 'excellent': return 'text-success bg-success/10'
      case 'good': return 'text-blue-600 bg-blue-100'  
      case 'fair': return 'text-warning bg-warning/10'
      case 'poor': return 'text-error bg-error/10'
      default: return 'text-secondary-600 bg-secondary-100'
    }
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
            Review analysis results and data quality assessments
          </p>
        </div>
        <div className="text-sm text-secondary-500">
          {analyses.length} analysis{analyses.length !== 1 ? 'es' : ''} total
        </div>
      </div>

      {analyses.length === 0 ? (
        <div className="text-center py-12">
          <Activity className="w-16 h-16 text-secondary-300 mx-auto mb-4" />
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
                    {analysis.metadata.data_quality && (
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(analysis.metadata.data_quality.key)}`}>
                        {analysis.metadata.data_quality.value}
                      </span>
                    )}
                  </div>
                  
                  <div className="space-y-3 text-sm text-secondary-600">
                    {analysis.metadata.analysis_type && (
                      <div className="flex items-center gap-2">
                        <Activity className="w-4 h-4" />
                        <span>{analysis.metadata.analysis_type.value}</span>
                      </div>
                    )}
                    
                    {analysis.metadata.dataset && (
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4" />
                        <span>Dataset: {getDatasetDisplayValue(analysis.metadata.dataset)}</span>
                      </div>
                    )}
                    
                    {analysis.metadata.processing_date && (
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>Processed: {new Date(analysis.metadata.processing_date).toLocaleDateString()}</span>
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
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}