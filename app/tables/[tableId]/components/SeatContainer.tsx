import { cn } from '@/lib/utils'

export function SeatContainer({
  children,
  ...props
}: {
  children: React.ReactNode
}) {
  return (
    <div
      className={cn(
        'absolute w-[215px] h-[215px] border border-gray-600 bg-gray-800',
        '[&:nth-of-type(1)]:left-1/2 [&:nth-of-type(1)]:bottom-0 [&:nth-of-type(1)]:-translate-x-1/2 [&:nth-of-type(1)]:translate-y-1/2',
        '[&:nth-of-type(2)]:left-0 [&:nth-of-type(2)]:bottom-0',
        '[&:nth-of-type(3)]:top-0 [&:nth-of-type(3)]:left-0',
        '[&:nth-of-type(4)]:top-0 [&:nth-of-type(4)]:left-1/2 [&:nth-of-type(4)]:-translate-x-1/2 [&:nth-of-type(4)]:-translate-y-1/2',
        '[&:nth-of-type(5)]:top-0 [&:nth-of-type(5)]:right-0',
        '[&:nth-of-type(6)]:bottom-0 [&:nth-of-type(6)]:right-0'
      )}
      {...props}
    >
      {children}
    </div>
  )
}
