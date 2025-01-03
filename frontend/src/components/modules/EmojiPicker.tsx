import styled from 'styled-components'
import { BMJua, Emoji } from '../atoms'
import { EMOJI } from '@/constants'
import React from 'react'
import { UseFormSetValue } from 'react-hook-form'
import { ActivitySchemaType } from '@/types'

interface EmojiPickerProps {
  set: UseFormSetValue<ActivitySchemaType>
}

export const EmojiPicker = React.memo(({ set }: EmojiPickerProps) => {
  const handleSelectEmoji = (emoji: string) => {
    set('emoji', emoji)
  }

  return (
    <Container>
      {EMOJI.map(({ title, emojis }, index) => (
        <div key={index}>
          <BMJua.H5>{title}</BMJua.H5>
          <Emojis>
            {emojis.map((emoji) => (
              <button key={emoji} onClick={() => handleSelectEmoji(emoji)}>
                <Emoji>{emoji}</Emoji>
              </button>
            ))}
          </Emojis>
        </div>
      ))}
    </Container>
  )
})

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
`

const Emojis = styled.div`
  margin: 16px 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(40px, 1fr));
  gap: 12px;
  justify-items: center;
  align-items: center;

  & > button {
    background: none;
    border: none;
    margin: 0;
    padding: 0;
    cursor: pointer;
    font-size: 24px;

    &:focus {
      outline: none;
    }

    &:hover {
      transform: scale(1.2);
    }
  }
`
