import { observer } from 'mobx-react-lite'
import { PlayingCards } from './PlayingCards'
import { SeatContainer } from './SeatContainer'
import { TimeBankBar } from './TimeBankBar'
import { useStore } from '@/stores'

export const Seat = observer(function Seat({ index }: { index: number }) {
  const { tableStore, gameStore } = useStore()
  const player = tableStore.seats[index]
  const playerId = player?.id
  const hand = gameStore.playerHand(playerId)
  const hasButton = tableStore.buttonIndex === index
  const isWaitingOnPlayer =
    !!playerId && playerId === gameStore.waitingOnPlayerId
  const timeBankSeconds = isWaitingOnPlayer
    ? gameStore.timeBank?.seconds || 0
    : undefined

  return (
    <SeatContainer>
      {(timeBankSeconds as number) >= 0 && (
        <TimeBankBar seconds={timeBankSeconds as number} />
      )}
      <div style={{ height: 72 }}>
        <>
          {hand && (
            <span className="text-center">
              {hand.folded ? 'Folded' : `Bet: ${hand.pendingBet}`}
            </span>
          )}
          {player && (
            <div>
              <div>chips: {player.chips}</div>
              <div>status: {player.status}</div>
            </div>
          )}
        </>
      </div>
      <div className="flex justify-around">
        <PlayingCards cards={hand?.cards} />
      </div>
      {hand?.displayRank && <b>{hand.displayRank}</b>}
      {hasButton && <div className="text-red-500">BUTTON</div>}
    </SeatContainer>
  )
})
