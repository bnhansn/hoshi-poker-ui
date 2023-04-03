import { v4 as uuidv4 } from 'uuid'

export class Message {
  id: string
  insertedAt: string
  playerId: number
  ref: string
  text: string

  constructor(attrs: Partial<Hoshi.Message> & { text: string }) {
    const id = attrs.id ?? uuidv4()

    this.id = id
    this.insertedAt = attrs.inserted_at ?? new Date().toISOString()
    this.playerId = attrs.player_id ?? 0
    this.ref = attrs.ref ?? id
    this.text = attrs.text
  }
}
