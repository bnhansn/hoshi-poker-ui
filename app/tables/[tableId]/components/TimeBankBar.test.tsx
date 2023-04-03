import { render, screen } from '@testing-library/react'
import { TimeBankBar } from './TimeBankBar'

test('with full time bank, returns green full width bar', async () => {
  render(<TimeBankBar seconds={20} />)

  const bar = screen.getByTestId('time-bank-bar')
  expect(bar.style.background).toBe('green')
  expect(bar.style.width).toBe('100%')
})

test('with partial time bank, returns partial width green bar', async () => {
  render(<TimeBankBar seconds={10} />)

  const bar = screen.getByTestId('time-bank-bar')
  expect(bar.style.background).toBe('green')
  expect(bar.style.width).toBe('50%')
})

test('with expiring time bank, returns partial width red bar', async () => {
  render(<TimeBankBar seconds={5} />)

  const bar = screen.getByTestId('time-bank-bar')
  expect(bar.style.background).toBe('red')
  expect(bar.style.width).toBe('25%')
})
