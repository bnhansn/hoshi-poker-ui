import NextLink, { LinkProps } from 'next/link'
import { cn } from '@/styles/utils'

export function ButtonLink({
  className,
  ...props
}: LinkProps & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <NextLink
      className={cn(
        'text-white focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-blue-800',
        className
      )}
      {...props}
    />
  )
}
