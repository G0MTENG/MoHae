import { body } from "express-validator";

export const ActivityValidator = {
  form: [
    body('title')
      .notEmpty()
      .withMessage('활동 이름을 입력해주세요.')
      .isLength({ min: 1, max: 20 })
      .withMessage('활동 이름은 한 글자 이상 20글자 이하입니다.'),
    body('description')
      .isLength({ max: 100 })
      .withMessage('내용은 100자 이하입니다.')
      .optional(),
    body('emoji')
      .notEmpty()
      .withMessage('이모지를 선택해주세요.'),
  ],
}