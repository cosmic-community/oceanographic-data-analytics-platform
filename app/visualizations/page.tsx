import Link from 'next/link'
import { getVisualizations } from '@/lib/cosmic'
import { BarChart3, Database, Palette } from 'lucide-react'
import type { Dataset } from '@/types'

export default async function VisualizationsPage() {
  const visualizations = await getVisualizations()

  const getChartTypeIcon = (chartType: string) => {
    const icons = {
      line_plot: '📈',
      scatter_plot: '🔸',
      pie_chart: '🥧',
      bar_chart: '📊',
      heatmap: '🌡️',
      interactive: '🎮'
    }
    
    return icons[chartType as keyof typeof icons] || '📊'
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
          <h1 className="text-3xl font-bold text-secondary-900">Visualizations</h1>
          <p className="text-secondary-600 mt-2">
            Explore charts and data visualizations from your analyses
          </p>
        </div>
        <div className="text-sm text-secondary-500">
          {visualizations.length} visualization{visualizations.length !== 1 ? 's' : ''} total
        </div>
      </div>

      {visualizations.length === 0 ? (
        <div className="text-center py-12">
          <BarChart3 className="w-16 h-16 text-secondary-300 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-secondary-900 mb-2">No visualizations found</h3>
          <p className="text-secondary-600">
            Your data visualizations will appear here once they're added to your Cosmic bucket.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visualizations.map((viz) => (
            <Link key={viz.id} href={`/visualizations/${viz.slug}`}>
              <div className="card hover:shadow-lg transition-shadow cursor-pointer overflow-hidden">
                {/* Chart Image */}
                {viz.metadata.chart_image ? (
                  <div className="aspect-video bg-secondary-100">
                    <img 
                      src={`${viz.metadata.chart_image.imgix_url}?w=600&h=400&fit=crop&auto=format,compress`}
                      alt={viz.title}
                      width="300"
                      height="200"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="aspect-video bg-secondary-100 flex items-center justify-center">
                    <BarChart3 className="w-12 h-12 text-secondary-400" />
                  </div>
                )}

                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-semibold text-secondary-900 line-clamp-2">
                      {viz.title}
                    </h3>
                    {viz.metadata.chart_type && (
                      <span className="text-xl ml-2 flex-shrink-0">
                        {getChartTypeIcon(viz.metadata.chart_type.key)}
                      </span>
                    )}
                  </div>
                  
                  <div className="flex flex-wrap gap-3 text-sm text-secondary-600 mb-3">
                    {viz.metadata.chart_type && (
                      <div className="flex items-center gap-1">
                        <Palette className="w-4 h-4" />
                        <span>{viz.metadata.chart_type.value}</span>
                      </div>
                    )}
                    
                    {viz.metadata.related_dataset && (
                      <div className="flex items-center gap-1">
                        <Database className="w-4 h-4" />
                        <span>
                          Dataset: {getDatasetDisplayValue(viz.metadata.related_dataset)}
                        </span>
                      </div>
                    )}
                  </div>

                  {viz.metadata.libraries_used && viz.metadata.libraries_used.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-3">
                      {viz.metadata.libraries_used.map((lib, index) => (
                        <span key={index} className="px-2 py-1 bg-secondary-100 text-secondary-700 text-xs rounded">
                          {lib}
                        </span>
                      ))}
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