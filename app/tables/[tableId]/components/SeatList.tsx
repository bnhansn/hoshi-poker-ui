import { observer } from 'mobx-react-lite'
import { Seat } from './Seat'
import { useStore } from '@/stores'

function getSeatIndex(
  seatCount: number,
  currentPlayerSeatIndex: number,
  offsetFromCurrentPlayer: number
): number {
  const index = currentPlayerSeatIndex + offsetFromCurrentPlayer
  if (index >= seatCount) {
    return index - seatCount
  }
  return index
}

export const SeatList = observer(function SeatList() {
  const { tableStore } = useStore()
  const currentPlayerSeatIndex = tableStore.currentPlayerSeatIndex
  const seatCount = tableStore.seats.length

  if (currentPlayerSeatIndex > -1) {
    return (
      <div>
        <Seat index={currentPlayerSeatIndex} />
        <Seat index={getSeatIndex(seatCount, currentPlayerSeatIndex, 1)} />
        <Seat index={getSeatIndex(seatCount, currentPlayerSeatIndex, 2)} />
        <Seat index={getSeatIndex(seatCount, currentPlayerSeatIndex, 3)} />
        <Seat index={getSeatIndex(seatCount, currentPlayerSeatIndex, 4)} />
        <Seat index={getSeatIndex(seatCount, currentPlayerSeatIndex, 5)} />
      </div>
    )
  }

  return (
    <>
      {new Array(seatCount).fill(null).map((_, i) => (
        <Seat key={i} index={i} />
      ))}
    </>
  )
})
