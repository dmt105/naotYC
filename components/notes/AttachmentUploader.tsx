'use client'
import { useState, useRef } from 'react'
interface AttachmentUploaderProps {
  attachments: File[]
  onChange: (attachments: File[]) => void
}

export function AttachmentUploader({ attachments, onChange }: AttachmentUploaderProps) {
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const allowedTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'image/jpeg',
    'image/png',
    'text/plain'
  ]

  const handleFileSelect = (files: FileList | null) => {
    if (!files) return

    const validFiles = Array.from(files).filter(file => 
      allowedTypes.includes(file.type)
    )

    if (validFiles.length !== files.length) {
      alert('Certains fichiers ne sont pas autorisés. Formats acceptés : PDF, Word, images, texte.')
    }

    onChange([...attachments, ...validFiles])
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    handleFileSelect(e.dataTransfer.files)
  }

  const removeAttachment = (index: number) => {
    const newAttachments = attachments.filter((_, i) => i !== index)
    onChange(newAttachments)
  }

  const getFileIcon = (file: File) => {
    if (file.type.includes('pdf')) return '📄'
    if (file.type.includes('word')) return '📝'
    if (file.type.includes('image')) return '🖼️'
    if (file.type.includes('text')) return '📃'
    return '📎'
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-3">
        Pièces jointes
      </label>

      {/* Zone de drop */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
          isDragging 
            ? 'border-primary bg-primary/5' 
            : 'border-gray-300 hover:border-gray-400'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.txt"
          onChange={(e) => handleFileSelect(e.target.files)}
          className="hidden"
        />
        
        <div className="text-gray-400 mb-3">
          <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
        </div>
        
        <p className="text-sm font-medium text-gray-600">
          Glissez-déposez vos fichiers ici
        </p>
        <p className="text-xs text-gray-500 mt-1">
          ou cliquez pour sélectionner
        </p>
        <p className="text-xs text-gray-400 mt-2">
          PDF, Word, images, texte (max 10MB par fichier)
        </p>
      </div>

      {/* Liste des pièces jointes */}
      {attachments.length > 0 && (
        <div className="mt-4 space-y-2">
          <p className="text-sm font-medium text-gray-700">
            Fichiers attachés ({attachments.length})
          </p>
          {attachments.map((file, index) => (
            <AttachmentItem
              key={index}
              file={file}
              index={index}
              onRemove={removeAttachment}
              getFileIcon={getFileIcon}
              formatFileSize={formatFileSize}
            />
          ))}
        </div>
      )}
    </div>
  )
}

// Composant pour un fichier attaché
interface AttachmentItemProps {
  file: File
  index: number
  onRemove: (index: number) => void
  getFileIcon: (file: File) => string
  formatFileSize: (bytes: number) => string
}

function AttachmentItem({ file, index, onRemove, getFileIcon, formatFileSize }: AttachmentItemProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="flex items-center justify-between bg-gray-50 rounded-lg p-3 border"
    >
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <span className="text-xl">{getFileIcon(file)}</span>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate">
            {file.name}
          </p>
          <p className="text-xs text-gray-500">
            {formatFileSize(file.size)} • {file.type}
          </p>
        </div>
      </div>
      
      <button
        type="button"
        onClick={() => onRemove(index)}
        className={`text-red-500 hover:text-red-700 transition-colors ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
    </div>
  )
}