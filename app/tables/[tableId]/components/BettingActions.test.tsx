import { act, screen } from '@testing-library/react'
import GET_CURRENT_USER_SUCCESS from '../fixtures/GET_CURRENT_USER_SUCCESS.json'
import HANDS_DEALT from '../fixtures/HANDS_DEALT.json'
import { BettingActions } from './BettingActions'
import { useTableChannel } from '@/hooks/useTableChannel'
import { EventBinding, mockChannelEvents, render, TestWrapper } from '@/test'

let eventBindings: Map<string, EventBinding> = new Map()

beforeEach(() => {
  eventBindings = new Map()
  mockChannelEvents(eventBindings)
})

function BettingActionsWithChannel() {
  useTableChannel('table-id')
  return <BettingActions />
}

describe('BettingActions', () => {
  test('when player is first to act, they can fold, call, or raise', async () => {
    render(<BettingActionsWithChannel />, {
      wrapper: TestWrapper,
      mocks: [['GET', '/me', GET_CURRENT_USER_SUCCESS]]
    })

    await act(async () => {
      await eventBindings.get('hands_dealt')?.callback(HANDS_DEALT)
    })

    expect(screen.getByText(/fold/i)).toBeInTheDocument()
    expect(screen.getByText(/call 10/i)).toBeInTheDocument()
    expect(screen.getByText(/raise 40/i)).toBeInTheDocument()
  })
})
