'use client'
import { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { useStore } from '@/stores'

export const AppContainer = observer(function AppContainer({
  children
}: {
  children: React.ReactElement
}) {
  const { sessionStore } = useStore()

  useEffect(() => {
    sessionStore.getCurrentUser()
  }, [sessionStore])

  return children
})
