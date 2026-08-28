import HeroCorkboard from '../../components/hero/HeroCorkboard'
import HeroDeskFlatlay from '../../components/hero/HeroDeskFlatlay'
import HeroJournalSpread from '../../components/hero/HeroJournalSpread'

function Label({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-content px-6 pt-10">
      <p className="tag">{children}</p>
    </div>
  )
}

function Divider() {
  return (
    <div aria-hidden className="mx-auto flex max-w-content items-center gap-3 px-6 py-4">
      <span className="h-px flex-1 bg-line" />
      <span className="font-mono text-[10px] text-faint">✦</span>
      <span className="h-px flex-1 bg-line" />
    </div>
  )
}

export default function HeroVariations() {
  return (
    <div className="pb-24">
      <Label>Variant A — Corkboard (draggable, pinned)</Label>
      <HeroCorkboard />

      <Divider />

      <Label>Variant B — Desk flatlay (bento grid)</Label>
      <HeroDeskFlatlay />

      <Divider />

      <Label>Variant C — Journal spread (taped-in pages)</Label>
      <HeroJournalSpread />
    </div>
  )
}
