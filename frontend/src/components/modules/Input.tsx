import styled from 'styled-components'
import { BMJua } from '../atoms'
import { COLORS } from '@/constants'
import { UseFormRegisterReturn } from 'react-hook-form'

type NativeInputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>

interface InputProps extends NativeInputProps {
  label: string
  register: UseFormRegisterReturn<string>
  error?: string
}

export const Input = ({ label, register, error, ...props }: InputProps) => {
  return (
    <Container>
      <BMJua.Body color={COLORS.BLACK500} style={{ paddingLeft: '2px' }}>
        {label}
      </BMJua.Body>
      <InputStyle {...props} {...register} />
      <BMJua.Caption style={{ color: COLORS.RED500, paddingLeft: '2px' }}>
        {error ?? ''}
      </BMJua.Caption>
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  height: 90px;
`

const InputStyle = styled.input`
  width: 100%;
  color: ${COLORS.BLACK500};
  font-family: 'BMJUA';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  margin: 8px 0 4px 0;
  padding: 8px 12px;

  border: 1px solid ${COLORS.GRAY500};
  border-radius: 6px;

  &:focus {
    border: 1px solid ${COLORS.YELLOW500};
    outline: none;
  }

  &[type='password'] {
    font-family: sans-serif;
  }

  &[type='password']::placeholder {
    font-family: 'BMJUA';
  }
`
