'use client'
import { useState } from 'react'
import { useNotes } from '@/hooks/useNotes'
import { NoteStatus } from '@/types/enum'

export default function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const { notes: scheduledNotes, loading } = useNotes([NoteStatus.SCHEDULED, NoteStatus.APPROVED])

  const getNotesForDate = (date: Date) => {
    return scheduledNotes.filter(note => {
      if (!note.scheduledDate) return false
      const noteDate = new Date(note.scheduledDate)
      return noteDate.toDateString() === date.toDateString()
    })
  }

  const todayNotes = getNotesForDate(selectedDate)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Calendrier</h1>
          <p className="text-gray-600 mt-1">Suivez vos notes planifiées</p>
        </div>
        <div className="flex items-center gap-4 mt-4 sm:mt-0">
          <input
            type="date"
            value={selectedDate.toISOString().split('T')[0]}
            onChange={(e) => setSelectedDate(new Date(e.target.value))}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
          />
        </div>
      </div>

      {/* Vue calendrier simplifiée */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Mini calendrier */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">{selectedDate.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}</h2>
          <div className="grid grid-cols-7 gap-1 text-sm">
            {['L', 'M', 'M', 'J', 'V', 'S', 'D'].map(day => (
              <div key={day} className="text-center text-gray-500 font-medium py-2">
                {day}
              </div>
            ))}
            {/* Ici on générerait les jours du mois */}
            <div className="text-center py-2">
              <button className="w-8 h-8 rounded-full bg-primary text-white">
                15
              </button>
            </div>
          </div>
        </div>

        {/* Notes du jour sélectionné */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Notes du {selectedDate.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}
            </h2>

            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="animate-pulse">
                    <div className="h-16 bg-gray-200 rounded"></div>
                  </div>
                ))}
              </div>
            ) : todayNotes.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <svg className="w-12 h-12 mx-auto text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p>Aucune note planifiée pour cette date</p>
              </div>
            ) : (
              <div className="space-y-4">
                {todayNotes.map(note => (
                  <div key={note.id} className="flex items-start p-4 border border-gray-200 rounded-lg">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{note.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {note.scheduledDate && new Date(note.scheduledDate).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        {note.recipients.length} destinataire(s)
                      </p>
                    </div>
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                      Planifiée
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}