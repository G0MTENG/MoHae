import { NavLink } from '@/components/modules'
import * as S from './HomePage.styled'
import { Favicon, Header, Icons, Title } from '@/components/atoms'
import { ROUTES } from '@/constants'
import { RecentActivityView } from '@/components/templates'
import { useReceiveFromRN, useReceiveTokensFromRN } from '@/hooks'

export const HomePage = () => {
  const { handler } = useReceiveTokensFromRN()
  useReceiveFromRN(handler)

  return (
    <>
      <Header>
        <S.HeaderContainer>
          <Favicon size={52} />
          <Title.Small />
        </S.HeaderContainer>
        <NavLink
          to={ROUTES.CHAT}
          style={{
            width: '36px',
          }}
        >
          <Icons.SEND size={24} />
        </NavLink>
      </Header>
      <RecentActivityView />
    </>
  )
}
