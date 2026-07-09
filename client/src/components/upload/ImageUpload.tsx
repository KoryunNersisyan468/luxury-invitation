import { useCallback, useRef, useState, type DragEvent } from 'react'
import { Upload, X, ImageIcon } from 'lucide-react'
import { cn } from '@/utils'
import { Button } from '@/components/ui'
import { uploadService, validateImageFile } from '@/api/upload'
import { notify } from '@/services/notification'

interface ImageUploadProps {
  value?: string | string[]
  onChange: (url: string | string[]) => void
  onClear?: () => void
  label?: string
  className?: string
  disabled?: boolean
  multiple?: boolean
}

export function ImageUpload({
  value,
  onChange,
  onClear,
  label = 'Upload image',
  className,
  disabled = false,
  multiple = false,
}: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [progress, setProgress] = useState(0)

  const values = Array.isArray(value) ? value : value ? [value] : []

  const handleUpload = useCallback(
    async (files: File[]) => {
      const validationError = files.map(validateImageFile).find(Boolean)
      if (validationError) {
        notify.error(validationError)
        return
      }

      try {
        setIsUploading(true)
        setProgress(0)
        const results = multiple
          ? await uploadService.uploadImages(files, setProgress)
          : [await uploadService.uploadImage(files[0], setProgress)]
        const urls = results.map((result) => result.url)
        onChange(multiple ? [...values, ...urls] : urls[0])
        notify.success(multiple ? 'Images uploaded successfully.' : 'Image uploaded successfully.')
      } catch (error) {
        notify.error(error instanceof Error ? error.message : 'Upload failed.')
      } finally {
        setIsUploading(false)
        setProgress(0)
      }
    },
    [multiple, onChange, values],
  )

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? [])
    if (files.length) void handleUpload(multiple ? files : files.slice(0, 1))
    event.target.value = ''
  }

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setIsDragging(false)
    if (disabled || isUploading) return

    const files = Array.from(event.dataTransfer.files ?? [])
    if (files.length) void handleUpload(multiple ? files : files.slice(0, 1))
  }

  const handleClear = (url?: string) => {
    if (multiple && url) {
      onChange(values.filter((item) => item !== url))
      return
    }
    onClear?.()
    onChange(multiple ? [] : '')
  }

  return (
    <div className={cn('space-y-2', className)}>
      {label && (
        <label className="block text-sm font-medium text-foreground/80">{label}</label>
      )}

      <div
        role="button"
        tabIndex={0}
        aria-label={label}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') inputRef.current?.click()
        }}
        onDragOver={(e) => {
          e.preventDefault()
          if (!disabled && !isUploading) setIsDragging(true)
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => !disabled && !isUploading && inputRef.current?.click()}
        className={cn(
          'relative flex flex-col items-center justify-center gap-3 rounded-sm border-2 border-dashed p-6 transition-colors cursor-pointer',
          isDragging ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50',
          (disabled || isUploading) && 'pointer-events-none opacity-60',
        )}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple={multiple}
          className="sr-only"
          onChange={handleFileChange}
          disabled={disabled || isUploading}
        />

        {values.length > 0 ? (
          <div className={cn('grid w-full gap-3', multiple ? 'grid-cols-2 sm:grid-cols-3' : 'grid-cols-1')}>
            {values.map((preview) => (
              <div key={preview} className="relative">
                <img
                  src={preview}
                  alt="Preview"
                  className="mx-auto h-32 w-full rounded-sm object-cover"
                />
                {!disabled && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleClear(preview)
                    }}
                    className="absolute -right-2 -top-2 rounded-full bg-destructive p-1 text-destructive-foreground shadow"
                    aria-label="Remove image"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        ) : (
          <>
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
              {isUploading ? (
                <Upload className="h-6 w-6 animate-pulse" />
              ) : (
                <ImageIcon className="h-6 w-6" />
              )}
            </div>
            <div className="text-center">
              <p className="text-sm font-medium">
                {isUploading ? `Uploading ${progress}%` : 'Drag & drop or click to upload'}
              </p>
              <p className="text-xs text-muted-foreground mt-1">PNG, JPG, WebP up to 5 MB</p>
            </div>
          </>
        )}
        {isUploading && (
          <div className="absolute bottom-0 left-0 h-1 bg-primary transition-all" style={{ width: `${progress}%` }} />
        )}
      </div>

      {(multiple || values.length === 0) && (
        <Button
          type="button"
          variant="outline"
          size="sm"
          isLoading={isUploading}
          disabled={disabled}
          onClick={() => inputRef.current?.click()}
        >
          <Upload className="h-4 w-4" />
          {multiple ? 'Choose files' : 'Choose file'}
        </Button>
      )}
    </div>
  )
}
