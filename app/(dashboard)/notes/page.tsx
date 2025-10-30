'use client'
import { useState } from 'react'
import Link from 'next/link'
import NotesFilter from '@/components/notes/NotesFilter'
import {NotesTables} from '@/components/notes/NotesTables'
import { Note, NoteStatus, NoteType } from '@/types'

// Données mockées pour la démonstration //
const mockNotes: Note[] = [
  {
    id: '1',
    title: 'Convocation réunion mensuelle',
    content: 'Ordre du jour: bilan des activités...',
    type: 'MEETING',
    status: 'DRAFT',
    author: {
      id: '1',
      name: 'Jean Dupont',
      email: 'jean@youthcomputing.org',
      roles: ['REDACTOR'],
      department: 'Communication'
    },
    validators: [],
    recipients: [],
    attachments: [],
    comments: [],
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: '2',
    title: 'Rapport d\'activités Q1',
    content: 'Bilan des activités du premier trimestre...',
    type: 'REPORT',
    status: 'PENDING_VALIDATION',
    author: {
      id: '1',
      name: 'Jean Dupont',
      email: 'jean@youthcomputing.org',
      roles: ['REDACTOR'],
      department: 'Communication'
    },
    validators: [{
      id: '2',
      name: 'Marie Martin',
      email: 'marie@youthcomputing.org',
      roles: ['DEPARTMENT_HEAD'],
      department: 'Communication'
    }],
    recipients: [],
    attachments: ['rapport-q1.pdf'],
    comments: [],
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-12')
  }
]

export default function NotesPage() {
  const [filter, setFilter] = useState<{
    status?: NoteStatus
    type?: NoteType
    search: string
  }>({ search: '' })

  const filteredNotes = mockNotes.filter(note => {
    if (filter.status && note.status !== filter.status) return false
    if (filter.type && note.type !== filter.type) return false
    if (filter.search && !note.title.toLowerCase().includes(filter.search.toLowerCase())) return false
    return true
  })

  return (
    <div className="p-6 space-y-6">
      {/* En-tête avec actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
         <div className="flex-1">
             <h1 className="text-xl sm:text-2xl font-heading font-bold text-primary">
                  Gestion des Notes
              </h1>
                 <p className="text-gray-600 mt-1 text-sm sm:text-base">
                      Créez, modifiez et suivez vos notes internes
                  </p>
          </div>
          <Link
            href="/notes/new"
             className="bg-yc-fuschia hover:bg-[#ae2530] hover:cursor-pointer text-white px-4 py-3 sm:px-6 sm:py-3 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2 w-full sm:w-auto text-center"
            >
              <span className="text-lg">+</span>
              <span>Nouvelle Note</span>
            </Link>
      </div>

      {/* Filtres */}
      <NotesFilter onFilterChange={setFilter} />

      {/* Tableau des notes */}
       <NotesTables notes={filteredNotes} />
      
    </div>
  )
}