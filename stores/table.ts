import { makeAutoObservable } from 'mobx'
import { Player, Table } from '@/models'
import { ApiService } from '@/services'
import { RootStore } from '@/stores/root'

export class TableStore {
  blinds: Table['blinds'] = { big: 0, small: 0 }
  buttonIndex: number | null = null
  root: RootStore
  seats: Array<Player | null> = new Array(6).fill(null)

  constructor(api: ApiService, rootStore: RootStore) {
    this.root = rootStore
    makeAutoObservable(this, { root: false })
  }

  tableLoaded(table: Table) {
    this.blinds = table.blinds
    this.buttonIndex = table.buttonIndex
    this.seats = table.seats
  }

  reset() {
    this.blinds = { big: 0, small: 0 }
    this.buttonIndex = null
    this.seats = new Array(6).fill(null)
  }

  updateSeats(table: Table) {
    this.seats = table.seats
  }

  handsDealt(table: Table) {
    this.buttonIndex = table.buttonIndex
    this.seats = table.seats
  }

  buttonMoved(table: Table) {
    this.buttonIndex = table.buttonIndex
  }

  get isFull() {
    return this.seats.filter(Boolean).length === this.seats.length
  }

  get canJoin() {
    return !!this.root.sessionStore.user && !this.isFull && !this.currentPlayer
  }

  get currentPlayer() {
    const userId = this.root.sessionStore.userId
    if (userId) {
      return this.seats.find((player) => player?.id === userId)
    }
  }

  get currentPlayerSeatIndex() {
    const userId = this.root.sessionStore.userId
    if (userId) {
      return this.seats.findIndex((player) => player?.id === userId)
    }
    return -1
  }

  get currentPlayerChips() {
    return this.currentPlayer?.chips ?? 0
  }
}
