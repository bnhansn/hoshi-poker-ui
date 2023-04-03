import { act, screen, within } from '@testing-library/react'
import JOIN_LOBBY_CHANNEL_REPLY from './fixtures/JOIN_LOBBY_CHANNEL_REPLY.json'
import PLAYER_JOINED_TABLE from './fixtures/PLAYER_JOINED_TABLE.json'
import PLAYER_LEFT_TABLE from './fixtures/PLAYER_LEFT_TABLE.json'
import TABLE_STARTED from './fixtures/TABLE_STARTED.json'
import Page from './page'
import {
  EventBinding,
  mockChannelEvents,
  mockChannelJoin,
  MockPush,
  render,
  TestWrapper
} from '@/test'

let joinEvents: Array<MockPush> = []
let eventBindings: Map<string, EventBinding> = new Map()

beforeEach(() => {
  joinEvents = []
  eventBindings = new Map()
  mockChannelJoin(joinEvents)
  mockChannelEvents(eventBindings)
})

test('shows a list of tables with a link to table page', async () => {
  const { user, router } = render(<Page />, {
    wrapper: TestWrapper
  })

  act(() => {
    joinEvents.shift()?.trigger('ok', JOIN_LOBBY_CHANNEL_REPLY)
  })

  // Stakes
  expect(screen.getAllByText(/10\/20/)).toHaveLength(2)
  expect(screen.getAllByText(/25\/50/)).toHaveLength(1)

  // Players
  expect(screen.getAllByText(/2\/6/)).toHaveLength(1)
  expect(screen.getAllByText(/0\/6/)).toHaveLength(2)

  await user.click(screen.getByText('6049d72b'))

  expect(router.asPath).toEqual('/tables/6049d72b')
})

test('adds table to the list when a table is started', async () => {
  render(<Page />, { wrapper: TestWrapper })

  act(() => {
    joinEvents.shift()?.trigger('ok', JOIN_LOBBY_CHANNEL_REPLY)
  })

  expect(screen.getAllByText(/10\/20/)).toHaveLength(2)

  act(() => {
    eventBindings.get('table_started')?.callback(TABLE_STARTED)
  })

  expect(screen.getAllByText(/10\/20/)).toHaveLength(3)
})

test('removes table from the list when a table is stopped', async () => {
  render(<Page />, { wrapper: TestWrapper })

  act(() => {
    joinEvents.shift()?.trigger('ok', JOIN_LOBBY_CHANNEL_REPLY)
  })

  expect(screen.getAllByText(/10\/20/)).toHaveLength(2)

  act(() => {
    eventBindings.get('table_stopped')?.callback({ table_id: '6049d72b' })
  })

  expect(screen.getAllByText(/10\/20/)).toHaveLength(1)

  act(() => {
    eventBindings.get('table_stopped')?.callback({ table_id: '39afd5c0' })
  })

  expect(screen.queryAllByText(/10\/20/)).toHaveLength(0)
})

test('updates player count when player joins & leaves table', async () => {
  render(<Page />, { wrapper: TestWrapper })

  act(() => {
    joinEvents.shift()?.trigger('ok', JOIN_LOBBY_CHANNEL_REPLY)
  })

  expect(
    within(screen.getByTestId('table-39afd5c0')).getByText(/0\/6/)
  ).toBeInTheDocument()

  act(() => {
    eventBindings.get('player_joined_table')?.callback(PLAYER_JOINED_TABLE)
  })

  expect(
    within(screen.getByTestId('table-39afd5c0')).getByText(/1\/6/)
  ).toBeInTheDocument()

  act(() => {
    eventBindings.get('player_left_table')?.callback(PLAYER_LEFT_TABLE)
  })

  expect(
    within(screen.getByTestId('table-39afd5c0')).getByText(/0\/6/)
  ).toBeInTheDocument()
})
