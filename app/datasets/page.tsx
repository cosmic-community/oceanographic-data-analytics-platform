import Link from 'next/link'
import { getDatasets } from '@/lib/cosmic'
import { Database, MapPin, Calendar, FileCheck } from 'lucide-react'
import { format } from 'date-fns'

export default async function DatasetsPage() {
  const datasets = await getDatasets()

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
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-secondary-900">Datasets</h1>
          <p className="text-secondary-600 mt-2">
            Manage your oceanographic NetCDF data collections
          </p>
        </div>
        <div className="text-sm text-secondary-500">
          {datasets.length} dataset{datasets.length !== 1 ? 's' : ''} total
        </div>
      </div>

      {datasets.length === 0 ? (
        <div className="text-center py-12">
          <Database className="w-16 h-16 text-secondary-300 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-secondary-900 mb-2">No datasets found</h3>
          <p className="text-secondary-600">
            Your oceanographic datasets will appear here once they're added to your Cosmic bucket.
          </p>
        </div>
      ) : (
        <div className="grid gap-6">
          {datasets.map((dataset) => (
            <Link key={dataset.id} href={`/datasets/${dataset.slug}`}>
              <div className="card p-6 hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold text-secondary-900">
                        {dataset.title}
                      </h3>
                      {dataset.metadata.processing_status && (
                        <span className={getStatusBadge(dataset.metadata.processing_status.key)}>
                          {dataset.metadata.processing_status.value}
                        </span>
                      )}
                    </div>
                    
                    <div className="flex flex-wrap gap-4 text-sm text-secondary-600 mb-3">
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
                          <span>{format(new Date(dataset.metadata.collection_date), 'MMM dd, yyyy')}</span>
                        </div>
                      )}
                    </div>

                    {dataset.metadata.description && (
                      <p className="text-secondary-700 mb-3 line-clamp-2">
                        {dataset.metadata.description}
                      </p>
                    )}

                    {dataset.metadata.files_present && dataset.metadata.files_present.length > 0 && (
                      <div className="flex items-center gap-2">
                        <FileCheck className="w-4 h-4 text-success" />
                        <span className="text-sm text-secondary-600">
                          {dataset.metadata.files_present.length} file{dataset.metadata.files_present.length !== 1 ? 's' : ''} present: {dataset.metadata.files_present.join(', ')}
                        </span>
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