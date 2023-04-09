import { observer } from 'mobx-react-lite'
import { PlayingCards } from './PlayingCards'
import { useStore } from '@/stores'

export const Board = observer(function Board() {
  const { gameStore } = useStore()

  return (
    <>
      <div className="relative grid grid-cols-5 gap-4">
        <PlayingCards cards={gameStore.board} />
      </div>
    </>
  )
})
