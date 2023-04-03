import { makeAutoObservable } from 'mobx'
import { Message } from '@/models'
import { ApiService } from '@/services'
import { RootStore } from '@/stores/root'

export class ChatStore {
  messages: Array<Message> = []
  root: RootStore

  constructor(api: ApiService, rootStore: RootStore) {
    this.root = rootStore
    makeAutoObservable(this, { root: false })
  }

  messagesLoaded(messages: Array<Message>) {
    this.messages = messages.slice().reverse()
  }

  addMessage(message: Message) {
    const index = this.messages.findIndex((m) => m.ref === message.ref)

    if (index === -1) {
      this.messages.push(message)
    } else {
      this.messages[index] = message
    }
  }
}
