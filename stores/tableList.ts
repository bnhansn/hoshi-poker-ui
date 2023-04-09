import { makeAutoObservable } from 'mobx'
import { logger } from '@/lib/logger'
import { Table } from '@/models'
import { ApiService } from '@/services'
import { RootStore } from '@/stores/root'

export class TableListStore {
  api: ApiService
  tables: Array<Table>

  constructor(api: ApiService, _rootStore: RootStore) {
    this.api = api
    this.tables = []
    makeAutoObservable(this)
  }

  setTables(tables: Array<Table>) {
    this.tables = tables
  }

  addTable(table: Table) {
    this.tables.push(table)
  }

  updateTable(table: Table) {
    const index = this.tables.findIndex((t) => t.id === table.id)
    if (index === -1) {
      this.tables.push(table)
    } else {
      this.tables[index] = table
    }
  }

  removeTable(tableId: string) {
    this.tables = this.tables.filter((table) => table.id !== tableId)
  }

  async startTable() {
    try {
      return await this.api.tableService.startTable()
    } catch (error) {
      logger.error(error)
      throw error
    }
  }

  async stopTable(tableId: string) {
    try {
      return await this.api.tableService.stopTable(tableId)
    } catch (error) {
      logger.error(error)
      throw error
    }
  }
}
