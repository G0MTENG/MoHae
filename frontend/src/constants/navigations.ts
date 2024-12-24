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

export const NAVIGATE = Object.freeze({
  ROOT: '/',
  CREATE_ACTIVITY: '/add',
  SIGN_IN: '/sign-in',
  SIGN_UP: '/sign-up',
  FIND_PASSWORD: '/find-password',
  HOME: '/main/home',
  ARCHIVE: '/main/archive',
  FRIENDS: '/main/friends',
  SETTINGS: '/main/settings',
  CHAT: '/chat',
  CHAT_ROOM: (id: number) => `/chat/${id}`,
  ACTIVITY_DETAIL: (id: number) => `/activity/${id}`,
  NOT_FOUND: '/not-found',
  ADD_FRIENDS: '/friends/add',
  EDIT_PROFILE: '/edit-profile',
  UPDATE_ACTIVITY: (id: number) => `/update/${id}`,
  BACK: -1,
} as const)
