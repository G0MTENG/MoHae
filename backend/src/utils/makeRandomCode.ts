// 6자리 random string을 생성한다.

export const makeRandomCode = (): string => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let randomCode = "";

  for (let i = 0; i < 6; i++) {
    randomCode += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return randomCode;
};
