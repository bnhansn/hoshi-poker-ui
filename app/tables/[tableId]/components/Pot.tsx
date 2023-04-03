import { observer } from 'mobx-react-lite'
import { useStore } from '@/stores'

export const Pot = observer(function Pot() {
  const { gameStore } = useStore()

  return (
    <div>
      {!!gameStore.round && <div>Round: {gameStore.round}</div>}
      {gameStore.pots.map((chips, idx) => (
        <div key={idx}>
          {idx === 0 ? 'Main Pot: ' : 'Side Pot: '}
          {chips}
        </div>
      ))}
    </div>
  )
})
