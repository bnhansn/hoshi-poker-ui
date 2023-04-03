export class Player {
  id: number
  chips: number
  status: Hoshi.PlayerStatus
  username: string

  constructor(attrs: Hoshi.Player) {
    this.id = attrs.id
    this.chips = attrs.chips
    this.status = attrs.status
    this.username = attrs.username
  }
}
