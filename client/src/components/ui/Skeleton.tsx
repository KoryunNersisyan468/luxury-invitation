import { cn } from '@/utils'

interface SkeletonProps {
  className?: string
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn('animate-pulse rounded-sm bg-muted', className)}
    />
  )
}

export function HeroSkeleton() {
  return (
    <div className="relative h-screen">
      <Skeleton className="absolute inset-0" />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-4">
        <Skeleton className="h-16 w-64" />
        <Skeleton className="h-24 w-96" />
        <Skeleton className="h-8 w-48" />
      </div>
    </div>
  )
}

export function SectionSkeleton() {
  return (
    <div className="container-narrow section-padding">
      <div className="flex flex-col items-center gap-6">
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-32 w-full max-w-2xl" />
      </div>
    </div>
  )
}

export function CardSkeleton() {
  return (
    <div className="rounded-sm border border-border p-6">
      <Skeleton className="h-6 w-32 mb-4" />
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-3/4" />
    </div>
  )
}

export function FormSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-11 w-full" />
      <Skeleton className="h-11 w-full" />
      <Skeleton className="h-32 w-full" />
      <Skeleton className="h-11 w-32" />
    </div>
  )
}
