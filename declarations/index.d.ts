declare namespace Hoshi {
  type CardRank =
    | 'ace'
    | 'king'
    | 'queen'
    | 'jack'
    | '10'
    | '9'
    | '8'
    | '7'
    | '6'
    | '5'
    | '4'
    | '3'
    | '2'
    | '1'

  type CardSuit = 'spade' | 'club' | 'heart' | 'diamond'

  interface Card {
    rank: CardRank
    suit: CardSuit
  }

  interface Message {
    id: string
    inserted_at: string
    player_id: number
    text: string
    ref: string
  }

  type PlayerStatus = 'active' | 'inactive'

  interface Player {
    id: number
    username: string
    status: PlayerState
    chips: number
  }

  interface Hand {
    all_in: boolean
    folded: boolean
    hole_cards: [Card | 'facedown', Card | 'facedown']
    player_id: number
    display_rank: string | null
    pending_bet: number
  }

  type GameRound = 'preflop' | 'flop' | 'turn' | 'river' | null

  interface Game {
    board: Array<Card>
    hands: Array<Hand>
    pots: Array<number>
    rake: number
    round: GameRound
    waiting_on_player_id: number | null
  }

  interface Table {
    id: string
    blinds: {
      big: number
      small: number
    }
    button_index: number
    seats: [
      Player | null,
      Player | null,
      Player | null,
      Player | null,
      Player | null,
      Player | null
    ]
  }

  interface TimeBank {
    seconds: number
  }

  interface User {
    id: number
    username: string
  }
}
