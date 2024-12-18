import { Header, Icons } from '@/components/atoms'
import { IconButton, Info } from '@/components/modules'
import { useNavigate } from 'react-router-dom'

export const FindPassword = () => {
  const navigate = useNavigate()
  return (
    <>
      <Header>
        <IconButton onClick={() => navigate(-1)} icon={<Icons.ARROW_LEFT size={24} />} />
      </Header>
      <Info>{'죄송합니다.\n서비스 준비 중입니다.'}</Info>
    </>
  )
}
