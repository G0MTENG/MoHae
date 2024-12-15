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
  ActivityDetailPage,
  AddFriendsPage,
  EditProfilePage,
} from '@/pages'
import { ROUTES } from '@/constants'
import { MainTemplate } from '@/components/templates'

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* 루트 페이지 */}
        <Route path={ROUTES.ROOT} element={<SplashPage />} />

        {/* 인증 페이지 */}
        <Route path={ROUTES.AUTH.SIGN_IN} element={<SignInPage />} />
        <Route path={ROUTES.AUTH.SIGN_UP} element={<SignUpPage />} />
        <Route path={ROUTES.AUTH.FIND_PASSWORD} element={<FindPassword />} />

        {/* 메인 페이지 (중첩 라우팅) */}
        <Route path={ROUTES.MAIN.ROOT} element={<MainTemplate />}>
          <Route index element={<HomePage />} /> {/* /main */}
          <Route path={ROUTES.MAIN.HOME} element={<HomePage />} /> {/* /main/home */}
          <Route path={ROUTES.MAIN.ARCHIVE} element={<ArchivePage />} /> {/* /main/archive */}
          <Route path={ROUTES.MAIN.FRIENDS} element={<FriendsPage />} /> {/* /main/friends */}
          <Route path={ROUTES.MAIN.SETTINGS} element={<SettingsPage />} /> {/* /main/settings */}
        </Route>

        {/* 추가 페이지 */}
        <Route path={ROUTES.ADD} element={<AddPage />} />

        {/* 활동 디테일 */}
        <Route path={ROUTES.ACTIVITY} element={<ActivityDetailPage />} />

        {/* edit profile */}
        <Route path={ROUTES.EDIT_PROFILE} element={<EditProfilePage />} />

        {/* add friends */}
        <Route path={ROUTES.ADD_FRIENDS} element={<AddFriendsPage />} />

        {/* 404 Not Found */}
        <Route path={ROUTES.NOT_FOUND} element={<NotFoundPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}
