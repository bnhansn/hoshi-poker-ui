import { render, screen } from '@testing-library/react'
import { PlayingCard, PlayingCards } from './PlayingCards'
import { Card } from '@/models'

describe('PlayingCard', () => {
  test('if card is faceup, renders suit and rank', async () => {
    const { rerender } = render(
      <PlayingCard card={new Card({ rank: '2', suit: 'spade' })} />
    )

    let card = screen.getByTestId('2-spade')
    expect(card).toHaveTextContent(/♠️/i)
    expect(card).toHaveTextContent(/2/i)

    rerender(<PlayingCard card={new Card({ rank: '8', suit: 'club' })} />)

    card = screen.getByTestId('8-club')
    expect(card).toHaveTextContent(/♣️/i)
    expect(card).toHaveTextContent(/8/i)

    rerender(<PlayingCard card={new Card({ rank: 'jack', suit: 'heart' })} />)

    card = screen.getByTestId('jack-heart')
    expect(card).toHaveTextContent(/♥️/i)
    expect(card).toHaveTextContent(/jack/i)

    rerender(<PlayingCard card={new Card({ rank: 'ace', suit: 'diamond' })} />)

    card = screen.getByTestId('ace-diamond')
    expect(card).toHaveTextContent(/♦️/i)
    expect(card).toHaveTextContent(/ace/i)
  })

  test('if card is facedown, renders blank card', async () => {
    render(<PlayingCard card={new Card('facedown')} />)

    const card = screen.getByTestId('facedown')
    expect(card).not.toHaveTextContent(/♠️/i)
    expect(card).not.toHaveTextContent(/♣️/i)
    expect(card).not.toHaveTextContent(/♥️/i)
    expect(card).not.toHaveTextContent(/♦️/i)
  })
})

describe('PlayingCards', () => {
  test('renders cards', async () => {
    render(
      <PlayingCards
        cards={[
          new Card({ rank: 'ace', suit: 'spade' }, 0),
          new Card({ rank: 'king', suit: 'heart' }, 1)
        ]}
      />
    )

    expect(screen.getByTestId('ace-spade')).toBeInTheDocument()
    expect(screen.getByTestId('king-heart')).toBeInTheDocument()
  })
})
