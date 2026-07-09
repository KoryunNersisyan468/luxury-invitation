import { cn } from '@/utils'

interface FloralFrameProps {
  className?: string
}

export function FloralFrame({ className }: FloralFrameProps) {
  return (
    <svg
      className={cn('w-full h-full', className)}
      viewBox="0 0 100 800"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
    >
      {/* Top corner flowers */}
      <g className="opacity-30">
        {/* Rose 1 */}
        <circle cx="30" cy="50" r="15" stroke="currentColor" strokeWidth="0.5" fill="none" />
        <circle cx="30" cy="50" r="10" stroke="currentColor" strokeWidth="0.5" fill="none" />
        <circle cx="30" cy="50" r="5" stroke="currentColor" strokeWidth="0.5" fill="none" />
        
        {/* Leaves */}
        <path d="M15 60 Q30 70 45 60 Q30 80 15 60" stroke="currentColor" strokeWidth="0.5" fill="none" />
        <path d="M5 45 Q20 50 35 45 Q20 60 5 45" stroke="currentColor" strokeWidth="0.5" fill="none" />
        
        {/* Stem */}
        <path d="M30 65 Q25 120 40 180" stroke="currentColor" strokeWidth="0.5" fill="none" />
        
        {/* Small buds */}
        <circle cx="50" cy="100" r="8" stroke="currentColor" strokeWidth="0.5" fill="none" />
        <circle cx="50" cy="100" r="4" stroke="currentColor" strokeWidth="0.5" fill="none" />
        
        {/* More leaves along stem */}
        <path d="M30 100 Q45 110 30 130" stroke="currentColor" strokeWidth="0.5" fill="none" />
        <path d="M45 140 Q30 150 45 170" stroke="currentColor" strokeWidth="0.5" fill="none" />
      </g>
      
      {/* Middle section */}
      <g className="opacity-25">
        {/* Rose 2 */}
        <circle cx="60" cy="300" r="18" stroke="currentColor" strokeWidth="0.5" fill="none" />
        <circle cx="60" cy="300" r="12" stroke="currentColor" strokeWidth="0.5" fill="none" />
        <circle cx="60" cy="300" r="6" stroke="currentColor" strokeWidth="0.5" fill="none" />
        
        {/* Petals */}
        <path d="M45 285 Q60 270 75 285 Q60 280 45 285" stroke="currentColor" strokeWidth="0.5" fill="none" />
        <path d="M42 300 Q35 285 45 270" stroke="currentColor" strokeWidth="0.5" fill="none" />
        <path d="M78 300 Q85 285 75 270" stroke="currentColor" strokeWidth="0.5" fill="none" />
        
        {/* Leaves */}
        <path d="M40 320 Q55 340 40 360 Q30 340 40 320" stroke="currentColor" strokeWidth="0.5" fill="none" />
        <path d="M80 320 Q65 340 80 360 Q90 340 80 320" stroke="currentColor" strokeWidth="0.5" fill="none" />
        
        {/* Connecting vine */}
        <path d="M40 180 Q20 240 60 282" stroke="currentColor" strokeWidth="0.5" fill="none" />
        <path d="M60 318 Q30 380 50 450" stroke="currentColor" strokeWidth="0.5" fill="none" />
      </g>
      
      {/* Lower middle */}
      <g className="opacity-20">
        {/* Small flower cluster */}
        <circle cx="25" cy="500" r="10" stroke="currentColor" strokeWidth="0.5" fill="none" />
        <circle cx="25" cy="500" r="5" stroke="currentColor" strokeWidth="0.5" fill="none" />
        
        <circle cx="45" cy="480" r="8" stroke="currentColor" strokeWidth="0.5" fill="none" />
        <circle cx="45" cy="480" r="4" stroke="currentColor" strokeWidth="0.5" fill="none" />
        
        {/* Vine connections */}
        <path d="M50 450 Q35 470 45 480" stroke="currentColor" strokeWidth="0.5" fill="none" />
        <path d="M45 488 Q30 495 25 500" stroke="currentColor" strokeWidth="0.5" fill="none" />
        <path d="M25 510 Q40 550 30 600" stroke="currentColor" strokeWidth="0.5" fill="none" />
      </g>
      
      {/* Bottom section */}
      <g className="opacity-30">
        {/* Large rose */}
        <circle cx="50" cy="700" r="20" stroke="currentColor" strokeWidth="0.5" fill="none" />
        <circle cx="50" cy="700" r="14" stroke="currentColor" strokeWidth="0.5" fill="none" />
        <circle cx="50" cy="700" r="8" stroke="currentColor" strokeWidth="0.5" fill="none" />
        <circle cx="50" cy="700" r="3" stroke="currentColor" strokeWidth="0.5" fill="none" />
        
        {/* Petals around */}
        <path d="M30 685 Q50 670 70 685" stroke="currentColor" strokeWidth="0.5" fill="none" />
        <path d="M28 700 Q15 685 30 670" stroke="currentColor" strokeWidth="0.5" fill="none" />
        <path d="M72 700 Q85 685 70 670" stroke="currentColor" strokeWidth="0.5" fill="none" />
        
        {/* Bottom leaves */}
        <path d="M25 720 Q50 750 75 720 Q50 770 25 720" stroke="currentColor" strokeWidth="0.5" fill="none" />
        <path d="M10 700 Q30 730 10 760" stroke="currentColor" strokeWidth="0.5" fill="none" />
        <path d="M90 700 Q70 730 90 760" stroke="currentColor" strokeWidth="0.5" fill="none" />
        
        {/* Vine to bottom */}
        <path d="M30 600 Q60 650 50 680" stroke="currentColor" strokeWidth="0.5" fill="none" />
      </g>
      
      {/* Scattered small elements */}
      <g className="opacity-15">
        <circle cx="70" cy="200" r="3" stroke="currentColor" strokeWidth="0.5" fill="none" />
        <circle cx="20" cy="400" r="3" stroke="currentColor" strokeWidth="0.5" fill="none" />
        <circle cx="80" cy="550" r="3" stroke="currentColor" strokeWidth="0.5" fill="none" />
        <circle cx="15" cy="650" r="3" stroke="currentColor" strokeWidth="0.5" fill="none" />
      </g>
    </svg>
  )
}

