import { Transition } from '@headlessui/react'
import { observer } from 'mobx-react-lite'
import { Card } from './Card'
import { useStore } from '@/stores'

export const Board = observer(function Board() {
  const { gameStore } = useStore()

  return (
    <div className="relative grid grid-cols-5 gap-4">
      {new Array(5).fill(null).map((_, idx) => {
        const card = gameStore.board[idx]
        return (
          <Transition
            key={idx}
            appear
            show={!!card}
            enter="transition-all duration-150"
            enterFrom="opacity-0 translate-y-8"
            enterTo="opacity-100 translate-y-0"
            leave="transition-all duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-8"
          >
            {card && <Card card={card} />}
          </Transition>
        )
      })}
    </div>
  )
})
