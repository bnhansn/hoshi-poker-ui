import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider'
import { AppContainer } from '@/app/components/AppContainer'
import { AppContext } from '@/app/components/AppContext'

export function TestWrapper({ children }: { children: React.ReactElement }) {
  return (
    <MemoryRouterProvider>
      <AppContext>
        <AppContainer>{children}</AppContainer>
      </AppContext>
    </MemoryRouterProvider>
  )
}
