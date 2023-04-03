export class User {
  id: number
  username: string

  constructor(attrs: Hoshi.User) {
    this.id = attrs.id
    this.username = attrs.username
  }
}
