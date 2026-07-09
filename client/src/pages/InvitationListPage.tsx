import { motion } from 'framer-motion';
import { Link } from 'react-router';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui';
import { FloralFrame } from '@/components/FloralDecorations';
import { useInvitations } from '@/hooks/useInvitations';
import { InvitationCard } from '@/components/InvitationCard';
import { InvitationCardSkeleton } from '@/components/InvitationCardSkeleton';
import { EmptyState } from '@/components/EmptyState';
import { ErrorState } from '@/components/ErrorState';
import { staggerContainer } from '@/animations';

export default function InvitationListPage() {
  const { data: invitations, isLoading, error } = useInvitations();

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <ErrorState
          title="Սխալ տեղի ունեցավ"
          message="Չհաջողվեց բեռնել հրավիրատոմսերը։ Խնդրում ենք փորձել կրկին ավելի ուշ։"
          onRetry={() => window.location.reload()}
        />
      </div>
    );
  }

  if (!isLoading && (!invitations || invitations.length === 0)) {
    return (
      <div className="min-h-screen bg-background">
        <EmptyState
          title="Դեռևս հրավիրատոմսեր չկան"
          message="Ստեղծեք ձեր առաջին հարսանեկան հրավիրատոմսը հիմա։"
          actionText="Ստեղծել հրավեր"
          actionLink="/create"
        />
      </div>
    );
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

      <main className="relative z-10 container-narrow py-10 md:py-20">
        <div className="flex items-center justify-between mb-10">
          <h1 className="heading-section text-primary">Ձեր հրավիրատոմսերը</h1>
          <Link to="/create">
            <Button size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Ստեղծել նոր
            </Button>
          </Link>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {isLoading ? Array.from({ length: 6 }).map((_, i) => <InvitationCardSkeleton key={i} />) : invitations?.map((invitation) => (
            <InvitationCard key={invitation.id} invitation={invitation} />
          ))}
        </motion.div>
      </main>
    </div>
  );
}
