import { SocketConnectOption, ChannelState, ConnectionState } from 'phoenix'

class Channel {
  topic: string
  socket: Socket
  state: ChannelState = 'closed'

  constructor(topic: string, params: any, socket: Socket) {
    this.topic = topic
    this.socket = socket
  }

  join() {
    this.state = 'joined'
    return this
  }

  receive() {
    return this
  }

  on() {
    return this
  }

  push() {
    return this
  }

  leave() {
    this.state = 'leaving'
    this.socket.onLeaveChannel(this.topic)
    this.state = 'closed'
  }
}

class Socket {
  endPoint: string
  params: any
  channels: Channel[] = []
  stateChangeCallbacks: {
    open: (() => void)[]
    close: (() => void)[]
    error: (() => void)[]
    message: (() => void)[]
  } = {
    open: [],
    close: [],
    error: [],
    message: []
  }
  readyState: ConnectionState = 'closed'

  constructor(endPoint: string, opts: Partial<SocketConnectOption> = {}) {
    this.endPoint = endPoint
    this.params = opts.params || {}
  }

  connect() {
    this.onConnOpen()
  }

  disconnect() {
    this.onConnClose()
  }

  onOpen(callback: () => void) {
    this.stateChangeCallbacks.open.push(callback)
  }

  onClose(callback: () => void) {
    this.stateChangeCallbacks.close.push(callback)
  }

  onError(callback: () => void) {
    this.stateChangeCallbacks.error.push(callback)
  }

  onMessage(callback: () => void) {
    this.stateChangeCallbacks.message.push(callback)
  }

  channel(topic: string, chanParams = {}) {
    const channel = new Channel(topic, chanParams, this)
    this.channels.push(channel)
    return channel
  }

  onLeaveChannel(topic: string) {
    this.channels = this.channels.filter((c) => c.topic !== topic)
  }

  onConnOpen() {
    this.readyState = 'open'
    this.stateChangeCallbacks.open.forEach((callback) => callback())
  }

  onConnClose() {
    this.readyState = 'closed'
    this.stateChangeCallbacks.close.forEach((callback) => callback())
  }

  isConnected() {
    return this.readyState == 'open'
  }
}

module.exports = {
  Socket,
  Channel
}
