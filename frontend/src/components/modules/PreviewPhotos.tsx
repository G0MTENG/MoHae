import { UseFormSetValue } from 'react-hook-form'
import { PreviewImage } from '../atoms'
import { CreateActivitySchemaType } from '@/types'

interface PreviewPhotosProps {
  photos: File[]
  setValue: UseFormSetValue<CreateActivitySchemaType>
}

export const PrewviewPhotos = ({ photos, setValue }: PreviewPhotosProps) => {
  const onDelete = (index: number) => {
    const filertedPhotos = photos.filter((_, photoNumber) => photoNumber !== index)
    setValue('images', filertedPhotos)
  }

  return (
    photos.length > 0 &&
    photos.map((photo, index) => (
      <PreviewImage
        key={photo.name}
        index={index}
        onDelete={onDelete}
        src={URL.createObjectURL(photo)}
        alt={`preview-${index}`}
      />
    ))
  )
}
