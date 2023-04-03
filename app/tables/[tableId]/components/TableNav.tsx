import { useState } from 'react'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/navigation'
import DepositDialog from './DepositDialog'
import { Button, ButtonLink } from '@/components'
import { useStore } from '@/stores'

export const TableNav = observer(function TableNav() {
  const router = useRouter()
  const [depositDialogOpen, setDepositDialogOpen] = useState(false)
  const [joiningTable, setJoiningTable] = useState(false)
  const [leavingTable, setLeavingTable] = useState(false)
  const [changingStatus, setChangingStatus] = useState(false)
  const { tableStore, sessionStore, tableChannel } = useStore()
  const currentPlayer = tableStore.currentPlayer

  async function onJoinTable() {
    setJoiningTable(true)
    try {
      await tableChannel.joinTable()
      setDepositDialogOpen(true)
      setJoiningTable(false)
    } catch (error: any) {
      window.alert(error.message)
      setJoiningTable(false)
    }
  }

  async function onLeaveTable() {
    if (window.confirm('Are you sure?')) {
      try {
        setLeavingTable(true)
        await tableChannel.leaveTable()
        router.push('/')
      } catch (error: any) {
        window.alert(error.message)
        setLeavingTable(false)
      }
    }
  }

  async function onChangeStatus(status: Hoshi.PlayerStatus) {
    try {
      setChangingStatus(true)
      await tableChannel.updateStatus(status)
      setChangingStatus(false)
    } catch (error: any) {
      window.alert(error.message)
      setChangingStatus(false)
    }
  }

  async function onDeposit(amount: number) {
    try {
      setDepositDialogOpen(false)
      await tableChannel.deposit(amount)
    } catch (error: any) {
      window.alert(error.message)
    }
  }

  return (
    <>
      <nav className="py-2 px-4 border-b border-gray-600 bg-gray-800">
        <div className="container mx-auto flex">
          {currentPlayer && (
            <>
              <Button
                onClick={() => {
                  setDepositDialogOpen(true)
                }}
                className="mr-2"
              >
                Add Chips
              </Button>
              <Button
                onClick={onLeaveTable}
                disabled={leavingTable}
                className="mr-2"
              >
                Leave Table
              </Button>
              {currentPlayer.status === 'inactive' && (
                <Button
                  onClick={() => {
                    onChangeStatus('active')
                  }}
                  disabled={changingStatus}
                >
                  Play Next Hand
                </Button>
              )}
              {currentPlayer.status === 'active' && (
                <Button
                  onClick={() => {
                    onChangeStatus('inactive')
                  }}
                  disabled={changingStatus}
                >
                  Sit Out Next Hand
                </Button>
              )}
            </>
          )}
          {tableStore.canJoin && (
            <Button onClick={onJoinTable} disabled={joiningTable}>
              Join Table
            </Button>
          )}
          {!sessionStore.user && (
            <div className="flex flex-1 justify-end">
              <ButtonLink href="/login" className="mr-2">
                Login
              </ButtonLink>
              <ButtonLink href="/signup">Sign Up</ButtonLink>
            </div>
          )}
        </div>
      </nav>
      <DepositDialog
        isOpen={depositDialogOpen}
        onClose={() => {
          setDepositDialogOpen(false)
        }}
        onRequestDeposit={onDeposit}
      />
    </>
  )
})
