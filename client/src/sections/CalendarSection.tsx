import { motion } from 'framer-motion'
import { staggerContainer, staggerItem, defaultTransition } from '@/animations'
import { useCountdown } from '@/hooks'
import { getDaysInMonth, getFirstDayOfMonth } from '@/utils'

interface CalendarSectionProps {
  weddingDate: string
  monthName: string
  year: number
}

export function CalendarSection({ weddingDate, monthName, year }: CalendarSectionProps) {
  const countdown = useCountdown(weddingDate)
  const weddingDateObj = new Date(weddingDate)
  const month = weddingDateObj.getMonth()
  const day = weddingDateObj.getDate()
  
  const daysInMonth = getDaysInMonth(year, month)
  const firstDayOfMonth = getFirstDayOfMonth(year, month)
  
  const weekDays = ['ԿԻՐ', 'ԵՐԿ', 'ԵՐՔ', 'ՉՈՐ', 'ՀԻՆ', 'ՈՒՐ', 'ՇԲԹ']

  return (
    <section className="section-padding">
      <div className="container-narrow">
        <motion.div
          className="text-center"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {/* Month and Year */}
          <motion.div
            className="flex items-center justify-center gap-8 mb-8"
            variants={staggerItem}
            transition={defaultTransition}
          >
            <span className="font-serif text-3xl md:text-4xl text-primary">{monthName}</span>
            <span className="font-serif text-3xl md:text-4xl text-primary">{year}</span>
          </motion.div>

          {/* Calendar Grid */}
          <motion.div
            className="max-w-sm mx-auto bg-card rounded-sm p-6 border border-border"
            variants={staggerItem}
            transition={defaultTransition}
          >
            {/* Week days header */}
            <div className="grid grid-cols-7 gap-1 mb-4">
              {weekDays.map((dayName) => (
                <div
                  key={dayName}
                  className="text-xs text-muted-foreground font-body py-2"
                >
                  {dayName}
                </div>
              ))}
            </div>

            {/* Days grid */}
            <div className="grid grid-cols-7 gap-1">
              {/* Empty cells for days before month starts */}
              {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                <div key={`empty-${i}`} className="py-2" />
              ))}
              
              {/* Days of month */}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const currentDay = i + 1
                const isWeddingDay = currentDay === day
                
                return (
                  <div
                    key={currentDay}
                    className={`py-2 text-sm font-body transition-colors ${
                      isWeddingDay
                        ? 'bg-primary text-primary-foreground rounded-full font-semibold'
                        : 'text-foreground/70 hover:text-foreground'
                    }`}
                  >
                    {currentDay}
                  </div>
                )
              })}
            </div>
          </motion.div>

          {/* Countdown */}
          <motion.div
            className="mt-12"
            variants={staggerItem}
            transition={defaultTransition}
          >
            <p className="text-muted-foreground font-body text-sm mb-4 tracking-wide uppercase">
              Հաշվարկն սկսված է
            </p>
            <div className="flex justify-center gap-6 md:gap-10">
              {[
                { value: countdown.days, label: 'Օր' },
                { value: countdown.hours, label: 'Ժամ' },
                { value: countdown.minutes, label: 'Րոպե' },
                { value: countdown.seconds, label: 'Վրկ' },
              ].map((item) => (
                <div key={item.label} className="text-center">
                  <div className="font-serif text-4xl md:text-5xl text-primary">
                    {String(item.value).padStart(2, '0')}
                  </div>
                  <div className="text-xs text-muted-foreground font-body mt-1 uppercase tracking-wider">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
