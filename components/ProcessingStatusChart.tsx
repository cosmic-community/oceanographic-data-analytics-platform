'use client'

import { Doughnut } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)

interface ProcessingStatusChartProps {
  data: Record<string, number>
}

export default function ProcessingStatusChart({ data }: ProcessingStatusChartProps) {
  const statusColors = {
    pending: '#f59e0b',
    processing: '#0066cc',
    completed: '#10b981',
    error: '#ef4444'
  }

  const statusLabels = {
    pending: 'Pending',
    processing: 'Processing', 
    completed: 'Completed',
    error: 'Error'
  }

  const chartData = {
    labels: Object.keys(data).map(key => statusLabels[key as keyof typeof statusLabels] || key),
    datasets: [
      {
        data: Object.values(data),
        backgroundColor: Object.keys(data).map(key => statusColors[key as keyof typeof statusColors] || '#64748b'),
        borderColor: '#ffffff',
        borderWidth: 2,
      },
    ],
  }

  const options: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          usePointStyle: true,
          padding: 20,
        },
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const total = context.dataset.data.reduce((a, b) => (a as number) + (b as number), 0) as number
            const percentage = ((context.parsed as number) / total * 100).toFixed(1)
            return `${context.label}: ${context.parsed} (${percentage}%)`
          },
        },
      },
    },
  }

  if (Object.keys(data).length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-secondary-500">
        <p>No processing data available</p>
      </div>
    )
  }

  return (
    <div className="h-64">
      <Doughnut data={chartData} options={options} />
    </div>
  )
}