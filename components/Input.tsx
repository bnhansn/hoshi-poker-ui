import { forwardRef } from 'react'
import { cn } from '@/styles/utils'

export const Input = forwardRef(function Input(
  {
    className,
    errors,
    ...props
  }: React.InputHTMLAttributes<HTMLInputElement> & { errors?: Array<string> },
  ref: React.Ref<HTMLInputElement>
) {
  return (
    <>
      <input
        className={cn(
          'border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500',
          className
        )}
        ref={ref}
        {...props}
      />
      {errors && errors.map((msg) => <InputError key={msg}>{msg}</InputError>)}
    </>
  )
})

function InputError({ children }: { children: string }) {
  return <span className="mt-2 text-red-400 text-sm">{children}</span>
}
