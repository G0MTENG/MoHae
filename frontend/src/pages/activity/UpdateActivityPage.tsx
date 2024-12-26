import { IconButton, TextButton } from '@/components/modules'
import * as S from './AddPage.styled'
import { BMJua, Header, Icons } from '@/components/atoms'
import { ActivityForm } from '@/components/templates'
import { useActivityForm } from '@/hooks'
import { useNavigate, useParams } from 'react-router-dom'
import { COLORS, NAVIGATE } from '@/constants'

export const UpdateActivityPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { onSubmit, ...formProps } = useActivityForm('update', Number(id))

  return (
    <>
      <Header>
        <S.HeaderItem>
          <IconButton
            onClick={() => navigate(NAVIGATE.BACK)}
            icon={<Icons.ARROW_LEFT size={24} />}
          />
        </S.HeaderItem>
        <BMJua.Body>활동 수정</BMJua.Body>
        <S.HeaderItem>
          <TextButton onClick={onSubmit} type='submit' color={COLORS.RED500}>
            완료
          </TextButton>
        </S.HeaderItem>
      </Header>
      <ActivityForm {...formProps} />
    </>
  )
}
