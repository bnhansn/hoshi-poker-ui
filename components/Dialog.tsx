import { Fragment } from 'react'
import { Dialog as _Dialog, Transition } from '@headlessui/react'

export function Dialog({
  isOpen,
  onClose,
  children
}: {
  isOpen: boolean
  onClose: () => void
  children?: React.ReactNode
}) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <_Dialog className="fixed inset-0 z-10 overflow-y-auto" onClose={onClose}>
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <_Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="fixed inset-0 z-10 overflow-y-auto">
              <div className="flex min-h-full justify-center text-center items-center">
                <div className="relative transform overflow-hidden rounded-lg text-left shadow-xl transition-all w-full max-w-lg bg-gray-700 border border-gray-600">
                  {children}
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </_Dialog>
    </Transition>
  )
}

export function DialogHeader({
  children,
  onClose
}: {
  children: string
  onClose: () => void
}) {
  return (
    <div className="px-6 py-4 border-b border-gray-600">
      <_Dialog.Title as="h3" className="font-semibold text-lg text-white">
        {children}
      </_Dialog.Title>
      <CloseButton onClick={onClose} />
    </div>
  )
}

export function DialogContent({ children }: { children: React.ReactNode }) {
  return <div className="p-6">{children}</div>
}

export function DialogFooter({ children }: { children: React.ReactNode }) {
  return <div className="px-6 py-4 border-t border-gray-600">{children}</div>
}

function CloseButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      className="absolute top-3 right-2.5 text-gray-400 bg-transparent rounded-lg text-sm p-1.5 ml-auto inline-flex items-center hover:bg-gray-800 hover:text-white"
      onClick={onClick}
    >
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
        ></path>
      </svg>
      <span className="sr-only">Close modal</span>
    </button>
  )
}
