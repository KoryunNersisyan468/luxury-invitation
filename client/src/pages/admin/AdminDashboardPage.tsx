import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { Heart, Mail, Users, Image } from 'lucide-react'
import { AnalyticsCard } from '@/components/admin/AnalyticsCard'
import { adminService } from '@/api/admin'
import { HeroSkeleton } from '@/components/ui'
import { ErrorState } from '@/components/ErrorState'

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    invitations: 0,
    publicInvitations: 0,
    loading: true,
    error: null as string | null,
  })

  useEffect(() => {
    adminService
      .getInvitations({ limit: 100 })
      .then((result) => {
        const publicCount = result.data.filter((inv) => (inv as { isPublic?: boolean }).isPublic !== false).length
        setStats({
          invitations: result.meta.total,
          publicInvitations: publicCount,
          loading: false,
          error: null,
        })
      })
      .catch((err) => {
        setStats((s) => ({
          ...s,
          loading: false,
          error: err instanceof Error ? err.message : 'Failed to load dashboard',
        }))
      })
  }, [])

  if (stats.loading) {
    return (
      <div className="space-y-6">
        <HeroSkeleton />
      </div>
    )
  }

  if (stats.error) {
    return (
      <ErrorState
        title="Dashboard unavailable"
        message={stats.error}
        onRetry={() => window.location.reload()}
      />
    )
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="heading-section text-foreground">Dashboard</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Overview of your wedding invitation platform
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <AnalyticsCard
          title="Total Invitations"
          value={stats.invitations}
          description="All invitations in the system"
          icon={Heart}
        />
        <AnalyticsCard
          title="Public Invitations"
          value={stats.publicInvitations}
          description="Visible to guests"
          icon={Users}
        />
        <AnalyticsCard
          title="RSVP Responses"
          value="—"
          description="View per invitation in RSVPs"
          icon={Mail}
        />
        <AnalyticsCard
          title="Uploaded Images"
          value="—"
          description="Managed via Upload Manager"
          icon={Image}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-sm border border-border bg-card p-6">
          <h3 className="font-serif text-lg mb-2">Quick actions</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/admin/invitations" className="text-primary hover:underline">
                Manage invitations →
              </Link>
            </li>
            <li>
              <Link to="/admin/rsvps" className="text-primary hover:underline">
                View RSVP responses →
              </Link>
            </li>
            <li>
              <Link to="/admin/upload" className="text-primary hover:underline">
                Upload images →
              </Link>
            </li>
            <li>
              <Link to="/create" className="text-primary hover:underline">
                Create new invitation →
              </Link>
            </li>
          </ul>
        </div>

        <div className="rounded-sm border border-border bg-card p-6">
          <h3 className="font-serif text-lg mb-2">Platform notes</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            User management and order analytics require backend endpoints that are not yet available.
            RSVP counts are available per invitation on the RSVPs page.
          </p>
        </div>
      </div>
    </div>
  )
}
