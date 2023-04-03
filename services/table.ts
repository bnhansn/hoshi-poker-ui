import { ApiService } from './api'
import { Table } from '@/models'

export class TableApiService {
  api: ApiService

  constructor(api: ApiService) {
    this.api = api
  }

  async startTable() {
    const response = await this.api.post<Hoshi.Table>('/tables')
    return new Table(response.data)
  }

  async stopTable(tableId: string) {
    return await this.api.delete(`/tables/${tableId}`)
  }
}
