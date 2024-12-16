import { BMJua, Header, Icons } from '@/components/atoms'
import * as S from './EditProfilePage.styled'
import { EditAvatar, IconButton, Input, TextButton } from '@/components/modules'
import { useNavigate } from 'react-router-dom'
import { COLORS } from '@/constants'
import { useEditProfile } from '@/hooks'

export const EditProfilePage = () => {
  const navigate = useNavigate()
  const {
    user,
    register,
    watch,
    handleSubmit,
    onSubmit,
    setValue,
    formState: { errors },
  } = useEditProfile()

  console.log(errors)

  return (
    <>
      <Header>
        <S.HeaderItem>
          <IconButton onClick={() => navigate(-1)} icon={<Icons.ARROW_LEFT size={24} />} />
        </S.HeaderItem>
        <BMJua.Body>프로필 수정</BMJua.Body>
        <S.HeaderItem>
          <TextButton onClick={handleSubmit(onSubmit)} type='submit' color={COLORS.RED500}>
            완료
          </TextButton>
        </S.HeaderItem>
      </Header>
      <S.Profile>
        <EditAvatar avatar={user?.avatar} watch={watch} register={register} setValue={setValue} />
        <Input
          label=''
          placeholder='닉네임을 입력해주세요.'
          register={register('username')}
          error={errors?.username?.message}
        />
      </S.Profile>
    </>
  )
}
