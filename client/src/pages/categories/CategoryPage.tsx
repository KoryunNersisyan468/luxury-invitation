import { useEffect, useMemo, useState } from 'react'
import { useParams, Link } from 'react-router'
import { motion } from 'framer-motion'
import { Search, SlidersHorizontal } from 'lucide-react'
import NotFoundPage from '@/pages/NotFoundPage'
import { getCategoryBySlug } from '@/lib/categories'
import { invitationService } from '@/api'
import { InvitationCard } from '@/components/InvitationCard'
import { InvitationCardSkeleton } from '@/components/InvitationCardSkeleton'
import { EmptyState } from '@/components/EmptyState'
import { ErrorState } from '@/components/ErrorState'
import { Input, Button } from '@/components/ui'
import type { InvitationListItem } from '@/types'
import { staggerContainer } from '@/animations'

export default function CategoryPage() {
  const { slug } = useParams<{ slug: string }>()
  const category = slug ? getCategoryBySlug(slug) : undefined

  const [invitations, setInvitations] = useState<InvitationListItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState<'date-asc' | 'date-desc' | 'title'>('date-desc')

  useEffect(() => {
    if (!category) return

    setIsLoading(true)
    setError(null)

    invitationService
      .getAll({ search: category.searchTerms[0] })
      .then((data) => setInvitations(data))
      .catch((err) => setError(err instanceof Error ? err.message : 'Failed to load'))
      .finally(() => setIsLoading(false))
  }, [category])

  const filtered = useMemo(() => {
    let result = [...invitations]

    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter((inv) => inv.title?.toLowerCase().includes(q))
    }

    result.sort((a, b) => {
      if (sortBy === 'title') return (a.title ?? '').localeCompare(b.title ?? '')
      const dateA = new Date(a.date).getTime()
      const dateB = new Date(b.date).getTime()
      return sortBy === 'date-asc' ? dateA - dateB : dateB - dateA
    })

    return result
  }, [invitations, search, sortBy])

  if (!category) {
    return <NotFoundPage />
  }

  if (error) {
    return (
      <ErrorState
        title="Failed to load invitations"
        message={error}
        onRetry={() => window.location.reload()}
      />
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <section
        className="relative h-64 md:h-80 flex items-end bg-cover bg-center"
        style={{ backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.6), transparent), url(${category.image})` }}
      >
        <div className="container-narrow pb-8 text-white">
          <p className="text-sm uppercase tracking-widest opacity-80 mb-2">Invitation Style</p>
          <h1 className="heading-display text-white">{category.name}</h1>
          <p className="text-body opacity-90 max-w-xl mt-2">{category.description}</p>
        </div>
      </section>

      <main className="container-narrow py-10">
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Filter invitations..."
              className="pl-10"
              aria-label="Search invitations"
            />
          </div>
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="h-11 rounded-sm border border-input bg-card px-3 text-sm"
              aria-label="Sort invitations"
            >
              <option value="date-desc">Newest first</option>
              <option value="date-asc">Oldest first</option>
              <option value="title">Title A–Z</option>
            </select>
            <Link to="/create">
              <Button>Create invitation</Button>
            </Link>
          </div>
        </div>

        {!isLoading && filtered.length === 0 ? (
          <EmptyState
            title="No invitations found"
            message={`No ${category.name.toLowerCase()} invitations match your filters yet.`}
            actionText="Create one"
            actionLink="/create"
          />
        ) : (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {isLoading
              ? Array.from({ length: 6 }).map((_, i) => <InvitationCardSkeleton key={i} />)
              : filtered.map((invitation) => (
                  <InvitationCard key={invitation.id} invitation={invitation} />
                ))}
          </motion.div>
        )}
      </main>
    </div>
  )
}
