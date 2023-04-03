import { observer } from 'mobx-react-lite'
import { Card } from './Card'
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
              {hand.folded ? 'Folded' : `Bet: ${hand.pending_bet}`}
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
      <div className="flex flex-1 justify-around">
        {!hand?.folded &&
          hand?.hole_cards.map((card, i) => {
            const key = card === 'facedown' ? i : `${card.rank}-${card.suit}`
            return <Card key={key} card={card} />
          })}
      </div>
      {hand?.display_rank && <b>{hand.display_rank}</b>}
      {hasButton && <div className="text-red-500">BUTTON</div>}
    </SeatContainer>
  )
})
