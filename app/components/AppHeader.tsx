'use client'
import { observer } from 'mobx-react-lite'
import { Button, ButtonLink } from '@/components'
import { useStore } from '@/stores'

export const AppHeader = observer(function AppHeader() {
  const { sessionStore } = useStore()
  const user = sessionStore.user

  return (
    <header className="py-3 sticky top-0 flex-none w-full mx-auto border-b border-gray-600 bg-gray-800">
      <div className="container mx-auto flex items-center justify-between">
        <span className="text-white font-medium">
          Hoshi <span className="text-xl">⭐️</span> Poker
        </span>
        <div className="flex items-center justify-end">
          {user && (
            <>
              <span className="mr-4">{user.username}</span>
              <Button onClick={() => sessionStore.logout()}>Logout</Button>
            </>
          )}
          {!user && (
            <>
              <ButtonLink href="/login" className="mr-2">
                Login
              </ButtonLink>
              <ButtonLink href="/signup">Sign Up</ButtonLink>
            </>
          )}
        </div>
      </div>
    </header>
  )
})
