'use client'
import { useEffect } from 'react'
import { Button } from '@/components'
import { logger } from '@/lib/logger'

export default function Error({ error }: { error: Error }) {
  useEffect(() => {
    logger.error(error)
  }, [error])

  return (
    <div className="fixed top-0 right-0 bottom-0 left-0 h-screen bg-black text-white flex flex-col items-center justify-center">
      <p className="mb-4">An unexpected error occured</p>
      <Button onClick={() => window.location.reload()}>Reload</Button>
    </div>
  )
}
