// app/datasets/[slug]/page.tsx
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getDataset, getAnalysesForDataset, getVisualizationsForDataset } from '@/lib/cosmic'
import { Database, MapPin, Calendar, FileCheck, ArrowLeft, Activity, BarChart3 } from 'lucide-react'
import { format } from 'date-fns'

async function DatasetPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const dataset = await getDataset(slug)
  
  if (!dataset) {
    notFound()
  }

  // Fetch related analyses and visualizations
  const [analyses, visualizations] = await Promise.all([
    getAnalysesForDataset(dataset.metadata.dataset_id),
    getVisualizationsForDataset(dataset.metadata.dataset_id)
  ])

  const getStatusBadge = (status: string) => {
    const statusClasses = {
      pending: 'status-badge status-pending',
      processing: 'status-badge status-processing', 
      completed: 'status-badge status-completed',
      error: 'status-badge status-error'
    }
    
    return statusClasses[status as keyof typeof statusClasses] || 'status-badge'
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <Link href="/datasets" className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 mb-6">
        <ArrowLeft className="w-4 h-4" />
        Back to Datasets
      </Link>

      {/* Dataset Header */}
      <div className="card p-6 mb-8">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold text-secondary-900">{dataset.title}</h1>
              {dataset.metadata.processing_status && (
                <span className={getStatusBadge(dataset.metadata.processing_status.key)}>
                  {dataset.metadata.processing_status.value}
                </span>
              )}
            </div>

            <div className="flex flex-wrap gap-4 text-secondary-600 mb-4">
              <div className="flex items-center gap-1">
                <Database className="w-4 h-4" />
                <span>ID: {dataset.metadata.dataset_id}</span>
              </div>
              
              {dataset.metadata.location && (
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>{dataset.metadata.location}</span>
                </div>
              )}
              
              {dataset.metadata.collection_date && (
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{format(new Date(dataset.metadata.collection_date), 'MMMM dd, yyyy')}</span>
                </div>
              )}
            </div>

            {dataset.metadata.description && (
              <p className="text-secondary-700 mb-4">{dataset.metadata.description}</p>
            )}

            {dataset.metadata.files_present && dataset.metadata.files_present.length > 0 && (
              <div className="flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-success" />
                <span className="text-secondary-700">
                  Files present: {dataset.metadata.files_present.join(', ')}
                </span>
              </div>
            )}
          </div>
        </div>

        {dataset.metadata.directory_path && (
          <div className="bg-secondary-50 p-4 rounded-lg">
            <span className="text-sm font-medium text-secondary-700">Directory Path:</span>
            <code className="ml-2 text-sm bg-secondary-100 px-2 py-1 rounded">
              {dataset.metadata.directory_path}
            </code>
          </div>
        )}
      </div>

      {/* Related Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Related Analyses */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Related Analyses
            </h2>
            <span className="text-sm text-secondary-500">
              {analyses.length} analysis{analyses.length !== 1 ? 'es' : ''}
            </span>
          </div>

          {analyses.length === 0 ? (
            <p className="text-secondary-600 text-center py-8">No analyses found for this dataset</p>
          ) : (
            <div className="space-y-4">
              {analyses.map((analysis) => (
                <Link 
                  key={analysis.id}
                  href={`/analyses/${analysis.slug}`}
                  className="block p-4 rounded-lg hover:bg-secondary-50 transition-colors border border-transparent hover:border-secondary-200"
                >
                  <h3 className="font-medium text-secondary-900">{analysis.title}</h3>
                  {analysis.metadata.analysis_type && (
                    <p className="text-sm text-secondary-600 mt-1">
                      {analysis.metadata.analysis_type.value}
                    </p>
                  )}
                  {analysis.metadata.processing_date && (
                    <p className="text-xs text-secondary-500 mt-2">
                      {format(new Date(analysis.metadata.processing_date), 'MMM dd, yyyy')}
                    </p>
                  )}
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Related Visualizations */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Related Visualizations
            </h2>
            <span className="text-sm text-secondary-500">
              {visualizations.length} visualization{visualizations.length !== 1 ? 's' : ''}
            </span>
          </div>

          {visualizations.length === 0 ? (
            <p className="text-secondary-600 text-center py-8">No visualizations found for this dataset</p>
          ) : (
            <div className="space-y-4">
              {visualizations.map((viz) => (
                <Link 
                  key={viz.id}
                  href={`/visualizations/${viz.slug}`}
                  className="block p-4 rounded-lg hover:bg-secondary-50 transition-colors border border-transparent hover:border-secondary-200"
                >
                  <h3 className="font-medium text-secondary-900">{viz.title}</h3>
                  {viz.metadata.chart_type && (
                    <p className="text-sm text-secondary-600 mt-1">
                      {viz.metadata.chart_type.value}
                    </p>
                  )}
                  {viz.metadata.chart_image && (
                    <div className="mt-2">
                      <img 
                        src={`${viz.metadata.chart_image.imgix_url}?w=200&h=120&fit=crop&auto=format,compress`}
                        alt={viz.title}
                        width="100"
                        height="60"
                        className="rounded border"
                      />
                    </div>
                  )}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Notes Section */}
      {dataset.metadata.notes && (
        <div className="card p-6 mt-8">
          <h2 className="text-xl font-semibold mb-4">Notes</h2>
          <div className="prose max-w-none text-secondary-700">
            <pre className="whitespace-pre-wrap font-sans">{dataset.metadata.notes}</pre>
          </div>
        </div>
      )}
    </div>
  )
}

export default DatasetPage