export function TableCircle({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col absolute top-1/2 w-10/12 h-4/6 rounded-full items-center justify-center -translate-y-1/2 border border-gray-600 bg-gray-800">
      {children}
    </div>
  )
}
