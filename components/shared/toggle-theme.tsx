'use client'
import { MoonIcon, SunIcon } from 'lucide-react'
import { useTheme } from 'next-themes'
import React from 'react'

export const ToggleTheme = () => {
  const { theme, setTheme } = useTheme()
  const [icon, setIcon] = React.useState<React.ReactNode | null>(null)

  React.useEffect(() => {
    setIcon(
      theme === 'dark' ? (
        <SunIcon size={16} strokeWidth={1.5} />
      ) : (
        <MoonIcon size={16} strokeWidth={1.5} />
      )
    )
  }, [theme])
  return (
    <button
      onClick={() => {
        setTheme(theme === 'dark' ? 'light' : 'dark')
      }}
      className='w-6 h-6 rounded-full hover:bg-accent flex items-center justify-center'
    >
      {theme === 'dark' ? icon : icon}
    </button>
  )
}
