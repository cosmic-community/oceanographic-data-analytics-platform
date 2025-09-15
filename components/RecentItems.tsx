import Link from 'next/link'
import { formatDistanceToNow } from 'date-fns'
import { DataAnalysis, Visualization, ResearchNote } from '@/types'

interface RecentItemsProps {
  items: (DataAnalysis | Visualization | ResearchNote)[]
  type: 'analyses' | 'visualizations' | 'notes'
}

export default function RecentItems({ items, type }: RecentItemsProps) {
  if (!items || items.length === 0) {
    return (
      <div className="text-center py-8 text-secondary-500">
        <p>No {type} available</p>
      </div>
    )
  }

  const getItemPath = (slug: string) => {
    switch (type) {
      case 'analyses':
        return `/analyses/${slug}`
      case 'visualizations':
        return `/visualizations/${slug}`
      case 'notes':
        return `/notes/${slug}`
      default:
        return `/${type}/${slug}`
    }
  }

  const getItemSubtitle = (item: DataAnalysis | Visualization | ResearchNote) => {
    if (item.type === 'data-analyses') {
      const analysis = item as DataAnalysis
      return analysis.metadata?.analysis_type?.value || 'Analysis'
    }
    if (item.type === 'visualizations') {
      const viz = item as Visualization
      return viz.metadata?.chart_type?.value || 'Visualization'
    }
    if (item.type === 'research-notes') {
      const note = item as ResearchNote
      return note.metadata?.note_type?.value || 'Note'
    }
    return ''
  }

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <Link
          key={item.id}
          href={getItemPath(item.slug)}
          className="block p-3 rounded-lg hover:bg-secondary-50 transition-colors border border-transparent hover:border-secondary-200"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h4 className="font-medium text-secondary-900 line-clamp-2">
                {item.title}
              </h4>
              <p className="text-sm text-secondary-600 mt-1">
                {getItemSubtitle(item)}
              </p>
              <p className="text-xs text-secondary-500 mt-2">
                {formatDistanceToNow(new Date(item.created_at), { addSuffix: true })}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}