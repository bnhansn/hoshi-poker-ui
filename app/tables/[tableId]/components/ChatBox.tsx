import { useRef, useState, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { Button, Input } from '@/components'
import { useStore } from '@/stores'

export const ChatBox = observer(function ChatBox() {
  const { chatStore, tableChannel } = useStore()
  const messageListRef = useRef<HTMLDivElement>(null)
  const [text, setText] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const messages = chatStore.messages

  useEffect(() => {
    if (messages.length > 0 && messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight
    }
  }, [messages.length])

  async function onSendMessage(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const trimmedText = text.trim()
    try {
      setText('')
      setSubmitting(true)
      await tableChannel.sendMessage(trimmedText)
      setSubmitting(false)
    } catch (error: any) {
      setSubmitting(false)
      window.alert(error.message)
    }
  }

  return (
    <div className="w-[400px] m-4 border bg-gray-800 border-gray-600 rounded-md">
      <div ref={messageListRef} className="overflow-auto h-[200px] p-b-2">
        {messages.map((message) => (
          <div className="break-words text-sm px-3 my-1" key={message.id}>
            <span className="text-gray-300 font-medium" color="rgb(90, 90, 90)">
              {typeof message.playerId === 'number' && 'Player' + ' '}
              {message.playerId}:{' '}
            </span>
            <span>{message.text}</span>
          </div>
        ))}
      </div>
      <form onSubmit={onSendMessage}>
        <div className="flex items-center mx-3 mb-2">
          <Input
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-auto flex-1 mr-2"
            placeholder="Send a message..."
          />
          <Button type="submit" disabled={submitting}>
            Send
          </Button>
        </div>
      </form>
    </div>
  )
})
