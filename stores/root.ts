import { ApiService } from '@/services'
import { ChatStore } from '@/stores/chat'
import { GameStore } from '@/stores/game'
import { LobbyChannel } from '@/stores/lobbyChannel'
import { SessionStore } from '@/stores/session'
import { TableStore } from '@/stores/table'
import { TableChannel } from '@/stores/tableChannel'
import { TableListStore } from '@/stores/tableList'
import { WebSocketStore } from '@/stores/websocket'

export class RootStore {
  chatStore: ChatStore
  gameStore: GameStore
  lobbyChannel: LobbyChannel
  sessionStore: SessionStore
  tableChannel: TableChannel
  tableListStore: TableListStore
  tableStore: TableStore
  websocketStore: WebSocketStore

  constructor() {
    const api = new ApiService()
    this.chatStore = new ChatStore(api, this)
    this.gameStore = new GameStore(api, this)
    this.lobbyChannel = new LobbyChannel(api, this)
    this.sessionStore = new SessionStore(api, this)
    this.tableChannel = new TableChannel(api, this)
    this.tableListStore = new TableListStore(api, this)
    this.tableStore = new TableStore(api, this)
    this.websocketStore = new WebSocketStore(api, this)
  }
}
