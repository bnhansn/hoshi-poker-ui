'use client'
import { useState } from 'react'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/navigation'
import { Alert, Button, Input, Label } from '@/components'
import { useStore } from '@/stores'

export default observer(function Page() {
  const { sessionStore } = useStore()
  const router = useRouter()
  const [submitting, setSubmitting] = useState(false)
  const [errored, setErrored] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  async function onSubmit(
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> {
    event.preventDefault()
    setSubmitting(true)
    setErrored(false)
    try {
      await sessionStore.login({ username, password })
      router.push('/')
    } catch (error) {
      setErrored(true)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="mt-8 mx-auto max-w-2xl border rounded-xl border-gray-600 overflow-hidden">
      <div className="p-4 border-b border-gray-600 bg-gray-700">
        <h1 className="text-xs uppercase font-bold">Login</h1>
      </div>
      <form onSubmit={onSubmit} className="p-4">
        <div className="grid gap-6 mb-6">
          <>
            {errored && (
              <Alert severity="danger">Incorrect password or username</Alert>
            )}
            <div>
              <Label htmlFor="username">Username</Label>
              <Input
                required
                id="username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                required
                type="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
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
