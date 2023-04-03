import { makeAutoObservable } from 'mobx'
import { Channel } from 'phoenix'
import { Game, Message, Table } from '@/models'
import { ApiService } from '@/services'
import { RootStore } from '@/stores/root'
import { logger } from '@/utils/logger'

export class TableChannel {
  channel: Channel | undefined
  root: RootStore

  constructor(api: ApiService, rootStore: RootStore) {
    this.root = rootStore
    makeAutoObservable(this, { root: false })
  }

  connect(tableId: string) {
    const socket = this.root.websocketStore.connect()
    const channel = socket.channel(`table:${tableId}`)

    channel
      .join()
      .receive(
        'ok',
        (event: {
          table: Hoshi.Table
          game: Hoshi.Game
          messages: Array<Hoshi.Message>
          timeBank: Hoshi.TimeBank
        }) => {
          this.channel = channel
          this.root.chatStore.messagesLoaded(
            event.messages.map((m) => new Message(m))
          )
          const table = new Table(event.table)
          this.root.gameStore.gameLoaded(
            new Game(event.game),
            table,
            event.timeBank
          )
          this.root.tableStore.tableLoaded(table)
        }
      )
      .receive('error', (error) => {
        logger.error(error)
      })

    channel.on('message_created', (message: Hoshi.Message) => {
      this.root.chatStore.addMessage(new Message(message))
    })

    channel.on('player_joined_table', (table: Hoshi.Table) => {
      this.root.tableStore.updateSeats(new Table(table))
    })

    channel.on('player_left_table', (table: Hoshi.Table) => {
      this.root.tableStore.updateSeats(new Table(table))
    })

    channel.on('player_changed_status', (table: Hoshi.Table) => {
      this.root.tableStore.updateSeats(new Table(table))
    })

    channel.on('player_deposited', (table: Hoshi.Table) => {
      this.root.tableStore.updateSeats(new Table(table))
    })

    channel.on(
      'hands_dealt',
      (event: { table: Hoshi.Table; game: Hoshi.Game }) => {
        this.root.gameStore.handsDealt(new Game(event.game))
        this.root.tableStore.handsDealt(new Table(event.table))
      }
    )

    channel.on('flop_dealt', (event: { game: Hoshi.Game }) => {
      this.root.gameStore.roundDealt(new Game(event.game))
    })

    channel.on('turn_dealt', (event: { game: Hoshi.Game }) => {
      this.root.gameStore.roundDealt(new Game(event.game))
    })

    channel.on('river_dealt', (event: { game: Hoshi.Game }) => {
      this.root.gameStore.roundDealt(new Game(event.game))
    })

    channel.on(
      'fold',
      (event: { table: Hoshi.Table; game: Hoshi.Game; player_id: number }) => {
        this.root.gameStore.playerFolded(new Game(event.game))
      }
    )

    channel.on(
      'check',
      (event: { table: Hoshi.Table; game: Hoshi.Game; player_id: number }) => {
        this.root.gameStore.playerChecked(new Game(event.game))
      }
    )

    channel.on(
      'call',
      (event: { table: Hoshi.Table; game: Hoshi.Game; player_id: number }) => {
        this.root.gameStore.playerCalledOrRaised(new Game(event.game))
        this.root.tableStore.updateSeats(new Table(event.table))
      }
    )

    channel.on(
      'raise',
      (event: { table: Hoshi.Table; game: Hoshi.Game; player_id: number }) => {
        this.root.gameStore.playerCalledOrRaised(new Game(event.game))
        this.root.tableStore.updateSeats(new Table(event.table))
      }
    )

    channel.on(
      'game_ended',
      (event: { table: Hoshi.Table; game: Hoshi.Game }) => {
        this.root.gameStore.gameEnded(new Game(event.game))
        this.root.tableStore.updateSeats(new Table(event.table))
      }
    )

    channel.on('time_bank_started', (timeBank: Hoshi.TimeBank) => {
      this.root.gameStore.timeBankCountdown(timeBank)
    })

    channel.on('time_bank_countdown', (timeBank: Hoshi.TimeBank) => {
      this.root.gameStore.timeBankCountdown(timeBank)
    })

    channel.on('time_bank_expired', () => {
      this.root.gameStore.timeBankExpired()
    })

    channel.on('button_moved', (table: Hoshi.Table) => {
      this.root.gameStore.resetGame()
      this.root.tableStore.buttonMoved(new Table(table))
    })
  }

  disconnect() {
    if (this.channel) {
      this.channel.leave()
      this.channel = undefined
      this.root.tableStore.reset()
    }
  }

  joinTable() {
    return new Promise((resolve, reject) => {
      if (this.channel) {
        this.channel
          .push('join_table', {})
          .receive('ok', resolve)
          .receive('error', reject)
      } else {
        reject()
      }
    })
  }

  leaveTable() {
    return new Promise((resolve, reject) => {
      if (this.channel) {
        this.channel
          .push('leave_table', {})
          .receive('ok', resolve)
          .receive('error', reject)
      } else {
        reject()
      }
    })
  }

  updateStatus(status: Hoshi.PlayerStatus) {
    return new Promise((resolve, reject) => {
      if (this.channel) {
        this.channel
          .push('update_status', { status })
          .receive('ok', resolve)
          .receive('error', reject)
      } else {
        reject()
      }
    })
  }

  deposit(amount: number) {
    return new Promise((resolve, reject) => {
      if (this.channel) {
        this.channel
          .push('deposit', { amount })
          .receive('ok', resolve)
          .receive('error', reject)
      } else {
        reject()
      }
    })
  }

  sendMessage(text: string) {
    return new Promise((resolve, reject) => {
      if (this.channel) {
        const userId = this.root.sessionStore.userId
        const message = new Message({ text, player_id: userId })
        this.root.chatStore.addMessage(message)
        this.channel
          .push('create_message', { text: message.text, ref: message.ref })
          .receive('ok', resolve)
          .receive('error', reject)
      } else {
        reject()
      }
    })
  }

  fold() {
    return new Promise((resolve, reject) => {
      if (this.channel) {
        this.channel
          .push('fold', {})
          .receive('ok', resolve)
          .receive('error', reject)
      } else {
        reject()
      }
    })
  }

  check() {
    return new Promise((resolve, reject) => {
      if (this.channel) {
        this.channel
          .push('check', {})
          .receive('ok', resolve)
          .receive('error', reject)
      } else {
        reject()
      }
    })
  }

  call() {
    return new Promise((resolve, reject) => {
      if (this.channel) {
        this.channel
          .push('call', {})
          .receive('ok', resolve)
          .receive('error', reject)
      } else {
        reject()
      }
    })
  }

  raise(amount: number) {
    return new Promise((resolve, reject) => {
      if (this.channel) {
        this.channel
          .push('raise', { amount })
          .receive('ok', resolve)
          .receive('error', reject)
      } else {
        reject()
      }
    })
  }
}
