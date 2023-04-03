const TIME_BANK_SECONDS = 20

export function TimeBankBar({ seconds }: { seconds: number }) {
  const color = seconds <= 5 ? 'red' : 'green'
  return (
    <div
      data-testid="time-bank-bar"
      className="h-[4px] absolute top-0 left-0 transition-all"
      style={{
        background: color,
        width: `${Math.floor((seconds / TIME_BANK_SECONDS) * 100)}%`
      }}
    />
  )
}
