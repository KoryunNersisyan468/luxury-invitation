import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { cn } from '@/utils'

interface ModalProps {
  open: boolean
  title?: string
  description?: string
  onClose: () => void
  children: React.ReactNode
  className?: string
}

export function Modal({ open, title, description, onClose, children, className }: ModalProps) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          role="dialog"
          aria-modal="true"
        >
          <motion.div
            initial={{ y: 30, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 30, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className={cn('w-full max-w-3xl rounded-[32px] border border-border bg-card p-8 shadow-2xl', className)}
          >
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-border mb-6">
              <div>
                {title ? <h2 className="text-2xl font-serif text-foreground">{title}</h2> : null}
                {description ? <p className="text-sm text-muted-foreground mt-1">{description}</p> : null}
              </div>
              <button type="button" onClick={onClose} className="rounded-full p-2 text-muted-foreground transition hover:bg-muted hover:text-foreground">
                <X className="w-5 h-5" />
              </button>
            </div>
            {children}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
