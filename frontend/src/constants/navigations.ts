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
    HOME: 'home', // 상대 경로
    ARCHIVE: 'archive', // 상대 경로
    FRIENDS: 'friends', // 상대 경로
    SETTINGS: 'settings', // 상대 경로
  },
  CHAT: '/chat',
  CHAT_ROOM: '/chat/:id',
  ACTIVITY: '/activity/:id',
  NOT_FOUND: '/not-found',
  ADD_FRIENDS: '/friends/add',
  EDIT_PROFILE: '/edit-profile',
  UPDATE_ACTIVITY: '/update/:id',
} as const)