export function FloralCorner({ className }: FloralFrameProps) {
  return (
    <svg
      className={cn('w-24 h-24', className)}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g className="opacity-40">
        {/* Main rose */}
        <circle cx="75" cy="25" r="15" stroke="currentColor" strokeWidth="0.8" fill="none" />
        <circle cx="75" cy="25" r="10" stroke="currentColor" strokeWidth="0.8" fill="none" />
        <circle cx="75" cy="25" r="5" stroke="currentColor" strokeWidth="0.8" fill="none" />
        
        {/* Petals */}
        <path d="M60 15 Q75 5 90 15" stroke="currentColor" strokeWidth="0.8" fill="none" />
        
        {/* Leaves */}
        <path d="M55 30 Q70 45 55 60 Q45 45 55 30" stroke="currentColor" strokeWidth="0.8" fill="none" />
        <path d="M85 40 Q70 55 85 70 Q95 55 85 40" stroke="currentColor" strokeWidth="0.8" fill="none" />
        
        {/* Small bud */}
        <circle cx="35" cy="55" r="8" stroke="currentColor" strokeWidth="0.8" fill="none" />
        <circle cx="35" cy="55" r="4" stroke="currentColor" strokeWidth="0.8" fill="none" />
        
        {/* Vines */}
        <path d="M60 40 Q45 50 35 55" stroke="currentColor" strokeWidth="0.8" fill="none" />
        <path d="M35 63 Q25 75 15 90" stroke="currentColor" strokeWidth="0.8" fill="none" />
        <path d="M75 40 Q80 60 90 85" stroke="currentColor" strokeWidth="0.8" fill="none" />
        
        {/* Small decorative elements */}
        <circle cx="20" cy="80" r="4" stroke="currentColor" strokeWidth="0.8" fill="none" />
        <path d="M10 70 Q20 75 15 85" stroke="currentColor" strokeWidth="0.8" fill="none" />
      </g>
    </svg>
  )
}

export function FloralDivider({ className }: FloralFrameProps) {
  return (
    <svg
      className={cn('w-full h-8', className)}
      viewBox="0 0 400 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
    >
      <g className="opacity-40">
        {/* Center flower */}
        <circle cx="200" cy="15" r="8" stroke="currentColor" strokeWidth="0.8" fill="none" />
        <circle cx="200" cy="15" r="5" stroke="currentColor" strokeWidth="0.8" fill="none" />
        <circle cx="200" cy="15" r="2" stroke="currentColor" strokeWidth="0.8" fill="none" />
        
        {/* Side vines left */}
        <path d="M192 15 Q150 10 100 15 Q50 20 10 15" stroke="currentColor" strokeWidth="0.8" fill="none" />
        <path d="M160 12 Q155 5 145 10" stroke="currentColor" strokeWidth="0.8" fill="none" />
        <path d="M120 17 Q115 25 105 20" stroke="currentColor" strokeWidth="0.8" fill="none" />
        <path d="M70 14 Q65 7 55 12" stroke="currentColor" strokeWidth="0.8" fill="none" />
        
        {/* Side vines right */}
        <path d="M208 15 Q250 10 300 15 Q350 20 390 15" stroke="currentColor" strokeWidth="0.8" fill="none" />
        <path d="M240 12 Q245 5 255 10" stroke="currentColor" strokeWidth="0.8" fill="none" />
        <path d="M280 17 Q285 25 295 20" stroke="currentColor" strokeWidth="0.8" fill="none" />
        <path d="M330 14 Q335 7 345 12" stroke="currentColor" strokeWidth="0.8" fill="none" />
        
        {/* Small buds */}
        <circle cx="150" cy="10" r="3" stroke="currentColor" strokeWidth="0.8" fill="none" />
        <circle cx="250" cy="10" r="3" stroke="currentColor" strokeWidth="0.8" fill="none" />
        <circle cx="80" cy="16" r="3" stroke="currentColor" strokeWidth="0.8" fill="none" />
        <circle cx="320" cy="16" r="3" stroke="currentColor" strokeWidth="0.8" fill="none" />
      </g>
    </svg>
  )
}
