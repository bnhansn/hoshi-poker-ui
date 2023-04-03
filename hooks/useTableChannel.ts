import { useEffect } from 'react'
import { useStore } from '@/stores'

export function useTableChannel(tableId: string) {
  const { tableChannel } = useStore()

  useEffect(() => {
    tableChannel.connect(tableId)

    return () => {
      tableChannel.disconnect()
    }
  }, [tableId, tableChannel])
}
