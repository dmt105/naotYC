'use client'
import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'

interface PasswordStrengthProps {
  password: string
  className?: string
}

export function PasswordStrength({ password, className }: PasswordStrengthProps) {
  const [strength, setStrength] = useState(0)

  useEffect(() => {
    let newStrength = 0
    
    if (password.length >= 8) newStrength++
    if (password.match(/[a-z]/) && password.match(/[A-Z]/)) newStrength++
    if (password.match(/\d/)) newStrength++
    if (password.match(/[^a-zA-Z\d]/)) newStrength++

    setStrength(newStrength)
  }, [password])

  const getStrengthColor = (index: number) => {
    if (index < strength) {
      const colors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-green-500']
      return colors[strength - 1]
    }
    return 'bg-gray-200'
  }

  const getStrengthText = () => {
    const texts = ['Très faible', 'Faible', 'Moyen', 'Fort', 'Très fort']
    return texts[strength] || ''
  }

  const getTextColor = () => {
    const colors = ['text-red-500', 'text-orange-500', 'text-yellow-500', 'text-green-500', 'text-green-600']
    return colors[strength] || 'text-gray-500'
  }

  if (!password) return null

  return (
    <div className={cn('space-y-2', className)}>
      <div className="flex space-x-1">
        {[0, 1, 2, 3].map((index) => (
          <div
            key={index}
            className={cn(
              'h-1 flex-1 rounded-full transition-all duration-300',
              getStrengthColor(index)
            )}
          />
        ))}
      </div>
      <p className={cn('text-xs font-medium', getTextColor())}>
        Force du mot de passe: {getStrengthText()}
      </p>
    </div>
  )
}