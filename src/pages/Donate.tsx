import { useState } from 'react'
import {
  HiOutlineBanknotes,
  HiOutlineDevicePhoneMobile,
  HiOutlineEnvelope,
  HiOutlineClipboard,
  HiCheck,
  HiArrowRight,
} from 'react-icons/hi2'
import { StandalonePage } from '@/components/layout/StandalonePage'
import { SacredLamp } from '@/components/three/SacredLamp'
import { Reveal } from '@/components/ui/Reveal'
import { useLetters } from '@/hooks/useAnime'
import { navigate } from '@/lib/router'

function CopyField({ label, value }: { label: string; value: string }) {
  const [copied, setCopied] = useState(false)
  return (
    <button
      onClick={() => {
        navigator.clipboard?.writeText(value).then(
          () => {
            setCopied(true)
            setTimeout(() => setCopied(false), 1600)
          },
          () => {},
        )
      }}
      className="group flex w-full items-center justify-between gap-3 rounded-xl border border-maroon-900/10 bg-cream-100/70 px-4 py-2.5 text-left transition-colors hover:border-saffron-500/50"
    >
      <span className="min-w-0">
        <span className="block text-[0.66rem] tracking-[0.14em] text-ink-500 uppercase">
          {label}
        </span>
        <span className="block truncate font-display text-[0.98rem] text-maroon-900">{value}</span>
      </span>
      {copied ? (
        <HiCheck className="h-4 w-4 shrink-0 text-green-600" />
      ) : (
        <HiOutlineClipboard className="h-4 w-4 shrink-0 text-ink-400 transition-colors group-hover:text-saffron-600" />
      )}
    </button>
  )
}

const REFERENCE = 'Please use your name and natchathiram (birth star, e.g. Bharani) as the reference.'

export function Donate() {
  const titleRef = useLetters<HTMLHeadingElement>(200)

  return (
    <StandalonePage
      crumbs={[{ label: 'How to Donate' }]}
      tint="rgba(201,161,74,0.24)"
      surface="from-[#faf4e6] to-cream-50"
    >
      {/* Hero */}
      <section className="relative shell grid grid-cols-1 items-center gap-8 pt-10 pb-14 lg:grid-cols-12 lg:pt-16">
        <div className="lg:col-span-7">
          <Reveal>
            <span className="eyebrow inline-flex items-center gap-3 text-saffron-600">
              <span aria-hidden className="h-px w-8 bg-saffron-500/60" />
              How to Donate
            </span>
          </Reveal>
          <h1
            ref={titleRef}
            className="mt-5 font-display text-[clamp(2.4rem,6vw,4.6rem)] leading-[1.02] text-maroon-900"
          >
            Every offering keeps the lamps lit
          </h1>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-xl font-serif text-lg leading-relaxed text-ink-700">
              Your generosity sustains daily worship, festivals, the canteen and our community
              programs. Give by bank transfer, PayID or cheque — every contribution is a sacred
              offering.
            </p>
          </Reveal>
        </div>
        <div className="relative h-56 lg:col-span-5 lg:h-80">
          <SacredLamp className="absolute inset-0" />
        </div>
      </section>

      {/* Payment methods */}
      <section className="relative shell pb-14">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {/* Bank transfer */}
          <Reveal>
            <div className="flex h-full flex-col rounded-3xl border border-maroon-900/10 bg-cream-50 p-6 shadow-soft">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-saffron-500/12 text-saffron-600">
                <HiOutlineBanknotes className="h-6 w-6" />
              </span>
              <h3 className="mt-4 font-display text-xl text-maroon-900">Bank Transfer</h3>
              <div className="mt-4 space-y-2.5">
                <CopyField label="Account Name" value="The Melbourne Vinayagar Hindu Sangam" />
                <CopyField label="BSB" value="063-233" />
                <CopyField label="Account Number" value="10039273" />
              </div>
            </div>
          </Reveal>

          {/* PayID */}
          <Reveal delay={0.06}>
            <div className="flex h-full flex-col rounded-3xl border border-maroon-900/10 bg-cream-50 p-6 shadow-soft">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-saffron-500/12 text-saffron-600">
                <HiOutlineDevicePhoneMobile className="h-6 w-6" />
              </span>
              <h3 className="mt-4 font-display text-xl text-maroon-900">PayID</h3>
              <div className="mt-4 space-y-2.5">
                <CopyField label="PayID" value="50275645361" />
              </div>
              <p className="mt-4 font-serif text-[0.9rem] leading-relaxed text-ink-600">
                Fast and instant from your banking app — no account details needed.
              </p>
            </div>
          </Reveal>

          {/* Cheque */}
          <Reveal delay={0.12}>
            <div className="flex h-full flex-col rounded-3xl border border-maroon-900/10 bg-cream-50 p-6 shadow-soft">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-saffron-500/12 text-saffron-600">
                <HiOutlineEnvelope className="h-6 w-6" />
              </span>
              <h3 className="mt-4 font-display text-xl text-maroon-900">Cheque</h3>
              <div className="mt-4 space-y-2.5">
                <CopyField label="Payable to" value="The Melbourne Vinayagar Hindu Sangam" />
              </div>
              <p className="mt-4 font-serif text-[0.9rem] leading-relaxed text-ink-600">
                Post or hand your cheque at the temple office during opening hours.
              </p>
            </div>
          </Reveal>
        </div>

        {/* Reference note */}
        <Reveal delay={0.05}>
          <p className="mt-6 rounded-2xl border border-saffron-500/25 bg-saffron-500/8 px-5 py-4 text-center font-serif text-[0.95rem] text-maroon-800">
            {REFERENCE}
          </p>
        </Reveal>
      </section>

      {/* Community HUB call-out */}
      <section className="relative shell pb-24">
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-6 rounded-3xl border border-maroon-900/10 bg-gradient-to-br from-maroon-900 to-[#240505] p-8 text-cream-50 shadow-soft sm:flex-row sm:items-center sm:p-10">
            <div>
              <h3 className="font-display text-2xl text-cream-50 sm:text-3xl">
                Build the MVHS Community HUB
              </h3>
              <p className="mt-2 max-w-xl font-serif text-cream-100/80">
                Sponsor a piece of the new community hub — from a single concrete block to the roof
                above it. Explore the sponsorship ladder and leave your family’s mark in stone.
              </p>
            </div>
            <button
              onClick={() => navigate('/community-hub')}
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-gold-400 px-6 py-3 text-sm font-semibold text-maroon-950 transition-transform hover:scale-[1.03]"
            >
              View the HUB <HiArrowRight className="h-4 w-4" />
            </button>
          </div>
        </Reveal>
      </section>
    </StandalonePage>
  )
}
