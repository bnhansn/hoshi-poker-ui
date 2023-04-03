import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider'
import { AppContext } from '@/app/components/AppContext'

export function TestWrapper({ children }: { children: React.ReactNode }) {
  return (
    <MemoryRouterProvider>
      <AppContext>{children}</AppContext>
    </MemoryRouterProvider>
  )
}
