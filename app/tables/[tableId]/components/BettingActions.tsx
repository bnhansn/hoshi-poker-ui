import { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { Button, Input } from '@/components'
import { useStore } from '@/stores'

export const BettingActions = observer(function BettingActions() {
  const { gameStore, tableStore, tableChannel } = useStore()
  const [amountToRaise, setAmountToRaise] = useState(gameStore.minRaise)

  useEffect(() => {
    // After someone raises (or betting round ends), the minRaise is updated
    // because there is now a newer highestPendingBet, and we want to reset the
    // default amountToRaise to this value.
    if (gameStore.minRaise) {
      setAmountToRaise(gameStore.minRaise)
    }
  }, [gameStore.minRaise])

  async function onFold() {
    try {
      await tableChannel.fold()
    } catch (error: any) {
      window.alert(error.message)
    }
  }

  async function onCheck() {
    try {
      await tableChannel.check()
    } catch (error: any) {
      window.alert(error.message)
    }
  }

  async function onCall() {
    try {
      await tableChannel.call()
    } catch (error: any) {
      window.alert(error.message)
    }
  }

  async function onRaise(amount: number) {
    try {
      await tableChannel.raise(amount)
    } catch (error: any) {
      window.alert(error.message)
    }
  }

  if (!gameStore.isWaitingOnMe) {
    return null
  }

  // TODO
  // Show planned actions if
  // - I'm in the game
  // - It is not my turn
  // - I have not acted this round OR I did act and someone reraised

  // Two scenarios:
  // A: No one has raised yet
  // - Check                :check
  // - Check/Fold           :check_fold
  // - Call Any/Check       :call_any
  // B: Someone has raised
  // - Call {amount}        {:call, amount}
  // - Fold                 :check_fold
  // - Call Any             :call_any

  return (
    <div className="self-end m-4 p-4 border bg-gray-800 border-gray-600 rounded-md w-[400px]">
      {gameStore.canRaise && (
        <>
          {gameStore.currentPotAmount > 0 && (
            <div className="grid grid-flow-col auto-cols-fr gap-2 mb-4">
              <Button
                disabled={!gameStore.canRaiseHalfPot}
                onClick={() => {
                  onRaise(gameStore.halfPotAmount)
                }}
              >
                1/2
              </Button>
              <Button
                disabled={!gameStore.canRaisePotAmount}
                onClick={() => {
                  onRaise(gameStore.currentPotAmount)
                }}
              >
                Pot
              </Button>
              <Button
                disabled={!gameStore.canRaiseDoublePotAmount}
                onClick={() => {
                  onRaise(gameStore.doublePotAmount)
                }}
              >
                2x
              </Button>
            </div>
          )}
          <div className="flex mb-4">
            <Input
              className="w-1/3 mr-4"
              type="number"
              min={gameStore.minRaise}
              max={tableStore.currentPlayerChips}
              // Set to empty string if amount is 0 so input looks empty
              value={amountToRaise || ''}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                const amount = Number(event.target.value)
                if (amount <= tableStore.currentPlayerChips) {
                  setAmountToRaise(amount)
                }
              }}
            />
            <input
              type="range"
              className="w-2/3"
              min={gameStore.minRaise}
              max={tableStore.currentPlayerChips}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setAmountToRaise(Number(event.target.value))
              }}
              value={Math.max(amountToRaise, 0)}
            />
          </div>
        </>
      )}
      <div className="grid grid-flow-col auto-cols-fr gap-2">
        <>
          {gameStore.canFold && <Button onClick={onFold}>Fold</Button>}
          {gameStore.canCheck && <Button onClick={onCheck}>Check</Button>}
          {gameStore.canCall && (
            <Button onClick={onCall}>Call {gameStore.amountToCall}</Button>
          )}
          {gameStore.canRaise && (
            <Button onClick={() => onRaise(amountToRaise)}>
              {amountToRaise === tableStore.currentPlayerChips
                ? `All In ${amountToRaise}`
                : `Raise ${amountToRaise}`}
            </Button>
          )}
        </>
      </div>
    </div>
  )
})
