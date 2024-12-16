import { UseFormSetValue } from 'react-hook-form'
import { PreviewImage } from '../atoms'
import { ActivitySchemaType } from '@/types'

interface PreviewPhotosProps {
  photos: (File | string)[]
  setValue: UseFormSetValue<ActivitySchemaType>
}

export const PrewviewPhotos = ({ photos, setValue }: PreviewPhotosProps) => {
  const onDelete = (index: number) => {
    const filertedPhotos = photos.filter((_, photoNumber) => photoNumber !== index)
    setValue('images', filertedPhotos)
  }

  const formatPhoto = (photo: File | string) => {
    if (photo instanceof File) {
      return URL.createObjectURL(photo)
    }

    return photo
  }

  return (
    photos.length > 0 &&
    photos.map((photo, index) => (
      <PreviewImage
        key={index}
        index={index}
        onDelete={onDelete}
        src={formatPhoto(photo)}
        alt={`preview-${index}`}
      />
    ))
  )
}
