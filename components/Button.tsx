import { cn } from '@/styles/utils'

export function Button({
  className,
  children,
  spinning,
  disabled,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { spinning?: boolean }) {
  return (
    <button
      type="button"
      className={cn(
        'text-white focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-blue-800',
        disabled && 'cursor-not-allowed opacity-50',
        spinning && 'inline-flex',
        className
      )}
      disabled={disabled}
      {...props}
    >
      {spinning && <Spinner />}
      {children}
    </button>
  )
}

function Spinner() {
  return (
    <svg
      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  )
}
