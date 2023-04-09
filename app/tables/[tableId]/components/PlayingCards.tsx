import {
  useTransition,
  animated,
  config,
  type SpringValue
} from '@react-spring/web'
import { Card } from '@/models'

// traditional card dimensions in inches
const CARD_WIDTH_INCHES = 2.5
const CARD_HEIGHT_INCHES = 3.5
const CARD_ASPECT_RATIO = CARD_WIDTH_INCHES / CARD_HEIGHT_INCHES
const CARD_HEIGHT = 130
const CARD_WIDTH = CARD_ASPECT_RATIO * CARD_HEIGHT

export function PlayingCard({
  card,
  style = {}
}: {
  card: Card
  style?: Record<string, SpringValue<number>>
}) {
  return (
    <animated.div
      className={`bg-gray-400 text-gray-900 rounded-sm`}
      style={{ width: CARD_WIDTH, height: CARD_HEIGHT, ...style }}
      data-testid={card.isFaceup() ? `${card.rank}-${card.suit}` : 'facedown'}
    >
      {card.isFaceup() && (
        <>
          <span>
            {card.suit === 'spade' && '♠️'}
            {card.suit === 'club' && '♣️'}
            {card.suit === 'heart' && '♥️'}
            {card.suit === 'diamond' && '♦️'}
          </span>
          <span> {card.rank}</span>
        </>
      )}
    </animated.div>
  )
}

export function PlayingCards({ cards = [] }: { cards: Card[] | undefined }) {
  const transitions = useTransition(cards, {
    from: (card) => {
      if (card.isFaceup()) {
        return { opacity: 0, y: 50, scaleX: 1 }
      }
      return { opacity: 0, y: 50, scaleX: -1 }
    },
    enter: (card) => {
      if (card.isFaceup()) {
        return { opacity: 1, y: 0, scaleX: 1 }
      }
      return { opacity: 1, y: 0, scaleX: -1 }
    },
    update: (card) => {
      if (card.isFaceup()) {
        return { scaleX: 1 }
      }
    },
    leave: { opacity: 0, y: 50 },
    keys: (card) => card.key,
    config: config.stiff
  })

  return transitions((style, card) => {
    if (card) {
      return <PlayingCard card={card} style={style} />
    }
  })
}
