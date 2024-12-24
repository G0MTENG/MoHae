import * as S from './AddPage.styled'
import { BMJua, Icons } from '@/components/atoms'
import { Header } from '@/components/atoms/Header'
import { IconButton, TextButton } from '@/components/modules'
import { ActivityForm } from '@/components/templates'
import { COLORS, NAVIGATE } from '@/constants'
import { useActivityForm } from '@/hooks'
import { useNavigate } from 'react-router-dom'

export const AddPage = () => {
  const navigate = useNavigate()
  const { onSubmit, ...formProps } = useActivityForm('create')

  return (
    <>
      <Header>
        <S.HeaderItem>
          <IconButton
            onClick={() => navigate(NAVIGATE.BACK)}
            icon={<Icons.ARROW_LEFT size={24} />}
          />
        </S.HeaderItem>
        <BMJua.Body>나의 활동</BMJua.Body>
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
