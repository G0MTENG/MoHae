import { PropsWithChildren } from 'react'
import { BottomNavigation } from '../organisms'

export const MainTemplate = ({ children }: PropsWithChildren) => {
  return (
    <div>
      <main>{children}</main>
      <BottomNavigation />
    </div>
  )
}
