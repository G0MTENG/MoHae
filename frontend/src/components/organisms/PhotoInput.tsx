import { CreateActivitySchemaType } from '@/types'
import { UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form'
import { BMJua } from '../atoms'
import { COLORS } from '@/constants'
import styled from 'styled-components'
import { ImageInput, PrewviewPhotos } from '../modules'

interface PhotoInputProps {
  watch: UseFormWatch<CreateActivitySchemaType>
  register: UseFormRegister<CreateActivitySchemaType>
  setValue: UseFormSetValue<CreateActivitySchemaType>
  error?: string
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const Previews = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`

export const PhotoInput = ({ watch, register, setValue, error }: PhotoInputProps) => {
  const photos = watch('photos') || []

  return (
    <Container>
      <BMJua.Body color={COLORS.BLACK500} style={{ paddingLeft: '2px' }}>
        사진
      </BMJua.Body>
      <BMJua.Caption style={{ color: COLORS.RED500, paddingLeft: '2px' }}>
        {error ?? ''}
      </BMJua.Caption>
      <Previews>
        <ImageInput register={register} setValue={setValue} />
        <PrewviewPhotos setValue={setValue} photos={photos} />
      </Previews>
    </Container>
  )
}
