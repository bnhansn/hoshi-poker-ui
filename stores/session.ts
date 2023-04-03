import { makeAutoObservable, runInAction } from 'mobx'
import { User } from '@/models'
import { ApiService } from '@/services'
import { RootStore } from '@/stores/root'
import { logger } from '@/utils/logger'

export class SessionStore {
  api: ApiService
  root: RootStore
  user: User | null = null

  constructor(api: ApiService, rootStore: RootStore) {
    this.api = api
    this.root = rootStore
    makeAutoObservable(this, { root: false })
  }

  async getCurrentUser() {
    try {
      if (this.api.token) {
        const user = await this.api.userService.getCurrentUser()
        runInAction(() => {
          this.user = user
        })
      }
    } catch (error) {
      logger.error(error)
    }
  }

  async login(data: { username: string; password: string }) {
    try {
      const { user, token } = await this.api.userService.login(data)
      runInAction(() => {
        this.user = user
        this.api.token = token
      })
      this.root.websocketStore.reconnect()
    } catch (error) {
      logger.error(error)
      throw error
    }
  }

  async register(data: { username: string; password: string }) {
    try {
      const { user, token } = await this.api.userService.register(data)
      runInAction(() => {
        this.user = user
        this.api.token = token
      })
      this.root.websocketStore.reconnect()
    } catch (error) {
      logger.error(error)
      throw error
    }
  }

  async logout() {
    this.user = null
    this.api.token = null
    window.location.pathname = '/'
  }

  get userId() {
    return this.user?.id
  }
}
