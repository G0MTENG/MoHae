export const parseImageUrl = (image: Express.Multer.File): string => {
  const imagePath = image.path.split('public')[1]
  return `http://localhost:3000/public/${imagePath}`
}