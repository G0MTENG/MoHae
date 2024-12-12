import styled from 'styled-components'
import { BMJua, Emoji } from '../atoms'
import { EMOJI_KEYS, emojiName, emojis } from '@/constants/emojis'

const Container = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;
  max-height: 500px;
  -ms-overflow-style: none;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;

  &::-webkit-scrollbar {
    display: none;
  }
`

const EmojiContainer = styled.div`
  margin-top: 16px;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
  align-items: center;
`

const EmojiButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 24px;

  &:focus {
    outline: none;
  }

  &:hover {
    transform: scale(1.2);
  }
`

interface EmojiPickerProps {
  onSelect: (emoji: string) => void
}

export const EmojiPicker = ({ onSelect }: EmojiPickerProps) => {
  return (
    <Container>
      {Object.keys(EMOJI_KEYS).map((key) => (
        <div key={key}>
          <BMJua.H5>{emojiName[key]}</BMJua.H5>
          <EmojiContainer>
            {emojis[key].split(' ').map((emoji) => (
              <EmojiButton key={emoji} onClick={() => onSelect(emoji)}>
                <Emoji>{emoji}</Emoji>
              </EmojiButton>
            ))}
          </EmojiContainer>
        </div>
      ))}
    </Container>
  )
}
