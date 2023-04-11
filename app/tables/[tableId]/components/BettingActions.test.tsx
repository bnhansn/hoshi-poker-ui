import { act, screen } from '@testing-library/react'
import GET_CURRENT_USER_SUCCESS from '../fixtures/GET_CURRENT_USER_SUCCESS.json'
import HANDS_DEALT from '../fixtures/HANDS_DEALT.json'
import JOIN_TABLE_CHANNEL_REPLY from '../fixtures/JOIN_TABLE_CHANNEL_REPLY.json'
import PLAYER_CALLED from '../fixtures/PLAYER_CALLED.json'
import { BettingActions } from './BettingActions'
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
  mockChannelEvents(eventBindings)
  mockChannelPush(pushEvents)
})

function BettingActionsWithChannel() {
  useTableChannel('table-id')
  return <BettingActions />
}

describe('BettingActions', () => {
  test('when player is first to act, they can fold, call, or raise', async () => {
    const { user } = render(<BettingActionsWithChannel />, {
      wrapper: TestWrapper,
      mocks: [['GET', '/me', GET_CURRENT_USER_SUCCESS]]
    })

    act(() => {
      joinEvents.shift()?.trigger('ok', JOIN_TABLE_CHANNEL_REPLY)
    })

    await act(async () => {
      await eventBindings.get('hands_dealt')?.callback(HANDS_DEALT)
    })

    expect(screen.getByText(/fold/i)).toBeInTheDocument()
    expect(screen.getByText(/call 10/i)).toBeInTheDocument()
    expect(screen.getByText(/raise 40/i)).toBeInTheDocument()

    await user.click(screen.getByText(/call/i))

    act(() => {
      pushEvents.shift()?.trigger('ok')
    })

    await act(async () => {
      await eventBindings.get('call')?.callback(PLAYER_CALLED)
    })

    expect(screen.queryByText(/fold/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/call/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/raise/i)).not.toBeInTheDocument()
  })
})
