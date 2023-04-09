import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { TableApiService } from './table'
import { UserApiService } from './user'
import storage from '@/lib/storage'

const ENV = process.env.NODE_ENV ?? 'production'

const endpoints = {
  production: 'https://radiant-ocean-01471.herokuapp.com',
  test: '',
  development: 'http://localhost:4000'
} as const

export class ApiService {
  #client: AxiosInstance
  #token = storage.getItem('token')
  #requestCache: Record<string, Promise<AxiosResponse<any, any>> | undefined> =
    {}
  endpoint = endpoints[ENV]
  wsEndpoint = `${this.endpoint.replace(/^http/, 'ws')}/socket`
  tableService: TableApiService
  userService: UserApiService

  constructor() {
    this.#client = axios.create({
      baseURL: this.endpoint,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      transformRequest: [
        (data, headers) => {
          if (this.#token) {
            headers['Authorization'] = `Bearer ${this.#token}`
          }
          return JSON.stringify(data)
        }
      ]
    })

    this.tableService = new TableApiService(this)
    this.userService = new UserApiService(this)
  }

  get token(): string | null {
    return this.#token
  }

  set token(token: string | null) {
    this.#token = token
    if (token) {
      storage.setItem('token', token)
    } else {
      storage.removeItem('token')
    }
  }

  /**
   * Makes a GET request or returns the existing Promise if there is already a
   * pending request for the same url to prevent duplicate requests.
   */
  async get<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    config?: AxiosRequestConfig<D>
  ): Promise<R> {
    const pendingRequest = this.#requestCache[url] as Promise<R>
    if (pendingRequest) {
      return pendingRequest
    }

    const promise = this.#client.get(url, config).finally(() => {
      delete this.#requestCache[url]
    })

    this.#requestCache[url] = promise
    return promise as Promise<R>
  }

  async post<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>
  ): Promise<R> {
    return this.#client.post(url, data, config)
  }

  async put<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig<D>
  ): Promise<R> {
    return this.#client.put(url, data, config)
  }

  async patch<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig<D>
  ): Promise<R> {
    return this.#client.patch(url, data, config)
  }

  async delete<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    config?: AxiosRequestConfig<D>
  ): Promise<R> {
    return this.#client.delete(url, config)
  }
}
