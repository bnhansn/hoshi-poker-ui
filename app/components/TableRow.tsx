import { StopCircleIcon } from '@heroicons/react/24/solid'
import { observer } from 'mobx-react-lite'
import Link from 'next/link'
import { Button } from '@/components'
import { Table } from '@/models'

export const TableRow = observer(function TableRow({
  table,
  onStop
}: {
  table: Table
  onStop: (tableId: string) => void
}) {
  return (
    <tr
      data-testid={`table-${table.id}`}
      className="border-b bg-gray-800 border-gray-700"
    >
      <td className="px-6 py-4 text-blue-500 hover:underline">
        <Link href={`/tables/${table.id}`}>{table.id}</Link>
      </td>
      <td className="px-6 py-4">
        {table.blinds.small}/{table.blinds.big}
      </td>
      <td className="px-6 py-4">
        {table.seats.filter(Boolean).length}/{table.seats.length}
      </td>
      <td className="px-6 py-4 text-right">
        <Button
          className="px-2.5 py-2"
          onClick={() => onStop(table.id)}
          aria-label={`Stop Table ${table.id}`}
        >
          <StopCircleIcon className="h-5 w-5 text-white" />
        </Button>
      </td>
    </tr>
  )
})
