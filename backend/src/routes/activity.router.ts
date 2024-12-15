import { upload } from '@/configs/multer';
import { ActivityController } from '@/controllers';
import { validate } from '@/middlewares';
import { ActivityValidator } from '@/validators';
import express from 'express';

const router = express.Router();

router
  .post('/', upload.array('images', 3) ,validate(ActivityValidator.form), ActivityController.create)
  .delete('/:id', ActivityController.delete)
  .put('/:id', validate(ActivityValidator.form), ActivityController.update)
  .get('/recent', ActivityController.recent)
  .get('/', ActivityController.list)
  .get('/:id', ActivityController.detail)

export const activityRouter = router; 