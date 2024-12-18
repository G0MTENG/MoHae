import { useParams } from 'react-router-dom'
import { useFetchChatRoomMessages, useFetchChatWith } from './queries/useChat'
import { useEffect } from 'react'

export const useFetchInitChatRoom = () => {
  const { id: connectionId } = useParams()

  const { data: friend, refetch: refetchChatWith } = useFetchChatWith(Number(connectionId), {
    enabled: !!connectionId,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  })

  const { data: messages, refetch: refetchChatMessages } = useFetchChatRoomMessages(
    Number(connectionId),
    {
      enabled: !!connectionId,
      staleTime: Infinity,
      refetchOnWindowFocus: false,
    },
  )

  useEffect(() => {
    refetchChatWith()
    refetchChatMessages()
  }, [refetchChatMessages, refetchChatWith])

  return { friend, messages }
}
