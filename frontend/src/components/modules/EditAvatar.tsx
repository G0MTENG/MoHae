import { EditUserInfoSchemaType } from '@/types'
import { UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { IconButton } from './IconButton'
import { Icons } from '../atoms'
import { COLORS } from '@/constants'

interface EditAvatarProps {
  avatar?: string
  watch: UseFormWatch<EditUserInfoSchemaType>
  setValue: UseFormSetValue<EditUserInfoSchemaType>
  register: UseFormRegister<EditUserInfoSchemaType>
}

export const EditAvatar = ({ avatar, watch, setValue, register }: EditAvatarProps) => {
  const [preview, setPreview] = useState<string | null>(null)
  const file = watch('avatar')

  const handleButtonClick = () => {
    document.getElementById('avatar-input')?.click()
  }

  const handleClickTrash: React.MouseEventHandler = (e) => {
    e.stopPropagation()
    setValue('avatar', undefined)
    setPreview(null)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setValue('avatar', selectedFile)
      const fileLoader = new FileReader()
      fileLoader.onloadend = () => {
        setPreview(fileLoader.result as string)
      }
      fileLoader.readAsDataURL(selectedFile)
    }
  }

  useEffect(() => {
    if (!file) {
      setPreview(null)
    }
  }, [file])

  return (
    <Container onClick={handleButtonClick} src={preview || avatar || '/user.svg'}>
      <input
        id='avatar-input'
        type='file'
        accept='image/*'
        {...register('avatar')}
        onChange={handleFileChange}
      />
      <IconButton
        type='button'
        onClick={handleClickTrash}
        icon={
          <Icons.TRASH
            size={16}
            color={COLORS.RED500}
            style={{
              position: 'absolute',
              top: '-5px',
              right: '-5px',
              display: preview ? 'block' : 'none',
              zIndex: 10,
            }}
          />
        }
      />
    </Container>
  )
}

const Container = styled.div<{ src: string }>`
  width: 100px;
  height: 100px;
  border-radius: 50px;
  background: none;
  cursor: pointer;
  background-image: url(${(props) => props.src});
  background-size: cover;
  padding: 0;
  position: relative;

  & #avatar-input {
    display: none;
  }
`
