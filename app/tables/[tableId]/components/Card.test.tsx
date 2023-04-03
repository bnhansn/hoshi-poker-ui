import { render, screen } from '@testing-library/react'
import { Card } from './Card'

test('if card is faceup, renders suit and rank', async () => {
  const { rerender } = render(<Card card={{ rank: '2', suit: 'spade' }} />)

  let card = screen.getByTestId('2-spade')
  expect(card).toHaveTextContent(/♠️/i)
  expect(card).toHaveTextContent(/2/i)

  rerender(<Card card={{ rank: '8', suit: 'club' }} />)

  card = screen.getByTestId('8-club')
  expect(card).toHaveTextContent(/♣️/i)
  expect(card).toHaveTextContent(/8/i)

  rerender(<Card card={{ rank: 'jack', suit: 'heart' }} />)

  card = screen.getByTestId('jack-heart')
  expect(card).toHaveTextContent(/♥️/i)
  expect(card).toHaveTextContent(/jack/i)

  rerender(<Card card={{ rank: 'ace', suit: 'diamond' }} />)

  card = screen.getByTestId('ace-diamond')
  expect(card).toHaveTextContent(/♦️/i)
  expect(card).toHaveTextContent(/ace/i)
})

test('if card is facedown, renders blank card', async () => {
  render(<Card card="facedown" />)

  const card = screen.getByTestId('facedown')
  expect(card).not.toHaveTextContent(/♠️/i)
  expect(card).not.toHaveTextContent(/♣️/i)
  expect(card).not.toHaveTextContent(/♥️/i)
  expect(card).not.toHaveTextContent(/♦️/i)
})
