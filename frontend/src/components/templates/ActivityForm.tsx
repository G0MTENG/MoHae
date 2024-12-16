import { UseFormReturn } from 'react-hook-form'
import styled from 'styled-components'
import { Input } from '../modules'
import { EmojiInput, PhotoInput } from '../organisms'
import { ActivitySchemaType } from '@/types'

type ActivityFormProps = UseFormReturn<ActivitySchemaType>

export const ActivityForm = ({ ...formProps }: ActivityFormProps) => {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = formProps

  return (
    <Container>
      <Input
        label='현재 활동'
        placeholder='현재 무엇을 하고 계신가요?'
        register={register('title')}
        error={errors?.title?.message}
      />
      <Input
        label='내용'
        placeholder='내용을 입력해주세요. [선택]'
        register={register('description')}
        error={errors?.description?.message}
      />
      <EmojiInput watch={watch} setValue={setValue} />
      <PhotoInput
        watch={watch}
        register={register}
        setValue={setValue}
        error={errors?.images?.message}
      />
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`
