import { COLORS } from '@/constants'
import { ActivitySchemaType } from '@/types'
import { UseFormRegister, UseFormSetValue } from 'react-hook-form'
import { BMJua } from '../atoms'
import styled from 'styled-components'

interface ImageInputProps {
  register: UseFormRegister<ActivitySchemaType>
  setValue: UseFormSetValue<ActivitySchemaType>
  photos: (File | string)[]
}

const HiddenInput = styled.input`
  display: none;
`

const InputLabel = styled.label`
  width: 80px;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-color: ${COLORS.GRAY200};
  border: 1px dashed ${COLORS.GRAY500};
  border-radius: 8px;
  font-size: 16px;
  color: ${COLORS.BLACK300};
  &:hover {
    background-color: ${COLORS.GRAY300};
  }
`

export const ImageInput = ({ register, photos, setValue }: ImageInputProps) => {
  return (
    <>
      <InputLabel htmlFor='photo'>
        <BMJua.Caption>사진 추가</BMJua.Caption>
      </InputLabel>
      <HiddenInput
        id='photo'
        type='file'
        multiple
        accept='image/*'
        {...register('images', {
          onChange: (e) => {
            const files = Array.from(e.target.files ?? []) as File[]
            setValue('images', photos.concat(files))
          },
        })}
      />
    </>
  )
}
