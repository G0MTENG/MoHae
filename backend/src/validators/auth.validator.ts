import { body } from 'express-validator'

export const AuthValidator = {
  signIn: [
    body('email')
      .notEmpty()
      .withMessage('email은 필수입니다.')
      .isEmail()
      .withMessage('유효한 이메일을 입력해주세요.'),

    body('password')
      .notEmpty()
      .withMessage('password는 필수입니다.')
      .isLength({ min: 8 })
      .withMessage('비밀번호는 최소 8자 이상이어야 합니다.'),
  ],
  signUp: [
    body('username')
      .notEmpty()
      .withMessage('username은 필수입니다.')
      .isLength({ min: 1, max: 4 })
      .withMessage('username은 1자 이상, 4자 이하로 입력해주세요.'),

    body('email')
      .notEmpty()
      .withMessage('email은 필수입니다.')
      .isEmail()
      .withMessage('유효한 이메일을 입력해주세요.'),

    body('password')
      .notEmpty()
      .withMessage('password는 필수입니다.')
      .isLength({ min: 8 })
      .withMessage('비밀번호는 최소 8자 이상이어야 합니다.'),
  ],
}
