import styled from 'styled-components'

export const Emoji = styled.span<{ size?: number }>`
  font-family: TossFace;
  font-size: ${(props) => props.size ?? 32}px;
`
