'use client'
import { useRef } from 'react'
import { StoreContext } from '@/stores'
import { RootStore } from '@/stores/root'

/**
 * Wraps the app in contexts that must be a client component in Next.js
 */
export function AppContext({ children }: { children: React.ReactNode }) {
  const store = useRef(new RootStore())

  return (
    <StoreContext.Provider value={store.current}>
      {children}
    </StoreContext.Provider>
  )
}
