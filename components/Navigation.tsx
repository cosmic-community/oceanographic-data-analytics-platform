'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Database, Activity, BarChart3, FileText, Home } from 'lucide-react'

export default function Navigation() {
  const pathname = usePathname()

  const navItems = [
    { href: '/', label: 'Dashboard', icon: Home },
    { href: '/datasets', label: 'Datasets', icon: Database },
    { href: '/analyses', label: 'Analyses', icon: Activity },
    { href: '/visualizations', label: 'Visualizations', icon: BarChart3 },
    { href: '/notes', label: 'Notes', icon: FileText },
  ]

  return (
    <nav className="bg-white border-b border-secondary-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
              <Database className="w-5 h-5 text-white" />
            </div>
            <span className="font-semibold text-lg text-secondary-900">
              Oceanographic Analytics
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="flex space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors
                    ${isActive 
                      ? 'bg-primary-100 text-primary-600' 
                      : 'text-secondary-600 hover:text-secondary-900 hover:bg-secondary-50'
                    }
                  `}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </nav>
  )
}