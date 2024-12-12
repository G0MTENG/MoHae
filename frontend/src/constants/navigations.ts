export const ROUTES = Object.freeze({
  ROOT: '/',
  ADD: '/add',
  AUTH: {
    SIGN_IN: '/sign-in',
    SIGN_UP: '/sign-up',
    FIND_PASSWORD: '/find-password',
  },
  MAIN: {
    ROOT: '/main',
    HOME: '/main/home',
    ARCHIVE: '/main/archive',
    FRIENDS: '/main/friends',
    SETTINGS: '/main/settings',
  },
} as const)
