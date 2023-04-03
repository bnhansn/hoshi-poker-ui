import { Channel } from 'phoenix'

export interface EventBinding {
  event: string
  callback: (payload?: unknown) => void | Promise<void>
}

export class MockPush {
  recHooks: Array<{
    status: string
    callback: (payload?: unknown) => void
  }> = []
  payload: any

  constructor(payload: any = {}) {
    this.payload = payload
  }

  receive(status: string, callback: (payload?: unknown) => void) {
    this.recHooks.push({ status, callback })
    return this
  }

  send() {
    // noop
  }

  resend() {
    // noop
  }

  trigger(status: string, response?: unknown) {
    this.recHooks
      .filter((h) => h.status === status)
      .forEach((h) => h.callback(response))
  }
}

/**
 * Mocks the Phoenix Channel 'join' method, so tests can simulate joining a
 * channel and receiving a reply.
 *
 * @example
 * ```
 * let joinEvents = []
 * mockChannelJoin(joinEvents)
 * joinEvents.shift()?.trigger('ok', { foo: 'bar' })
 * ```
 */
export function mockChannelJoin(joinEvents: Array<MockPush>) {
  jest.spyOn(Channel.prototype, 'join').mockImplementation(() => {
    const pushEvent = new MockPush()
    joinEvents.push(pushEvent)
    return pushEvent
  })
}

/**
 * Mocks the Phoenix Channel 'push' method so tests can simulate receiving a
 * reply from a message pushed to a channel.
 *
 * @example
 * ```
 * let pushEvents = []
 * mockChannelJoin(pushEvents)
 * pushEvents.shift()?.trigger('ok', { foo: 'bar' })
 * ```
 */
export function mockChannelPush(pushEvents: Array<MockPush>) {
  jest.spyOn(Channel.prototype, 'push').mockImplementation((event, payload) => {
    const pushEvent = new MockPush(payload)
    pushEvents.push(pushEvent)
    return pushEvent
  })
}

/**
 * Mocks the Phoenix Channel 'on' method, adding event bindings to the map so
 * tests can trigger the callbacks to simulate receiving a WebSocket message.
 *
 * @example
 * ```
 * let eventBindings = new Map()
 * mockChannelJoin(eventBindings)
 * eventBindings.get('my_event')?.callback({ foo: 'bar' })
 * ```
 */
export function mockChannelEvents(eventBindings: Map<string, EventBinding>) {
  jest
    .spyOn(Channel.prototype, 'on')
    .mockImplementation(
      (event: string, callback: (response?: unknown) => void) => {
        eventBindings.set(event, { event, callback })
        return eventBindings.size
      }
    )
}
