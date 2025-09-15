import Link from 'next/link'
import { getResearchNotes } from '@/lib/cosmic'
import { FileText, AlertCircle, HelpCircle, CheckCircle, Target, Lightbulb } from 'lucide-react'

export default async function NotesPage() {
  const notes = await getResearchNotes()

  const getNoteIcon = (noteType: string) => {
    const icons = {
      observation: <Lightbulb className="w-4 h-4" />,
      hypothesis: <Target className="w-4 h-4" />,
      question: <HelpCircle className="w-4 h-4" />,
      conclusion: <CheckCircle className="w-4 h-4" />,
      todo: <AlertCircle className="w-4 h-4" />
    }
    
    return icons[noteType as keyof typeof icons] || <FileText className="w-4 h-4" />
  }

  const getPriorityBadge = (priority: string) => {
    const priorityClasses = {
      low: 'status-badge priority-low',
      medium: 'status-badge priority-medium',
      high: 'status-badge priority-high',
      urgent: 'status-badge priority-urgent'
    }
    
    return priorityClasses[priority as keyof typeof priorityClasses] || 'status-badge'
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-secondary-900">Research Notes</h1>
          <p className="text-secondary-600 mt-2">
            Organize observations, hypotheses, and research findings
          </p>
        </div>
        <div className="text-sm text-secondary-500">
          {notes.length} note{notes.length !== 1 ? 's' : ''} total
        </div>
      </div>

      {notes.length === 0 ? (
        <div className="text-center py-12">
          <FileText className="w-16 h-16 text-secondary-300 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-secondary-900 mb-2">No research notes found</h3>
          <p className="text-secondary-600">
            Your research notes will appear here once they're added to your Cosmic bucket.
          </p>
        </div>
      ) : (
        <div className="grid gap-6">
          {notes.map((note) => (
            <Link key={note.id} href={`/notes/${note.slug}`}>
              <div className="card p-6 hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold text-secondary-900">
                        {note.title}
                      </h3>
                      {note.metadata.priority && (
                        <span className={getPriorityBadge(note.metadata.priority.key)}>
                          {note.metadata.priority.value}
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-secondary-600 mb-3">
                      {note.metadata.note_type && (
                        <div className="flex items-center gap-1">
                          {getNoteIcon(note.metadata.note_type.key)}
                          <span>{note.metadata.note_type.value}</span>
                        </div>
                      )}
                    </div>

                    {note.metadata.content && (
                      <p className="text-secondary-700 line-clamp-3">
                        {note.metadata.content.replace(/[#*`]/g, '').slice(0, 200)}...
                      </p>
                    )}

                    {note.metadata.tags && (
                      <div className="flex flex-wrap gap-1 mt-3">
                        {note.metadata.tags.split(',').map((tag, index) => (
                          <span key={index} className="px-2 py-1 bg-secondary-100 text-secondary-700 text-xs rounded">
                            {tag.trim()}
                          </span>
                        ))}
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