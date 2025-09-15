import Link from 'next/link'
import { getDataAnalyses } from '@/lib/cosmic'
import { Activity, Calendar, Database, FileBarChart } from 'lucide-react'

export default async function AnalysesPage() {
  const analyses = await getDataAnalyses()

  const getAnalysisTypeIcon = (analysisType: string) => {
    const icons = {
      meta: '📋',
      prof: '📊',
      rtraj: '🛰️',
      combined: '🔄'
    }
    
    return icons[analysisType as keyof typeof icons] || '📊'
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
            Review analysis results and key findings from your datasets
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
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-semibold text-secondary-900 line-clamp-2">
                      {analysis.title}
                    </h3>
                    {analysis.metadata.analysis_type && (
                      <span className="text-xl ml-2 flex-shrink-0">
                        {getAnalysisTypeIcon(analysis.metadata.analysis_type.key)}
                      </span>
                    )}
                  </div>
                  
                  <div className="flex flex-wrap gap-3 text-sm text-secondary-600 mb-3">
                    {analysis.metadata.analysis_type && (
                      <div className="flex items-center gap-1">
                        <FileBarChart className="w-4 h-4" />
                        <span>{analysis.metadata.analysis_type.value}</span>
                      </div>
                    )}
                    
                    {analysis.metadata.processing_date && (
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{analysis.metadata.processing_date}</span>
                      </div>
                    )}
                    
                    {analysis.metadata.dataset && (
                      <div className="flex items-center gap-1">
                        <Database className="w-4 h-4" />
                        <span>
                          Dataset: {getDatasetDisplayValue(analysis.metadata.dataset)}
                        </span>
                      </div>
                    )}
                  </div>

                  {analysis.metadata.key_findings && (
                    <p className="text-sm text-secondary-700 line-clamp-3 mb-4">
                      {analysis.metadata.key_findings}
                    </p>
                  )}

                  <div className="flex items-center justify-between">
                    {analysis.metadata.data_quality && (
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        analysis.metadata.data_quality.key === 'excellent' 
                          ? 'bg-success-100 text-success-800' 
                          : analysis.metadata.data_quality.key === 'good'
                          ? 'bg-primary-100 text-primary-800'
                          : analysis.metadata.data_quality.key === 'fair'
                          ? 'bg-warning-100 text-warning-800'
                          : 'bg-error-100 text-error-800'
                      }`}>
                        {analysis.metadata.data_quality.value} Quality
                      </span>
                    )}
                    
                    <span className="text-xs text-secondary-500">
                      {new Date(analysis.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}