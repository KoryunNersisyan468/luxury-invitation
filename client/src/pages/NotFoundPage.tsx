import { Link } from 'react-router'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui'

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-20">
      <div className="max-w-xl text-center rounded-[28px] border border-border bg-card/90 p-10 shadow-xl backdrop-blur-sm">
        <p className="text-sm uppercase tracking-[0.35em] text-secondary mb-4 font-medium">
          404 — Թույլտվություն չի գտնվել
        </p>
        <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-4">
          Սխալ էջ է
        </h1>
        <p className="text-muted-foreground font-body mb-8 leading-relaxed">
          Խնդրում ենք վերադարձնել գլխավոր էջ, որպեսզի շարունակեք ստեղծել կամ դիտել հրավիրատոմսեր։
        </p>
        <Link to="/">
          <Button variant="outline" size="lg">
            <ArrowLeft className="w-4 h-4" /> Գլխավոր էջ
          </Button>
        </Link>
      </div>
    </div>
  )
}
