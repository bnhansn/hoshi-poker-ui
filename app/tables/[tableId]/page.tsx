'use client'
import { observer } from 'mobx-react-lite'
import { BettingActions } from './components/BettingActions'
import { Board } from './components/Board'
import { ChatBox } from './components/ChatBox'
import { Pot } from './components/Pot'
import { SeatList } from './components/SeatList'
import { TableCircle } from './components/TableCircle'
import { TableNav } from './components/TableNav'
import { useTableChannel } from '@/hooks/useTableChannel'

export default observer(function Page({
  params
}: {
  params: { tableId: string }
}) {
  const { tableId } = params
  useTableChannel(tableId)

  return (
    <div className="flex flex-col h-screen">
      <TableNav />
      <div className="relative flex flex-1 justify-center">
        <TableCircle>
          <SeatList />
          <Board />
          <Pot />
        </TableCircle>
      </div>
      <div className="flex justify-between">
        <ChatBox />
        <BettingActions />
      </div>
    </div>
  )
})
