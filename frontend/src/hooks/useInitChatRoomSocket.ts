import { ACCESS_TOKEN, NAVIGATE } from '@/constants'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { io } from 'socket.io-client'

export const useInitChatRoomSocket = () => {
  const navigate = useNavigate()
  const { id } = useParams()

  useEffect(() => {
    const socket = io(import.meta.env.VITE_BASE_URL)
    const JWT = localStorage.getItem(ACCESS_TOKEN)

    if (!JWT) {
      navigate(NAVIGATE.SIGN_IN)
    }

    socket.emit('join', { JWT, roomId: Number(id) })

    socket.on('join', () => {
      console.log('join')
    })

    socket.on('connect', () => {})

    return () => {
      socket.disconnect()
    }
  })

  return {}
}
