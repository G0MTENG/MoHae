import styled from 'styled-components'

interface BMJuaProps {
  color?: string
}

const speadProps = (props: BMJuaProps) => {
  return {
    color: props?.color,
  }
}

const H1 = styled.h1<BMJuaProps>`
  font-family: 'BMJUA';
  font-style: normal;
  font-weight: 400;
  font-size: 48px;
  line-height: 48px;
  letter-spacing: -0.012em;
  ${(props) => speadProps(props)}
`

const H2 = styled.h2<BMJuaProps>`
  font-family: 'BMJUA';
  font-style: normal;
  font-weight: 400;
  font-size: 36px;
  line-height: 36px;
  letter-spacing: -0.012em;
  ${(props) => speadProps(props)}
`

const H3 = styled.h3<BMJuaProps>`
  font-family: 'BMJUA';
  font-style: normal;
  font-weight: 400;
  font-size: 32px;
  line-height: 32px;
  letter-spacing: -0.012em;
  ${(props) => speadProps(props)}
`

const H4 = styled.h4<BMJuaProps>`
  font-family: 'BMJUA';
  font-style: normal;
  font-weight: 400;
  font-size: 28px;
  line-height: 28px;
  letter-spacing: -0.012em;
  ${(props) => speadProps(props)}
`

const H5 = styled.h5<BMJuaProps>`
  font-family: 'BMJUA';
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  line-height: 24px;
  letter-spacing: -0.012em;
  ${(props) => speadProps(props)}
`

const Body = styled.p<BMJuaProps>`
  font-family: 'BMJUA';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  ${(props) => speadProps(props)}
`

const Small = styled.p<BMJuaProps>`
  font-family: 'BMJUA';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 14px;
  ${(props) => speadProps(props)}
`

const Caption = styled.p<BMJuaProps>`
  font-family: 'BMJUA';
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 12px;
  ${(props) => speadProps(props)}
`

export const BMJua = {
  H1,
  H2,
  H3,
  H4,
  H5,
  Body,
  Small,
  Caption,
}
