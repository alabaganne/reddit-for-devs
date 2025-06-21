'use client'

import { Sun, Moon, Menu, X } from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'

interface NavbarProps {
  onToggleSidebar: () => void
  isSidebarOpen: boolean
}

export default function Navbar({ onToggleSidebar, isSidebarOpen }: NavbarProps) {
  const { theme, toggleTheme } = useTheme()
  
  console.log('Navbar render - current theme:', theme)

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-700 transition-colors sticky top-0 z-20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <button
              onClick={onToggleSidebar}
              className="lg:hidden p-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 transition-colors"
              aria-label="Toggle sidebar"
            >
              {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              LOGO
            </h1>
          </div>
          
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 transition-colors"
            aria-label="Toggle theme"
            suppressHydrationWarning
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
        </div>
      </div>
    </nav>
  )
} 