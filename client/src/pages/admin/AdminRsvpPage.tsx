import { useEffect, useState } from 'react'
import { adminService, type RsvpRecord } from '@/api/admin'
import { Button } from '@/components/ui'
import { ErrorState } from '@/components/ErrorState'
import { EmptyState } from '@/components/EmptyState'
import { HeroSkeleton } from '@/components/ui'
import type { WeddingInvitation } from '@/types'

export default function AdminRsvpPage() {
  const [invitations, setInvitations] = useState<WeddingInvitation[]>([])
  const [selectedId, setSelectedId] = useState<string>('')
  const [rsvps, setRsvps] = useState<RsvpRecord[]>([])
  const [isLoadingInvitations, setIsLoadingInvitations] = useState(true)
  const [isLoadingRsvps, setIsLoadingRsvps] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    adminService
      .getInvitations({ limit: 100 })
      .then((result) => {
        setInvitations(result.data)
        if (result.data[0]?.id) setSelectedId(result.data[0].id)
      })
      .catch((err) => setError(err instanceof Error ? err.message : 'Failed to load'))
      .finally(() => setIsLoadingInvitations(false))
  }, [])

  useEffect(() => {
    if (!selectedId) return

    setIsLoadingRsvps(true)
    setError(null)

    adminService
      .getRsvps(selectedId)
      .then(setRsvps)
      .catch((err) => {
        setError(err instanceof Error ? err.message : 'Failed to load RSVPs')
        setRsvps([])
      })
      .finally(() => setIsLoadingRsvps(false))
  }, [selectedId])

  if (isLoadingInvitations) return <HeroSkeleton />

  if (error && invitations.length === 0) {
    return <ErrorState title="Error" message={error} onRetry={() => window.location.reload()} />
  }

  const selectedInvitation = invitations.find((inv) => inv.id === selectedId)
  const title =
    selectedInvitation?.title ||
    `${selectedInvitation?.couple?.groom ?? ''} & ${selectedInvitation?.couple?.bride ?? ''}`.trim()

  return (
    <div className="space-y-6">
      <div>
        <h2 className="heading-section text-foreground">RSVP Management</h2>
        <p className="text-sm text-muted-foreground">
          View guest responses per invitation (requires admin access)
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-end">
        <div className="flex-1 w-full sm:max-w-md space-y-2">
          <label htmlFor="invitation-select" className="text-sm font-medium">
            Select invitation
          </label>
          <select
            id="invitation-select"
            value={selectedId}
            onChange={(e) => setSelectedId(e.target.value)}
            className="h-11 w-full rounded-sm border border-input bg-card px-3 text-sm"
          >
            {invitations.map((inv) => (
              <option key={inv.id} value={inv.id}>
                {inv.title || `${inv.couple?.groom} & ${inv.couple?.bride}`}
              </option>
            ))}
          </select>
        </div>
        <Button
          variant="outline"
          onClick={() => selectedId && adminService.getRsvps(selectedId).then(setRsvps)}
          disabled={!selectedId || isLoadingRsvps}
        >
          Refresh
        </Button>
      </div>

      {isLoadingRsvps ? (
        <HeroSkeleton />
      ) : rsvps.length === 0 ? (
        <EmptyState
          title="No RSVPs yet"
          message={`No responses for "${title || 'this invitation'}" yet.`}
        />
      ) : (
        <div className="overflow-x-auto rounded-sm border border-border">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left p-3 font-medium">Guest</th>
                <th className="text-left p-3 font-medium hidden md:table-cell">Email</th>
                <th className="text-left p-3 font-medium">Attendance</th>
                <th className="text-left p-3 font-medium hidden sm:table-cell">Guests</th>
                <th className="text-left p-3 font-medium hidden lg:table-cell">Message</th>
              </tr>
            </thead>
            <tbody>
              {rsvps.map((rsvp) => (
                <tr key={rsvp.id} className="border-t border-border">
                  <td className="p-3">
                    <p className="font-medium">{rsvp.fullName}</p>
                    {rsvp.phone && (
                      <p className="text-xs text-muted-foreground">{rsvp.phone}</p>
                    )}
                  </td>
                  <td className="p-3 hidden md:table-cell text-muted-foreground">{rsvp.email}</td>
                  <td className="p-3">
                    <span className="capitalize">{rsvp.attendance}</span>
                  </td>
                  <td className="p-3 hidden sm:table-cell">{rsvp.guests}</td>
                  <td className="p-3 hidden lg:table-cell text-muted-foreground max-w-xs truncate">
                    {rsvp.message || '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
