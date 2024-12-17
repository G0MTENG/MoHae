import { upload } from '@/configs/multer'
import { ActivityController } from '@/controllers'
import { validate } from '@/middlewares'
import { ActivityValidator } from '@/validators'
import express from 'express'

const router = express.Router()

router
  .post('/', upload.array('images', 3), validate(ActivityValidator.form), ActivityController.create)
  .put(
    '/:id',
    upload.array('images', 3),
    validate(ActivityValidator.form),
    ActivityController.update,
  )
  .delete('/:id', ActivityController.delete)
  .get('/recent', ActivityController.recent)
  .get('/', ActivityController.list)
  .get('/:id', ActivityController.detail)

export const activityRouter = router
