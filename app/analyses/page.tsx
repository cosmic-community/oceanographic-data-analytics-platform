import Link from 'next/link'
import { getDataAnalyses } from '@/lib/cosmic'
import { Activity, Calendar, Database, CheckCircle } from 'lucide-react'
import { format } from 'date-fns'

export default async function AnalysesPage() {
  const analyses = await getDataAnalyses()

  const getQualityBadge = (quality: string) => {
    const qualityClasses = {
      excellent: 'status-badge status-completed',
      good: 'status-badge status-processing',
      fair: 'status-badge status-pending',
      poor: 'status-badge status-error'
    }
    
    return qualityClasses[quality as keyof typeof qualityClasses] || 'status-badge'
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-secondary-900">Data Analyses</h1>
          <p className="text-secondary-600 mt-2">
            Review analysis results and research findings
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
        <div className="grid gap-6">
          {analyses.map((analysis) => (
            <Link key={analysis.id} href={`/analyses/${analysis.slug}`}>
              <div className="card p-6 hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold text-secondary-900">
                        {analysis.title}
                      </h3>
                      {analysis.metadata.data_quality && (
                        <span className={getQualityBadge(analysis.metadata.data_quality.key)}>
                          {analysis.metadata.data_quality.value}
                        </span>
                      )}
                    </div>
                    
                    <div className="flex flex-wrap gap-4 text-sm text-secondary-600 mb-3">
                      {analysis.metadata.analysis_type && (
                        <div className="flex items-center gap-1">
                          <Activity className="w-4 h-4" />
                          <span>{analysis.metadata.analysis_type.value}</span>
                        </div>
                      )}
                      
                      {analysis.metadata.dataset && (
                        <div className="flex items-center gap-1">
                          <Database className="w-4 h-4" />
                          <span>Dataset: {analysis.metadata.dataset}</span>
                        </div>
                      )}
                      
                      {analysis.metadata.processing_date && (
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{format(new Date(analysis.metadata.processing_date), 'MMM dd, yyyy')}</span>
                        </div>
                      )}
                    </div>

                    {analysis.metadata.key_findings && (
                      <p className="text-secondary-700 line-clamp-3">
                        {analysis.metadata.key_findings}
                      </p>
                    )}

                    {analysis.metadata.excel_output_file && (
                      <div className="flex items-center gap-2 mt-3">
                        <CheckCircle className="w-4 h-4 text-success" />
                        <span className="text-sm text-success">Excel output available</span>
                      </div>
                    )}
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