import dotenv from 'dotenv'

dotenv.config()

export const parseImageUrl = (image: Express.Multer.File): string => {
  const imagePath = image.path.split('public')[1]
  return `${process.env.API_URL}/public${imagePath}`
}
