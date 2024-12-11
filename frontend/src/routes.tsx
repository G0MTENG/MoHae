import { BrowserRouter, Routes, Route } from 'react-router-dom'
import {
  NotFoundPage,
  SplashPage,
  SignInPage,
  SignUpPage,
  FindPassword,
  HomePage,
  ArchivePage,
  AddPage,
  FriendsPage,
  SettingsPage,
} from '@/pages'
import { ROUTES } from '@/constants'
import { MainTemplate } from '@/components/templates'

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.ROOT} element={<SplashPage />} />
        <Route path={ROUTES.AUTH.SIGN_IN} element={<SignInPage />} />
        <Route path={ROUTES.AUTH.SIGN_UP} element={<SignUpPage />} />
        <Route path={ROUTES.AUTH.FIND_PASSWORD} element={<FindPassword />} />
        <Route path={ROUTES.MAIN.ROOT} element={<MainTemplate />}>
          <Route index element={<HomePage />} />
          <Route path={ROUTES.MAIN.HOME} element={<HomePage />} />
          <Route path={ROUTES.MAIN.ARCHIVE} element={<ArchivePage />} />
          <Route path={ROUTES.MAIN.ADD} element={<AddPage />} />
          <Route path={ROUTES.MAIN.FRIENDS} element={<FriendsPage />} />
          <Route path={ROUTES.MAIN.SETTINGS} element={<SettingsPage />} />
        </Route>
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}
