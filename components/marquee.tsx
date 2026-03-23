'use client'

import { ScrollVelocity } from '@/components/react-bits/scroll-velocity'

export function Marquee() {
  return (
    <div className="py-6 md:py-8 border-y border-white/5 bg-apollo-black overflow-hidden select-none">
      <ScrollVelocity
        texts={[
          'STRENGTH  •  COMMUNITY  •  PROGRESS  •  FUNCTIONAL FITNESS  •  NO EGOS  •  MAX 8 PER CLASS  •',
          'HYROX  •  WODs  •  S&C  •  PERSONAL TRAINING  •  PILATES  •  MAIDENHEAD  •',
        ]}
        velocity={80}
        className="font-display font-bold text-3xl md:text-5xl uppercase tracking-wider text-white/[0.07]"
        numCopies={4}
      />
    </div>
  )
}
