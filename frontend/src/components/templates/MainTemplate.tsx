import { ISWEBVIEW } from '@/constants/webview'
import { BottomNavigation } from '../organisms'
import { Outlet } from 'react-router-dom'

export const MainTemplate = () => {
  return (
    <div>
      <Outlet />
      {ISWEBVIEW || <BottomNavigation />}
    </div>
  )
}
