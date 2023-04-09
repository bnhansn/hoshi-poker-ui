'use client'
import { useState } from 'react'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/navigation'
import { Alert, Button, Input, Label } from '@/components'
import { getFieldErrors } from '@/lib/error'
import { useStore } from '@/stores'

export default observer(function Page() {
  const { sessionStore } = useStore()
  const router = useRouter()
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<unknown>()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  async function onSubmit(
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> {
    event.preventDefault()
    setSubmitting(true)
    setError(undefined)
    try {
      await sessionStore.register({ username, password })
      router.push('/')
    } catch (error) {
      setError(error)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="mt-8 mx-auto max-w-2xl border rounded-xl border-gray-600 overflow-hidden">
      <div className="p-4 border-b border-gray-600 bg-gray-700">
        <h1 className="text-xs uppercase font-bold">Sign Up</h1>
      </div>
      <form onSubmit={onSubmit} className="p-4">
        <div className="grid gap-6 mb-6">
          <>
            {error && (
              <Alert severity="danger" onClose={() => setError(undefined)}>
                Unable to sign up. Please correct the errors below.
              </Alert>
            )}
            <div>
              <Label htmlFor="username">Username</Label>
              <Input
                required
                id="username"
                onChange={(e) => setUsername(e.target.value)}
                errors={getFieldErrors(error, 'username')}
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                required
                type="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                errors={getFieldErrors(error, 'password')}
              />
            </div>
          </>
        </div>
        <Button type="submit" disabled={submitting} spinning={submitting}>
          Submit
        </Button>
      </form>
    </div>
  )
})
