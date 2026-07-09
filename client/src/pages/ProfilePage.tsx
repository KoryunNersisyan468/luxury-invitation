import { useMemo } from 'react'
import { Link } from 'react-router'
import { User, ShieldCheck, LogOut } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { Button } from '@/components/ui'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'

export default function ProfilePage() {
  useDocumentTitle('Profile')
  const { user, logout } = useAuth()

  const userRole = useMemo(() => (user?.role === 'ADMIN' ? 'Administrator' : 'Creator'), [user?.role])

  return (
    <div className="container-narrow py-16 md:py-24">
      <SectionHeading
        title="Your profile"
        description="Manage your account, quick actions, and access your invitation studio from one elegant dashboard."
      />

      <div className="mt-12 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <section className="rounded-[32px] border border-border bg-card p-8 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-primary/10 text-primary">
              <User className="h-7 w-7" />
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-muted-foreground">Account</p>
              <h2 className="font-serif text-2xl text-foreground">{user?.email ?? 'No email available'}</h2>
            </div>
          </div>

          <div className="mt-8 space-y-4 text-sm text-foreground/80">
            <div className="rounded-3xl bg-muted/70 p-4">
              <p className="font-medium">Role</p>
              <p>{userRole}</p>
            </div>
            <div className="rounded-3xl bg-muted/70 p-4">
              <p className="font-medium">Member since</p>
              <p>{user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Unknown'}</p>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button variant="default" className="w-full sm:w-auto" onClick={logout}>
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
            <Link to="/create" className="w-full sm:w-auto">
              <Button variant="outline" className="w-full">Create invitation</Button>
            </Link>
          </div>
        </section>

        <section className="rounded-[32px] border border-border bg-card p-8 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-secondary/10 text-secondary">
              <ShieldCheck className="h-7 w-7" />
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-muted-foreground">Security</p>
              <h2 className="font-serif text-2xl text-foreground">Secure access</h2>
            </div>
          </div>

          <div className="mt-8 space-y-4 text-sm text-foreground/80">
            <div className="rounded-3xl bg-muted/70 p-4">
              <p className="font-medium">Session protection</p>
              <p>Sign out from all devices by logging out when finished.</p>
            </div>
            <div className="rounded-3xl bg-muted/70 p-4">
              <p className="font-medium">Support</p>
              <p>Need help? Reach out to hello@belleame.com for support.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
