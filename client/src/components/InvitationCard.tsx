import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { CalendarDays } from 'lucide-react';
import { InvitationListItem } from '@/types';
import { defaultTransition, staggerItem } from '@/animations';

interface InvitationCardProps {
  invitation: InvitationListItem;
}

export function InvitationCard({ invitation }: InvitationCardProps) {
  const date = new Date(invitation.date);
  const formattedDate = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <motion.div
      variants={staggerItem}
      transition={defaultTransition}
      className="relative group overflow-hidden rounded-sm border border-border bg-card shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out cursor-pointer"
    >
      <Link to={`/invitation/${invitation.id}`} className="block">
        <div className="relative w-full h-48 overflow-hidden">
          <img
            src={invitation.coverImage}
            alt={invitation.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </div>
        <div className="p-6">
          <h3 className="font-serif text-2xl text-foreground mb-2 group-hover:text-primary transition-colors duration-200">
            {invitation.title}
          </h3>
          <div className="flex items-center text-muted-foreground text-sm font-body mb-4">
            <CalendarDays className="w-4 h-4 mr-2" />
            <span>{formattedDate}</span>
          </div>
          {/* Add a short description if available in the InvitationListItem type */}
          {/* <p className="text-sm text-muted-foreground font-body line-clamp-2">{invitation.description}</p> */}
        </div>
      </Link>
    </motion.div>
  );
}