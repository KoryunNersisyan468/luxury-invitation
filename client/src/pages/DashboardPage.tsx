import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import {  Plus } from 'lucide-react'
import { Button, Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui'
import { invitationService } from '@/api'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { SectionHeading } from '@/components/ui/SectionHeading'
import type { InvitationListItem } from '@/types'

export default function DashboardPage() {
  useDocumentTitle('Dashboard')
  const [invitations, setInvitations] = useState<InvitationListItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    invitationService.getAll({ limit: 5 }).then(setInvitations).finally(() => setIsLoading(false))
  }, [])

  return (
    <div className="container-narrow py-16 md:py-24">
      <SectionHeading
        title="Creator dashboard"
        description="A polished hub for your invitations, inspiration, and next launch."
      />

      <div className="mt-12 grid gap-6 xl:grid-cols-[1.4fr_1fr]">
        <section className="space-y-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <Card className="overflow-hidden">
              <CardHeader>
                <CardTitle>Build your invitation</CardTitle>
                <CardDescription>Launch a new design in minutes.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Pick your category, choose a template, and create an invitation that feels custom-built.</p>
                <Link to="/create">
                  <Button className="mt-6">
                    <Plus className="w-4 h-4" />
                    New invitation
                  </Button>
                </Link>
              </CardContent>
            </Card>
            <Card className="overflow-hidden bg-primary text-primary-foreground">
              <CardHeader>
                <CardTitle>Premium studio</CardTitle>
                <CardDescription>Smart tools for every celebration.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">Save templates, manage RSVP replies, and present a stunning invitation experience from start to finish.</p>
              </CardContent>
            </Card>
          </div>

          <Card className="overflow-hidden">
            <CardHeader>
              <CardTitle>Recent invitations</CardTitle>
              <CardDescription>Latest drafts and published previews.</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-3">
                  <div className="h-4 w-2/3 rounded-full bg-muted" />
                  <div className="h-4 w-full rounded-full bg-muted" />
                  <div className="h-4 w-4/5 rounded-full bg-muted" />
                </div>
              ) : invitations.length === 0 ? (
                <p className="text-sm text-muted-foreground">No invitations available yet. Create one to see it here.</p>
              ) : (
                <div className="space-y-4">
                  {invitations.map((invitation) => (
                    <div key={invitation.id} className="rounded-3xl border border-border bg-muted/60 p-4">
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <p className="font-semibold">{invitation.title}</p>
                          <p className="text-xs text-muted-foreground">{new Date(invitation.date).toLocaleDateString()}</p>
                        </div>
                        <Link to={`/invitation/${invitation.id}`} className="text-primary text-xs font-semibold">View</Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </section>

        <aside className="space-y-6">
          <Card className="overflow-hidden">
            <CardHeader>
              <CardTitle>Inspiration</CardTitle>
              <CardDescription>Top categories to explore.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-3xl bg-muted/70 p-4">
                  <p className="font-semibold">Wedding</p>
                  <p className="text-sm text-muted-foreground">Elegant design, gold accents, and refined typography.</p>
                </div>
                <div className="rounded-3xl bg-muted/70 p-4">
                  <p className="font-semibold">Birthday</p>
                  <p className="text-sm text-muted-foreground">Vibrant colors, playful layouts, and festive energy.</p>
                </div>
                <div className="rounded-3xl bg-muted/70 p-4">
                  <p className="font-semibold">Baby Shower</p>
                  <p className="text-sm text-muted-foreground">Soft pastels, rounded shapes, and cozy charm.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden bg-secondary text-secondary-foreground">
            <CardHeader>
              <CardTitle>Premium edition</CardTitle>
              <CardDescription>Designed for boutique celebrations.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm">Enjoy a modern interface, mobile-first design, and curated category presentations that feel premium and polished.</p>
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  )
}
