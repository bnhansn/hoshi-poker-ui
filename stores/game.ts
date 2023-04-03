import { makeAutoObservable } from 'mobx'
import { Game, Table } from '@/models'
import { ApiService } from '@/services'
import { RootStore } from '@/stores/root'

export class GameStore {
  blinds: Table['blinds'] = { big: 0, small: 0 }
  board: Game['board'] = []
  hands: Game['hands'] = []
  pots: Game['pots'] = []
  rake: Game['rake'] = 0
  round: Game['round'] = null
  timeBank: { seconds: number } | null = null
  waitingOnPlayerId: number | null = null
  root: RootStore

  constructor(api: ApiService, rootStore: RootStore) {
    this.root = rootStore
    makeAutoObservable(this)
  }

  gameLoaded(game: Game, table: Table, timeBank: Hoshi.TimeBank) {
    this.blinds = table.blinds
    this.board = game.board
    this.hands = game.hands
    this.pots = game.pots
    this.rake = game.rake
    this.round = game.round
    this.waitingOnPlayerId = game.waitingOnPlayerId
    this.timeBank = timeBank
  }

  resetGame() {
    this.board = []
    this.hands = []
    this.pots = []
    this.rake = 0
    this.round = null
    this.timeBank = null
    this.waitingOnPlayerId = null
  }

  handsDealt(game: Game) {
    this.board = game.board
    this.hands = game.hands
    this.pots = game.pots
    this.round = game.round
    this.waitingOnPlayerId = game.waitingOnPlayerId
  }

  roundDealt(game: Game) {
    this.board = game.board
    this.hands = game.hands
    this.pots = game.pots
    this.round = game.round
  }

  playerChecked(game: Game) {
    this.hands = game.hands
    this.waitingOnPlayerId = game.waitingOnPlayerId
    this.timeBank = null
  }

  playerCalledOrRaised(game: Game) {
    this.hands = game.hands
    this.pots = game.pots
    this.waitingOnPlayerId = game.waitingOnPlayerId
    this.timeBank = null
  }

  playerFolded(game: Game) {
    this.hands = game.hands
    this.waitingOnPlayerId = game.waitingOnPlayerId
    this.timeBank = null
  }

  gameEnded(game: Game) {
    this.hands = game.hands
    this.pots = game.pots
    this.round = game.round
    this.waitingOnPlayerId = null
    this.timeBank = null
  }

  timeBankCountdown(timeBank: { seconds: number }) {
    this.timeBank = timeBank
  }

  timeBankExpired() {
    this.timeBank = null
  }

  get currentPlayerHand() {
    return this.playerHand(this.root.sessionStore.userId)
  }

  playerHand(playerId: number | undefined) {
    if (playerId) {
      return this.hands.find((h) => h.player_id === playerId)
    }
  }

  get highestPendingBet() {
    return Math.max(
      ...Object.values(this.hands).map((hand) => Number(hand.pending_bet))
    )
  }

  get minRaise() {
    const normalMinRaise = Math.max(this.blinds.big, this.highestPendingBet * 2)
    if (this.currentPlayerChips < normalMinRaise) {
      return this.currentPlayerChips
    }
    return normalMinRaise
  }

  get isWaitingOnMe() {
    return (
      !!this.waitingOnPlayerId &&
      this.waitingOnPlayerId === this.root.sessionStore.userId
    )
  }

  get currentPlayerPendingBet() {
    return this.currentPlayerHand?.pending_bet ?? 0
  }

  get currentPlayerChips() {
    return this.root.tableStore.currentPlayerChips
  }

  get amountToCall() {
    if (this.highestPendingBet > this.currentPlayerChips) {
      return this.currentPlayerChips
    }
    return this.highestPendingBet - this.currentPlayerPendingBet
  }

  get canRaise() {
    return this.currentPlayerChips >= this.minRaise
  }

  get canFold() {
    return this.highestPendingBet > this.currentPlayerPendingBet
  }

  get canCheck() {
    return this.currentPlayerPendingBet === this.highestPendingBet
  }

  get canCall() {
    return this.amountToCall > 0 && this.currentPlayerChips >= this.amountToCall
  }

  get currentPotAmount() {
    // First pot is main pot, other side pots are added to the pots list. So the
    // current pot for comparison's sake is the last one in the list because it
    // is the one the player will be adding chips to.
    return this.pots[this.pots.length - 1] || 0
  }

  get halfPotAmount() {
    return Math.floor(this.currentPotAmount / 2)
  }

  get canRaiseHalfPot() {
    return (
      this.halfPotAmount >= this.minRaise &&
      this.currentPlayerChips >= this.halfPotAmount
    )
  }

  get canRaisePotAmount() {
    return (
      this.currentPotAmount >= this.minRaise &&
      this.currentPlayerChips > this.currentPotAmount
    )
  }

  get doublePotAmount() {
    return this.currentPotAmount * 2
  }

  get canRaiseDoublePotAmount() {
    return (
      this.doublePotAmount >= this.minRaise &&
      this.currentPlayerChips >= this.doublePotAmount
    )
  }
}
