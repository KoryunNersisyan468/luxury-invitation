import { Link } from 'react-router'
import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'
import { fadeUp, defaultTransition } from '@/animations'

export default function AboutPage() {
  return (
    <div className="container-narrow py-16 md:py-24">
      <motion.article
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        transition={defaultTransition}
        className="max-w-3xl mx-auto"
      >
        <div className="flex items-center gap-2 text-primary mb-6">
          <Heart className="h-5 w-5 fill-primary" />
          <span className="text-sm uppercase tracking-widest">About Belle Ame</span>
        </div>

        <h1 className="heading-display text-primary mb-6">Crafting unforgettable wedding invitations</h1>

        <div className="prose prose-neutral max-w-none space-y-4 text-body text-foreground/80">
          <p>
            Belle Ame is a luxury digital wedding invitation platform designed for couples who want
            their special day to begin with elegance. We combine cinematic design, smooth animations,
            and thoughtful features like RSVP management and interactive timelines.
          </p>
          <p>
            Our mission is to help you tell your love story beautifully — from the first scroll through
            the final RSVP confirmation. Every invitation is fully customizable, responsive, and
            crafted with attention to detail.
          </p>
          <p>
            Whether you prefer classic elegance, modern minimalism, garden romance, or destination
            adventure themes, Belle Ame provides the tools to create an invitation that reflects your
            unique celebration.
          </p>
        </div>

        <div className="mt-10">
          <Link to="/create" className="text-primary hover:underline font-medium">
            Start creating your invitation →
          </Link>
        </div>
      </motion.article>
    </div>
  )
}
