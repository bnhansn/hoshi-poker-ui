import { Card } from './Card'
import { Hand } from './Hand'

export class Game {
  board: Array<Card>
  hands: Array<Hand>
  pots: Array<number>
  rake: number
  round: Hoshi.GameRound
  waitingOnPlayerId: number | null

  constructor(attrs: Hoshi.Game) {
    this.board = attrs.board.map((card, idx) => new Card(card, idx))
    this.hands = attrs.hands.map((hand) => new Hand(hand))
    this.pots = attrs.pots
    this.rake = attrs.rake
    this.round = attrs.round
    this.waitingOnPlayerId = attrs.waiting_on_player_id
  }
}
