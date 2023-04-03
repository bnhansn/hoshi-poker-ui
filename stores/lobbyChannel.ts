import { makeAutoObservable } from 'mobx'
import { Channel } from 'phoenix'
import { Table } from '@/models'
import { ApiService } from '@/services'
import { RootStore } from '@/stores/root'
import { logger } from '@/utils/logger'

export class LobbyChannel {
  channel: Channel | undefined
  root: RootStore

  constructor(api: ApiService, rootStore: RootStore) {
    this.root = rootStore
    makeAutoObservable(this, { root: false })
  }

  connect() {
    const socket = this.root.websocketStore.connect()
    const channel = socket.channel('lobby')

    channel
      .join()
      .receive('ok', (event: { tables: Array<Hoshi.Table> }) => {
        const tables = event.tables.map((t) => new Table(t))
        this.root.tableListStore.setTables(tables)
      })
      .receive('error', (error) => {
        logger.error(error)
      })

    channel.on('table_started', (table: Hoshi.Table) => {
      this.root.tableListStore.addTable(new Table(table))
    })

    channel.on('table_stopped', ({ table_id }: { table_id: string }) => {
      this.root.tableListStore.removeTable(table_id)
    })

    channel.on('player_joined_table', (table: Hoshi.Table) => {
      this.root.tableListStore.updateTable(new Table(table))
    })

    channel.on('player_left_table', (table: Hoshi.Table) => {
      this.root.tableListStore.updateTable(new Table(table))
    })

    channel.on('player_changed_status', (table: Hoshi.Table) => {
      this.root.tableListStore.updateTable(new Table(table))
    })
  }

  disconnect() {
    if (this.channel) {
      this.channel.leave()
      this.channel = undefined
    }
  }
}
