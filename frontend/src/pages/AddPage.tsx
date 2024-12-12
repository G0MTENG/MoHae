import * as S from './AddPage.styled'
import { BMJua, Icons } from '@/components/atoms'
import { Header } from '@/components/atoms/Header'
import { IconButton, TextButton, Input } from '@/components/modules'
import { PhotoInput, EmojiInput } from '@/components/organisms'
import { COLORS } from '@/constants'
import { useCreateActivity } from '@/hooks/useCreateActivity'
import { useNavigate } from 'react-router-dom'

export const AddPage = () => {
  const navigate = useNavigate()
  const {
    watch,
    setValue,
    register,
    handleSubmit,
    onSubmit,
    formState: { errors },
  } = useCreateActivity()

  return (
    <>
      <Header>
        <S.HeaderItem>
          <IconButton onClick={() => navigate(-1)} icon={<Icons.ARROW_LEFT size={24} />} />
        </S.HeaderItem>
        <BMJua.Body>나의 활동</BMJua.Body>
        <S.HeaderItem>
          <TextButton onClick={handleSubmit(onSubmit)} type='submit' color={COLORS.RED500}>
            완료
          </TextButton>
        </S.HeaderItem>
      </Header>
      <S.Container>
        <Input
          label='현재 활동'
          placeholder='현재 무엇을 하고 계신가요?'
          register={register}
          error={errors?.activity?.message}
        />
        <Input
          label='내용'
          placeholder='내용을 입력해주세요. [선택]'
          register={register}
          error={errors?.content?.message}
        />
        <EmojiInput watch={watch} setValue={setValue} />
        <PhotoInput
          watch={watch}
          register={register}
          setValue={setValue}
          error={errors?.photos?.message}
        />
      </S.Container>
    </>
  )
}
