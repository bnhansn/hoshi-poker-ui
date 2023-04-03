import { useEffect } from 'react'
import { useStore } from '@/stores'

export function useLobbyChannel() {
  const { lobbyChannel } = useStore()

  useEffect(() => {
    lobbyChannel.connect()

    return () => {
      lobbyChannel.disconnect()
    }
  }, [lobbyChannel])
}
