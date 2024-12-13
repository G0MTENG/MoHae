import styled from 'styled-components'
import { BMJua, Favicon } from '../atoms'
import { PropsWithChildren } from 'react'

const Container = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`

export const Error = ({ children }: PropsWithChildren) => {
  return (
    <Container>
      <Favicon />
      <BMJua.H5
        style={{
          whiteSpace: 'pre-wrap',
          textAlign: 'center',
        }}
      >
        {children}
      </BMJua.H5>
    </Container>
  )
}
