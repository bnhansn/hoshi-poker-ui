import { makeAutoObservable, runInAction } from 'mobx'
import { Socket } from 'phoenix'
import { logger } from '@/lib/logger'
import { ApiService } from '@/services'
import { RootStore } from '@/stores/root'

export class WebSocketStore {
  api: ApiService
  isConnected = false
  socket: Socket | undefined

  constructor(api: ApiService, _rootStore: RootStore) {
    this.api = api
    makeAutoObservable(this)
  }

  connect() {
    if (this.socket) {
      return this.socket
    }

    const params: { token?: string } = {}
    const token = this.api.token
    if (token) {
      params.token = token
    }

    this.socket = new Socket(this.api.wsEndpoint, { params })
    this.socket.connect()

    this.socket.onOpen(() => {
      runInAction(() => {
        this.isConnected = true
      })
    })

    this.socket.onClose(() => {
      runInAction(() => {
        this.isConnected = false
      })
    })

    this.socket.onError((error) => {
      logger.error(error)
    })

    return this.socket
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect()
      this.socket = undefined
    }
  }

  reconnect() {
    this.disconnect()
    this.connect()
  }
}
