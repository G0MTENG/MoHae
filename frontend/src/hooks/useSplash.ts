import { NAVIGATE } from '@/constants'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export const useSplash = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate(NAVIGATE.SIGN_IN)
    }, 2000)

    return () => {
      clearTimeout(timer)
    }
  }, [navigate])
}
