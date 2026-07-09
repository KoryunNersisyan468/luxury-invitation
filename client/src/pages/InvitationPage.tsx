import { useParams } from 'react-router'
import { useInvitation } from '@/hooks'
import { invitationService } from '@/api'
import { FloralFrame } from '@/components/FloralDecorations'
import { HeroSkeleton, SectionSkeleton } from '@/components/ui'
import {
  HeroSection,
  StorySection,
  CalendarSection,
  LocationsSection,
  TimelineSection,
  DressCodeSection,
  RSVPSection,
  FinalSection,
} from '@/sections'
import type { RSVPFormData } from '@/types'

export default function InvitationPage() {
  const { id } = useParams<{ id: string }>()
  const { data, isLoading, error } = useInvitation(id)

  const handleRSVPSubmit = async (formData: RSVPFormData) => {
    if (!id) return
    await invitationService.submitRSVP(id, formData)
  }

  if (isLoading) {
    return (
      <div>
        <HeroSkeleton />
        <SectionSkeleton />
        <SectionSkeleton />
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <h1 className="heading-section text-primary mb-4">Հրավերը չի գտնվել</h1>
          <p className="text-muted-foreground font-body">
            Ցավոք, այս հրավիրատոմսը հասանելի չէ։ Խնդրում ենք ստուգել հղումը։
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      {/* Floral side decorations */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 h-full w-16 md:w-28 text-primary z-0"
      >
        <FloralFrame />
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none fixed right-0 top-0 h-full w-16 md:w-28 text-primary z-0 scale-x-[-1]"
      >
        <FloralFrame />
      </div>

      {/* Narrow centered invitation content */}
      <main className="relative z-10 mx-auto max-w-3xl bg-card/40 backdrop-blur-[1px] shadow-xl">
        <HeroSection
          groomName={data.couple.groom}
          brideName={data.couple.bride}
          groomNameEn={data.couple.groomEn ?? data.couple.groom}
          brideNameEn={data.couple.brideEn ?? data.couple.bride}
          heroImage={data.hero.image}
          subtitle={data.hero.subtitle ?? ''}
        />
        <StorySection title={data.story.title ?? ''} content={data.story.content ?? ''} />
        <CalendarSection
          weddingDate={data.weddingDate}
          monthName={data.calendar.monthName}
          year={data.calendar.year}
        />
        <LocationsSection locations={data.locations} />
        <TimelineSection timeline={data.timeline} />
        <DressCodeSection dressCode={data.dressCode} />
        <RSVPSection rsvp={data.rsvp} onSubmit={handleRSVPSubmit} />
        <FinalSection final={data.final} weddingDate={data.weddingDate} />
      </main>
    </div>
  )
}
