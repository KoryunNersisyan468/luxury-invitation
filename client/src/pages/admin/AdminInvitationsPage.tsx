import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router'
import { Check, Search, Trash2, ExternalLink, X } from 'lucide-react'
import { adminService } from '@/api/admin'
import { Button, Input } from '@/components/ui'
import { ErrorState } from '@/components/ErrorState'
import { EmptyState } from '@/components/EmptyState'
import { HeroSkeleton } from '@/components/ui'
import { notify } from '@/services/notification'
import type { WeddingInvitation } from '@/types'

export default function AdminInvitationsPage() {
  const [invitations, setInvitations] = useState<WeddingInvitation[]>([])
  const [search, setSearch] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [updatingId, setUpdatingId] = useState<string | null>(null)

  const loadInvitations = useCallback(async (query?: string) => {
    setIsLoading(true)
    setError(null)
    try {
      const result = await adminService.getInvitations({ search: query, limit: 50 })
      setInvitations(result.data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load invitations')
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => loadInvitations(search || undefined), 300)
    return () => clearTimeout(timer)
  }, [search, loadInvitations])

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this invitation permanently?')) return

    try {
      setDeletingId(id)
      await adminService.deleteInvitation(id)
      setInvitations((prev) => prev.filter((inv) => inv.id !== id))
      notify.success('Invitation deleted.')
    } catch (err) {
      notify.error(err instanceof Error ? err.message : 'Delete failed.')
    } finally {
      setDeletingId(null)
    }
  }

  const updateStatus = async (invitation: WeddingInvitation, action: 'approve' | 'reject') => {
    if (!invitation.id) return

    try {
      setUpdatingId(invitation.id)
      const updated = action === 'approve'
        ? await adminService.approveInvitation(invitation.id)
        : await adminService.rejectInvitation(invitation.id)
      setInvitations((prev) =>
        prev.map((inv) => (inv.id === invitation.id ? updated : inv)),
      )
      notify.success(`Invitation ${action === 'approve' ? 'approved' : 'rejected'}.`)
    } catch (err) {
      notify.error(err instanceof Error ? err.message : 'Update failed.')
    } finally {
      setUpdatingId(null)
    }
  }

  if (error) {
    return <ErrorState title="Error" message={error} onRetry={() => loadInvitations(search)} />
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="heading-section text-foreground">Invitations</h2>
          <p className="text-sm text-muted-foreground">Manage all wedding invitations</p>
        </div>
        <Link to="/create">
          <Button>Create invitation</Button>
        </Link>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by title or couple..."
          className="pl-10"
        />
      </div>

      {isLoading ? (
        <HeroSkeleton />
      ) : invitations.length === 0 ? (
        <EmptyState
          title="No invitations"
          message="No invitations match your search."
          actionText="Create invitation"
          actionLink="/create"
        />
      ) : (
        <div className="overflow-x-auto rounded-sm border border-border">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left p-3 font-medium">Title / Couple</th>
                <th className="text-left p-3 font-medium hidden md:table-cell">Date</th>
                <th className="text-left p-3 font-medium hidden sm:table-cell">Status</th>
                <th className="text-right p-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {invitations.map((inv) => {
                const status = inv.status ?? (inv.isPublic ? 'APPROVED' : 'PENDING')
                const title =
                  inv.title ||
                  `${inv.couple?.groom ?? ''} & ${inv.couple?.bride ?? ''}`.trim()

                return (
                  <tr key={inv.id} className="border-t border-border hover:bg-muted/30">
                    <td className="p-3">
                      <p className="font-medium">{title || 'Untitled'}</p>
                      <p className="text-xs text-muted-foreground">{inv.category ?? 'wedding'} / {inv.style ?? 'elegant'}</p>
                    </td>
                    <td className="p-3 hidden md:table-cell text-muted-foreground">
                      {inv.weddingDate
                        ? new Date(inv.weddingDate).toLocaleDateString()
                        : '—'}
                    </td>
                    <td className="p-3 hidden sm:table-cell">
                      <span
                        className={`inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full ${
                          status === 'APPROVED'
                            ? 'bg-primary/10 text-primary'
                            : status === 'REJECTED'
                              ? 'bg-destructive/10 text-destructive'
                              : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {status}
                      </span>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center justify-end gap-2">
                        {inv.id && (
                          <Link to={`/invitation/${inv.id}`}>
                            <Button variant="ghost" size="sm" aria-label="View">
                              <ExternalLink className="h-4 w-4" />
                            </Button>
                          </Link>
                        )}
                        {inv.id && status !== 'APPROVED' && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => updateStatus(inv, 'approve')}
                            isLoading={updatingId === inv.id}
                            aria-label="Approve"
                          >
                            <Check className="h-4 w-4 text-primary" />
                          </Button>
                        )}
                        {inv.id && status !== 'REJECTED' && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => updateStatus(inv, 'reject')}
                            isLoading={updatingId === inv.id}
                            aria-label="Reject"
                          >
                            <X className="h-4 w-4 text-destructive" />
                          </Button>
                        )}
                        {inv.id && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(inv.id!)}
                            isLoading={deletingId === inv.id}
                            aria-label="Delete"
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
