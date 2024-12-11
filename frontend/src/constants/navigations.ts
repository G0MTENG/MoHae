export const ROUTES = Object.freeze({
  ROOT: '/',
  AUTH: {
    SIGN_IN: '/sign-in',
    SIGN_UP: '/sign-up',
    FIND_PASSWORD: '/find-password',
  },
  MAIN: {
    ROOT: '/main',
    HOME: '/main/home',
    ARCHIVE: '/main/archive',
    ADD: '/main/add',
    FRIENDS: '/main/friends',
    SETTINGS: '/main/settings',
  },
} as const)
