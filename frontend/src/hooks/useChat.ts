import { ACCESS_TOKEN } from '@/constants'
import { Chat, Friend } from '@/types'
import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { io, Socket } from 'socket.io-client'

type SendEventType =
  | React.KeyboardEvent<HTMLInputElement>
  | React.ChangeEvent<HTMLInputElement>
  | React.MouseEvent<HTMLButtonElement>

export const useChat = () => {
  const navigate = useNavigate()
  const { id: roomId } = useParams()
  const [friend, setFriend] = useState<Friend | null>(null)
  const [messages, setMessages] = useState<Chat[]>([])
  const [input, setInput] = useState<string>('')
  const socketRef = useRef<Socket | null>(null)
  const chatContainerRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    chatContainerRef.current?.scrollTo({
      top: chatContainerRef.current.scrollHeight,
      behavior: 'instant',
    })
  }

  useEffect(() => {
    const socket = io(import.meta.env.VITE_BASE_URL)
    socketRef.current = socket

    const JWT = localStorage.getItem(ACCESS_TOKEN)
    if (!JWT) {
      navigate('/sign-in')
      return
    }

    socket.emit('join', { JWT, roomId: Number(roomId) })

    socket.on('join', (data) => {
      setFriend(data.friend)
      setMessages(data.messages)
    })

    socket.on('message', (data) => {
      setMessages((prev) => [...prev, data.message])
    })

    return () => {
      socket.disconnect()
    }
  }, [roomId, navigate])

  const send = (e: SendEventType) => {
    if ('nativeEvent' in e && 'isComposing' in e.nativeEvent && e.nativeEvent.isComposing) {
      return
    }

    e.preventDefault()
    const trimmedMessage = input.trim()
    if (!trimmedMessage) return

    socketRef.current?.emit('message', { roomId: Number(roomId), message: trimmedMessage })
    setInput('')
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  return {
    friend,
    messages,
    send,
    chatContainerRef,
    input,
    setInput,
  }
}
