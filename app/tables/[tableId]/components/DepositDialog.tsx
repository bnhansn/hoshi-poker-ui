import { useState } from 'react'
import {
  Button,
  Dialog,
  DialogHeader,
  DialogContent,
  DialogFooter,
  Input,
  Label
} from '@/components'

const MIN_DEPOSIT = 100
const MAX_DEPOSIT = 1000

export default function DepositDialog({
  isOpen,
  onClose,
  onRequestDeposit
}: {
  isOpen: boolean
  onClose: () => void
  onRequestDeposit: (amount: number) => void
}) {
  const [amount, setAmount] = useState(MAX_DEPOSIT)

  function onSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault()
    if (amount >= MIN_DEPOSIT && amount <= MAX_DEPOSIT) {
      onRequestDeposit(amount)
    }
  }

  return (
    <Dialog isOpen={isOpen} onClose={onClose}>
      <form onSubmit={onSubmit}>
        <DialogHeader onClose={onClose}>Deposit</DialogHeader>
        <DialogContent>
          <Label>Deposit Amount</Label>
          <Input
            type="number"
            min={MIN_DEPOSIT}
            max={MAX_DEPOSIT}
            value={amount}
            onChange={(event) => {
              setAmount(Number(event.target.value))
            }}
            className="bg-gray-600"
          />
        </DialogContent>
        <DialogFooter>
          <Button type="submit">Deposit</Button>
        </DialogFooter>
      </form>
    </Dialog>
  )
}
