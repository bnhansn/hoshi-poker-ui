import { ApiService } from './api'
import { User } from '@/models'

export class UserApiService {
  api: ApiService

  constructor(api: ApiService) {
    this.api = api
  }

  async getCurrentUser() {
    const response = await this.api.get<Hoshi.User>('/me')
    return new User(response.data)
  }

  async login(data: { username: string; password: string }) {
    const response = await this.api.post<{ user: Hoshi.User; token: string }>(
      '/sessions',
      data
    )
    return {
      user: new User(response.data.user),
      token: response.data.token
    }
  }

  async register(data: { username: string; password: string }) {
    const response = await this.api.post<{ user: Hoshi.User; token: string }>(
      '/register',
      data
    )
    return {
      user: new User(response.data.user),
      token: response.data.token
    }
  }
}
