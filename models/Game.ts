export class Game {
  board: Array<Hoshi.Card>
  hands: Array<Hoshi.Hand>
  pots: Array<number>
  rake: number
  round: Hoshi.GameRound
  waitingOnPlayerId: number | null

  constructor(attrs: Hoshi.Game) {
    this.board = attrs.board
    this.hands = attrs.hands
    this.pots = attrs.pots
    this.rake = attrs.rake
    this.round = attrs.round
    this.waitingOnPlayerId = attrs.waiting_on_player_id
  }
}
