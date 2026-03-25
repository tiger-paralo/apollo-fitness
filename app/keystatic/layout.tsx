import type { ReactNode } from 'react'

export default function KeystaticLayout({ children }: { children: ReactNode }): ReactNode {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 10000,
        background: 'white',
        colorScheme: 'light',
      }}
    >
      {children}
    </div>
  )
}
