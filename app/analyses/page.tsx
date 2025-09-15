import Link from 'next/link'
import { getDataAnalyses } from '@/lib/cosmic'
import { Activity, Database, Calendar, AlertTriangle } from 'lucide-react'

export default async function AnalysesPage() {
  const analyses = await getDataAnalyses()

  const getQualityIcon = (quality: string) => {
    const icons = {
      excellent: '✅',
      good: '👍',
      fair: '⚠️',
      poor: '❌'
    }
    
    return icons[quality as keyof typeof icons] || '📊'
  }

  const getQualityColor = (quality: string) => {
    const colors = {
      excellent: 'text-emerald-600',
      good: 'text-green-600',
      fair: 'text-yellow-600',
      poor: 'text-red-600'
    }
    
    return colors[quality as keyof typeof colors] || 'text-secondary-600'
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-secondary-900">Data Analyses</h1>
          <p className="text-secondary-600 mt-2">
            Review analysis results and findings from your oceanographic data
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {analyses.map((analysis) => (
            <Link key={analysis.id} href={`/analyses/${analysis.slug}`}>
              <div className="card hover:shadow-lg transition-shadow cursor-pointer">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-semibold text-secondary-900 line-clamp-2">
                      {analysis.title}
                    </h3>
                    {analysis.metadata.data_quality && (
                      <span className={`text-xl ml-2 flex-shrink-0 ${getQualityColor(analysis.metadata.data_quality.key)}`}>
                        {getQualityIcon(analysis.metadata.data_quality.key)}
                      </span>
                    )}
                  </div>
                  
                  <div className="flex flex-wrap gap-3 text-sm text-secondary-600 mb-3">
                    {analysis.metadata.analysis_type && (
                      <div className="flex items-center gap-1">
                        <Activity className="w-4 h-4" />
                        <span>{analysis.metadata.analysis_type.value}</span>
                      </div>
                    )}
                    
                    {analysis.metadata.dataset && (
                      <div className="flex items-center gap-1">
                        <Database className="w-4 h-4" />
                        <span>
                          Dataset: {typeof analysis.metadata.dataset === 'string' 
                            ? analysis.metadata.dataset 
                            : analysis.metadata.dataset.metadata?.dataset_id || analysis.metadata.dataset.title}
                        </span>
                      </div>
                    )}
                  </div>

                  {analysis.metadata.processing_date && (
                    <div className="flex items-center gap-1 text-sm text-secondary-600 mb-3">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(analysis.metadata.processing_date).toLocaleDateString()}</span>
                    </div>
                  )}

                  {analysis.metadata.key_findings && (
                    <p className="text-sm text-secondary-700 line-clamp-3 mb-3">
                      {analysis.metadata.key_findings}
                    </p>
                  )}

                  {analysis.metadata.data_quality && (
                    <div className="flex items-center gap-2 mt-3">
                      <span className="text-xs font-medium text-secondary-500">Quality:</span>
                      <span className={`px-2 py-1 text-xs rounded ${
                        analysis.metadata.data_quality.key === 'excellent' ? 'bg-emerald-100 text-emerald-800' :
                        analysis.metadata.data_quality.key === 'good' ? 'bg-green-100 text-green-800' :
                        analysis.metadata.data_quality.key === 'fair' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {analysis.metadata.data_quality.value}
                      </span>
                    </div>
                  )}

                  {analysis.metadata.issues_found && (
                    <div className="mt-3 p-2 bg-yellow-50 border border-yellow-200 rounded">
                      <div className="flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-yellow-600 flex-shrink-0 mt-0.5" />
                        <p className="text-xs text-yellow-800 line-clamp-2">
                          {analysis.metadata.issues_found}
                        </p>
                      </div>
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