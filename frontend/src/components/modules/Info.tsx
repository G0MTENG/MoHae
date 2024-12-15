import styled from 'styled-components'
import { BMJua, Favicon } from '../atoms'
import { PropsWithChildren } from 'react'

interface InfoProps {
  size?: 'large' | 'small'
}

const Container = styled.div`
  margin: 16px auto 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`

const StyledTextLarge = styled(BMJua.H5)`
  white-space: pre-wrap;
  text-align: center;
`

const StyledTextSmall = styled(BMJua.Body)`
  white-space: pre-wrap;
  text-align: center;
`

export const Info = ({ size = 'large', children }: PropsWithChildren<InfoProps>) => {
  return (
    <Container>
      <Favicon />
      {size === 'large' ? (
        <StyledTextLarge>{children}</StyledTextLarge>
      ) : (
        <StyledTextSmall>{children}</StyledTextSmall>
      )}
    </Container>
  )
}
