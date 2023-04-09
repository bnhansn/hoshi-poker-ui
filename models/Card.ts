export class Card {
  rank: Hoshi.CardRank | undefined
  suit: Hoshi.CardSuit | undefined
  key: string

  constructor(attrs: Hoshi.Card | 'facedown', idx = 0) {
    // For react-spring transitions to work, the card must have the same key
    // when it switches from 'facedown' to faceup. Therefore the index of the
    // card on the board or in a hand is used as the key because it is
    // consistent.
    this.key = idx.toString()
    if (attrs != 'facedown') {
      this.rank = attrs.rank
      this.suit = attrs.suit
    }
  }

  isFaceup(): this is { rank: Hoshi.CardRank; suit: Hoshi.CardSuit } {
    return this.rank != undefined && this.suit != undefined
  }
}
