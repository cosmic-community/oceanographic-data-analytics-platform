import { Suspense } from 'react'
import Link from 'next/link'
import { getDatasets, getDataAnalyses, getVisualizations, getResearchNotes } from '@/lib/cosmic'
import StatsCard from '@/components/StatsCard'
import RecentItems from '@/components/RecentItems'
import ProcessingStatusChart from '@/components/ProcessingStatusChart'
import { Activity, Database, BarChart3, FileText, ArrowRight } from 'lucide-react'

export default async function HomePage() {
  // Fetch all data for dashboard
  const [datasets, analyses, visualizations, notes] = await Promise.all([
    getDatasets(),
    getDataAnalyses(), 
    getVisualizations(),
    getResearchNotes()
  ])

  // Calculate processing status counts
  const processingStats = datasets.reduce((acc, dataset) => {
    const status = dataset.metadata.processing_status?.key || 'pending'
    acc[status] = (acc[status] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-secondary-900 mb-2">
          Oceanographic Data Analytics
        </h1>
        <p className="text-lg text-secondary-600">
          Manage NetCDF datasets, track analyses, and visualize oceanographic research
        </p>
      </div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Datasets"
          value={datasets.length}
          icon={<Database className="w-6 h-6" />}
          color="primary"
        />
        <StatsCard
          title="Analyses"
          value={analyses.length}
          icon={<Activity className="w-6 h-6" />}
          color="success"
        />
        <StatsCard
          title="Visualizations"
          value={visualizations.length}
          icon={<BarChart3 className="w-6 h-6" />}
          color="warning"
        />
        <StatsCard
          title="Research Notes"
          value={notes.length}
          icon={<FileText className="w-6 h-6" />}
          color="error"
        />
      </div>

      {/* Processing Status & Recent Items */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Processing Status Chart */}
        <div className="card p-6">
          <h2 className="text-xl font-semibold mb-4">Dataset Processing Status</h2>
          <Suspense fallback={<div className="animate-pulse h-64 bg-secondary-100 rounded"></div>}>
            <ProcessingStatusChart data={processingStats} />
          </Suspense>
        </div>

        {/* Recent Analyses */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Recent Analyses</h2>
            <Link 
              href="/analyses" 
              className="text-primary-500 hover:text-primary-600 flex items-center gap-1"
            >
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <RecentItems items={analyses.slice(0, 5)} type="analyses" />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link href="/datasets" className="card p-6 hover:shadow-md transition-shadow">
          <Database className="w-8 h-8 text-primary-500 mb-3" />
          <h3 className="font-semibold mb-2">Browse Datasets</h3>
          <p className="text-sm text-secondary-600">
            View and manage your NetCDF data collections
          </p>
        </Link>

        <Link href="/analyses" className="card p-6 hover:shadow-md transition-shadow">
          <Activity className="w-8 h-8 text-success mb-3" />
          <h3 className="font-semibold mb-2">Data Analyses</h3>
          <p className="text-sm text-secondary-600">
            Review analysis results and findings
          </p>
        </Link>

        <Link href="/visualizations" className="card p-6 hover:shadow-md transition-shadow">
          <BarChart3 className="w-8 h-8 text-warning mb-3" />
          <h3 className="font-semibold mb-2">Visualizations</h3>
          <p className="text-sm text-secondary-600">
            Explore charts and data visualizations
          </p>
        </Link>

        <Link href="/notes" className="card p-6 hover:shadow-md transition-shadow">
          <FileText className="w-8 h-8 text-error mb-3" />
          <h3 className="font-semibold mb-2">Research Notes</h3>
          <p className="text-sm text-secondary-600">
            Organize observations and research findings
          </p>
        </Link>
      </div>
    </div>
  )
}