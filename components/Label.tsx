import { cn } from '@/lib/utils'

export function Label({
  className,
  ...props
}: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label
      className={cn('block mb-2 text-sm font-medium text-white', className)}
      {...props}
    />
  )
}
