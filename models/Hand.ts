import { makeAutoObservable } from 'mobx'
import { Card } from './Card'

export class Hand {
  allIn: boolean
  folded: boolean
  holeCards: [Card, Card]
  playerId: number
  displayRank: string | null
  pendingBet: number

  constructor(attrs: Hoshi.Hand) {
    this.allIn = attrs.all_in
    this.folded = attrs.folded
    this.holeCards = [
      new Card(attrs.hole_cards[0], 0),
      new Card(attrs.hole_cards[1], 1)
    ]
    this.playerId = attrs.player_id
    this.displayRank = attrs.display_rank
    this.pendingBet = attrs.pending_bet
    makeAutoObservable(this)
  }

  get cards() {
    if (this.folded) {
      return []
    }
    return this.holeCards
  }
}
