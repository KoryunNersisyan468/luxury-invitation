import { motion } from 'framer-motion';
import { defaultTransition, staggerItem } from '@/animations';

export function InvitationCardSkeleton() {
  return (
    <motion.div
      variants={staggerItem}
      transition={defaultTransition}
      className="relative group overflow-hidden rounded-sm border border-border bg-card shadow-lg animate-pulse"
    >
      <div className="relative w-full h-48 bg-muted/50" />
      <div className="p-6">
        <div className="h-6 bg-muted/50 rounded w-3/4 mb-2" />
        <div className="h-4 bg-muted/50 rounded w-1/2 mb-4" />
        {/* <div className="h-4 bg-muted/50 rounded w-full mb-2" />
        <div className="h-4 bg-muted/50 rounded w-5/6" /> */}
      </div>
    </motion.div>
  );
}