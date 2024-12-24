import { useNavigate } from 'react-router-dom'
import { useDeleteActivity } from './queries/useActivity'
import { BMJua, Favicon } from '@/components/atoms'
import styled from 'styled-components'
import { Button } from '@/components/modules'
import { NAVIGATE } from '@/constants'

export const useActivityDetailButtonHandlers = () => {
  const { mutate, isSuccess } = useDeleteActivity()
  const navigate = useNavigate()

  const Modals = {
    DELETE: ({ detailId, close }: { detailId: number; close: VoidFunction }) => (
      <>
        <Favicon size={48} />
        <BMJua.H5>정말 삭제하시겠습니까?</BMJua.H5>
        <ButtonRow>
          <Button onClick={() => handlers.DELETE(detailId)}>삭제하기</Button>
          <Button onClick={close}>취소하기</Button>
        </ButtonRow>
      </>
    ),
    SUCCESS: ({ close }: { close: VoidFunction }) => (
      <>
        <Favicon size={48} />
        <BMJua.H5>삭제되었습니다.</BMJua.H5>
        <Button
          onClick={() => {
            close()
            navigate(NAVIGATE.BACK)
          }}
        >
          확인
        </Button>
      </>
    ),
  }

  const handleDelete = (id: number) => {
    mutate(id)
  }

  const handleUpdate = (id: number) => {
    navigate(NAVIGATE.UPDATE_ACTIVITY(id))
  }

  const handleChat = (id?: number) => {
    if (!id) return

    navigate(NAVIGATE.CHAT_ROOM(id))
  }

  const handlers = {
    DELETE: handleDelete,
    UPDATE: handleUpdate,
    CHAT: handleChat,
  }

  return {
    isSuccess,
    Modals,
    handlers,
  }
}

const ButtonRow = styled.div`
  width: 100%;
  display: flex;
  gap: 16px;
`
