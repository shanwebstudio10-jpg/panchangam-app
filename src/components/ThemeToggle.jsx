import { useTheme } from '../context/ThemeContext'
import { Sun, Moon } from 'lucide-react'

export default function ThemeToggle() {
  const { dark, toggle } = useTheme()

  return (
    <button
      onClick={toggle}
      className="relative w-14 h-7 rounded-full bg-saffron-200 dark:bg-bark-50 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-saffron-400"
      aria-label="Toggle theme"
    >
      <div className={`absolute top-0.5 left-0.5 w-6 h-6 rounded-full bg-white dark:bg-saffron-500 shadow-md flex items-center justify-center transition-transform duration-300 ${dark ? 'translate-x-7' : 'translate-x-0'}`}>
        {dark ? (
          <Moon size={14} className="text-white" />
        ) : (
          <Sun size={14} className="text-saffron-500" />
        )}
      </div>
    </button>
  )
}