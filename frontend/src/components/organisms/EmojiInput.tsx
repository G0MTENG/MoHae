import { useModal } from '@/hooks'
import { Button, EmojiPicker, Modal } from '../modules'
import { BMJua, Emoji } from '../atoms'
import styled from 'styled-components'
import { COLORS } from '@/constants'
import { UseFormSetValue, UseFormWatch } from 'react-hook-form'
import type { ActivitySchemaType } from '@/types'

interface EmojiInputProps {
  watch: UseFormWatch<ActivitySchemaType>
  setValue: UseFormSetValue<ActivitySchemaType>
}

export const EmojiInput = ({ watch, setValue }: EmojiInputProps) => {
  const { isOpen, open, close } = useModal()
  const handleSelectEmoji = (emoji: string) => {
    setValue('emoji', emoji)
  }
  const emoji = watch('emoji')

  return (
    <Container>
      <BMJua.Body color={COLORS.BLACK500} style={{ paddingLeft: '2px' }}>
        이모지
      </BMJua.Body>
      <BMJua.Caption style={{ color: COLORS.GRAY500, paddingLeft: '2px' }}>
        이모지를 클릭하면 선택할 수 있어요!
      </BMJua.Caption>
      <SelectContainer>
        <PreviewEmoji style={{ fontSize: '48px' }} onClick={open}>
          {emoji}
        </PreviewEmoji>
      </SelectContainer>
      {isOpen && (
        <Modal height='80%' close={close}>
          <Preview>
            <BMJua.H5>선택한 이모지 : </BMJua.H5>
            <Emoji>{emoji}</Emoji>
          </Preview>

          <EmojiPicker onSelect={handleSelectEmoji} />

          <Button onClick={close}>선택하기</Button>
        </Modal>
      )}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  justify-content: center;
`

const Preview = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
`

const SelectContainer = styled.div`
  width: 100%;
  padding: 4px;

  display: flex;
  justify-content: center;
  align-items: center;
`

const PreviewEmoji = styled(Emoji)`
  cursor: 'pointer';

  &:hover {
    transform: scale(1.2);
  }
`
