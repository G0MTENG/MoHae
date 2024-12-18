import { createHash } from 'crypto';

export const makeHash = (password: string) => {
  return createHash('sha512').update(password).digest('base64');
}
