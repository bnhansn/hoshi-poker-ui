import { useEffect, useState } from 'react'
import { cn } from '@/styles/utils'

// traditional card dimensions in inches
const CARD_WIDTH_INCHES = 2.5
const CARD_HEIGHT_INCHES = 3.5
const CARD_ASPECT_RATIO = CARD_WIDTH_INCHES / CARD_HEIGHT_INCHES

const CARD_HEIGHT = 130
const CARD_WIDTH = CARD_ASPECT_RATIO * CARD_HEIGHT

function CardContainer({
  children,
  // isFacedown,
  className,
  ...props
}: {
  children: React.ReactNode
  // isFacedown: boolean
} & React.HTMLAttributes<HTMLDivElement>) {
  // const scaleX = isFacedown ? -1 : 1
  return (
    <div
      className={cn('bg-gray-400 text-gray-900 rounded-sm', className)}
      style={{ width: CARD_WIDTH, height: CARD_HEIGHT }}
      {...props}
    >
      {children}
    </div>
  )
}

function isFaceup(card: Hoshi.Card | 'facedown'): card is Hoshi.Card {
  return card !== 'facedown'
}

export const Card = function Card({
  card,
  ...props
}: {
  card: Hoshi.Card | 'facedown'
}) {
  const [isFacedown, setIsFacedown] = useState(!isFaceup(card))

  useEffect(() => {
    if (isFacedown && isFaceup(card)) {
      // Card was facedown and now is revealed
      setIsFacedown(false)
    }
  }, [isFacedown, card])

  return (
    <CardContainer
      data-testid={
        card === 'facedown' ? 'facedown' : `${card.rank}-${card.suit}`
      }
      {...props}
    >
      {isFaceup(card) && (
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
    </CardContainer>
  )
}
