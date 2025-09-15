import { ReactNode } from 'react'

interface StatsCardProps {
  title: string
  value: number
  icon: ReactNode
  color: 'primary' | 'success' | 'warning' | 'error'
}

export default function StatsCard({ title, value, icon, color }: StatsCardProps) {
  const colorClasses = {
    primary: 'text-primary-500 bg-primary-50',
    success: 'text-success bg-success/10',
    warning: 'text-warning bg-warning/10', 
    error: 'text-error bg-error/10'
  }

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-secondary-600 mb-1">{title}</p>
          <p className="text-3xl font-bold text-secondary-900">{value}</p>
        </div>
        <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
          {icon}
        </div>
      </div>
    </div>
  )
}