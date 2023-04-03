import { Player } from './Player'

export class Table {
  id: string
  blinds: {
    big: number
    small: number
  }
  buttonIndex: number
  seats: Array<Player | null>

  constructor(attrs: Hoshi.Table) {
    this.id = attrs.id
    this.blinds = attrs.blinds
    this.buttonIndex = attrs.button_index
    this.seats = attrs.seats.map((p) => (p ? new Player(p) : null))
  }
}
