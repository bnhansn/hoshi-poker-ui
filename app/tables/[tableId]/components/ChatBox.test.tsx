import { act, screen } from '@testing-library/react'
import JOIN_TABLE_CHANNEL_REPLY from '../fixtures/JOIN_TABLE_CHANNEL_REPLY.json'
import MESSAGE_CREATED from '../fixtures/MESSAGE_CREATED.json'
import { ChatBox } from './ChatBox'
import { useTableChannel } from '@/hooks/useTableChannel'
import {
  EventBinding,
  mockChannelEvents,
  mockChannelJoin,
  mockChannelPush,
  MockPush,
  render,
  TestWrapper
} from '@/test'

let joinEvents: Array<MockPush> = []
let pushEvents: Array<MockPush> = []
let eventBindings: Map<string, EventBinding> = new Map()

beforeEach(() => {
  joinEvents = []
  pushEvents = []
  eventBindings = new Map()
  mockChannelJoin(joinEvents)
  mockChannelPush(pushEvents)
  mockChannelEvents(eventBindings)
})

function ChatBoxWithChannel() {
  useTableChannel('table-id')
  return <ChatBox />
}

test('shows list of messages', async () => {
  render(<ChatBoxWithChannel />, { wrapper: TestWrapper })

  act(() => {
    joinEvents.shift()?.trigger('ok', JOIN_TABLE_CHANNEL_REPLY)
  })

  expect(screen.getAllByText(/Player 2 wins pot/)).toHaveLength(2)
})

test('adds message to ChatBox on message_created', async () => {
  render(<ChatBoxWithChannel />, { wrapper: TestWrapper })

  act(() => {
    joinEvents.shift()?.trigger('ok', JOIN_TABLE_CHANNEL_REPLY)
  })

  expect(screen.queryByText(/player 1:/i)).not.toBeInTheDocument()

  act(() => {
    eventBindings.get('message_created')?.callback(MESSAGE_CREATED)
  })

  expect(screen.getByText(/player 1:/i)).toBeInTheDocument()
  expect(screen.getByText(/hello world/i)).toBeInTheDocument()
})

test('can send a message', async () => {
  const { user } = render(<ChatBoxWithChannel />, { wrapper: TestWrapper })

  act(() => {
    joinEvents.shift()?.trigger('ok', JOIN_TABLE_CHANNEL_REPLY)
  })

  expect(screen.getAllByText(/dealer:/)).toHaveLength(2)
  expect(screen.queryByText(/greetings/i)).not.toBeInTheDocument()

  const input = screen.getByPlaceholderText(/send a message/i)
  await user.type(input, 'greetings')
  await user.click(screen.getByRole('button', { name: /send/i }))

  const messageRef = pushEvents[0].payload.ref

  act(() => {
    pushEvents.shift()?.trigger('ok')
  })

  // Message should already be in list from optimistic client insert before
  // WebSocket reply is received
  expect(screen.getByText(/greetings/i)).toBeInTheDocument()
  expect(screen.getAllByText(/greetings/)).toHaveLength(1)

  await act(async () => {
    await eventBindings.get('message_created')?.callback({
      id: '1dca6dcc-db51-4a58-bffb-901afc168aee',
      inserted_at: '2023-03-27T02:05:56.882Z',
      player_id: 1,
      text: 'greetings',
      ref: messageRef
    })
  })

  // The WebSocket message should update the message with the same ref in the
  // store instead of adding a new one to the list.
  expect(screen.getAllByText(/greetings/i)).toHaveLength(1)
})
