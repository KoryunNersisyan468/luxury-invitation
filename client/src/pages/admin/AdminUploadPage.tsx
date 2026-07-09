import { useCallback, useEffect, useState } from 'react'
import { Trash2 } from 'lucide-react'
import { ImageUpload } from '@/components/upload/ImageUpload'
import { adminService } from '@/api/admin'
import { Button } from '@/components/ui'
import { notify } from '@/services/notification'
import type { UploadResult } from '@/types/api'

export default function AdminUploadPage() {
  const [uploads, setUploads] = useState<UploadResult[]>([])
  const [currentUrl, setCurrentUrl] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  const loadUploads = useCallback(async () => {
    try {
      setIsLoading(true)
      setUploads(await adminService.getUploads())
    } catch (err) {
      notify.error(err instanceof Error ? err.message : 'Failed to load uploads.')
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    void loadUploads()
  }, [loadUploads])

  const handleUpload = (url: string | string[]) => {
    if (Array.isArray(url)) return
    setCurrentUrl(url)
    void loadUploads()
  }

  const handleDelete = async (id?: string) => {
    if (!id) return
    if (!confirm('Delete this uploaded image record?')) return
    try {
      await adminService.deleteUpload(id)
      setUploads((prev) => prev.filter((upload) => upload.id !== id))
      notify.success('Image deleted.')
    } catch (err) {
      notify.error(err instanceof Error ? err.message : 'Delete failed.')
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="heading-section text-foreground">Upload Manager</h2>
        <p className="text-sm text-muted-foreground">
          Upload images to Cloudinary via POST /api/upload (admin only, max 5 MB)
        </p>
      </div>

      <div className="max-w-lg">
        <ImageUpload
          label="Upload new image"
          value={currentUrl}
          onChange={handleUpload}
          onClear={() => setCurrentUrl('')}
        />
      </div>

      {isLoading ? (
        <p className="text-sm text-muted-foreground">Loading uploads...</p>
      ) : uploads.length > 0 && (
        <div className="space-y-4">
          <h3 className="font-serif text-lg">Uploaded images</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {uploads.map((upload) => (
              <div key={upload.url} className="rounded-sm border border-border overflow-hidden">
                <img
                  src={upload.url}
                  alt=""
                  className="aspect-square object-cover w-full"
                  loading="lazy"
                />
                <div className="p-2">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-xs truncate text-muted-foreground">{upload.publicId}</p>
                    <Button type="button" variant="ghost" size="sm" onClick={() => handleDelete(upload.id)} aria-label="Delete image">
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                  <input
                    readOnly
                    value={upload.url}
                    className="w-full text-xs mt-1 bg-muted rounded px-2 py-1 truncate"
                    onClick={(e) => (e.target as HTMLInputElement).select()}
                    aria-label="Image URL"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
