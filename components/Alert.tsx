import { cn } from '@/styles/utils'

type Severity = 'default' | 'info' | 'danger' | 'success' | 'warning'

const containerVariants: Record<Severity, string> = {
  info: 'text-blue-400 border-blue-800',
  danger: 'text-red-400 border-red-800',
  success: 'text-green-400 border-green-800',
  warning: 'text-yellow-400 border-yellow-800',
  default: 'text-gray-300 border-gray-600'
}

const buttonVariants: Record<Severity, string> = {
  info: 'text-blue-400',
  danger: 'text-red-400',
  success: 'text-green-400',
  warning: 'text-yellow-400',
  default: 'text-gray-300'
}

export function Alert({
  className,
  children,
  severity = 'default',
  onClose
}: {
  severity?: Severity
  onClose?: () => void
} & React.HTMLAttributes<HTMLDivElement>) {
  const containerStyles = containerVariants[severity]
  const buttonStyles = buttonVariants[severity]

  return (
    <div
      className={cn(
        'flex p-4 border-t-4 bg-gray-800',
        containerStyles,
        className
      )}
      role="alert"
    >
      <div className="text-sm font-medium">{children}</div>
      {onClose && (
        <button
          type="button"
          className={cn(
            'ml-auto -mx-1.5 -my-1.5 rounded-lg p-1.5 inline-flex h-8 w-8 bg-gray-800 hover:bg-gray-700',
            buttonStyles
          )}
          aria-label="Close"
          onClick={onClose}
        >
          <span className="sr-only">Dismiss</span>
          <svg
            aria-hidden="true"
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      )}
    </div>
  )
}
