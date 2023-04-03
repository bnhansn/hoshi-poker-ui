'use client'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/navigation'
import { TableRow } from './TableRow'
import { Button } from '@/components'
import { useLobbyChannel } from '@/hooks/useLobbyChannel'
import { useStore } from '@/stores'

export const TableList = observer(function TableList() {
  const router = useRouter()
  useLobbyChannel()
  const { tableListStore, sessionStore } = useStore()
  const tables = tableListStore.tables

  async function onStartTable() {
    try {
      const table = await tableListStore.startTable()
      router.push(`/tables/${table.id}`)
    } catch (error: any) {
      window.alert(error.message)
    }
  }

  function onStopTable(tableId: string) {
    tableListStore.stopTable(tableId)
  }

  return (
    <>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rounded overflow-hidden">
          <thead className="text-xs uppercase bg-gray-700">
            <tr>
              <th scope="col" className="px-6 py-3">
                Table
              </th>
              <th scope="col" className="px-6 py-3">
                Stakes
              </th>
              <th scope="col" className="px-6 py-3">
                Players
              </th>
              <th />
            </tr>
          </thead>
          <tbody>
            {tables.map((table) => (
              <TableRow key={table.id} table={table} onStop={onStopTable} />
            ))}
          </tbody>
        </table>
      </div>
      {sessionStore.user && (
        <Button className="mt-4" onClick={onStartTable}>
          Start Table
        </Button>
      )}
    </>
  )
})
