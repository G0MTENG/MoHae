import { BMJua, Emoji, Favicon, Header, Icons } from '@/components/atoms'
import { Button, Modal } from '@/components/modules'
import { ImageSlider } from '@/components/modules'
import { COLORS } from '@/constants'
import { useFetchDetailActivity, useActivityDetailButtonHandlers, useModal } from '@/hooks'
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'

export const ActivityDetailPage = () => {
  const navigator = useNavigate()
  const { id: activityId } = useParams()
  const { data: activityData } = useFetchDetailActivity(Number(activityId))
  const { isOpen, open, close } = useModal()
  const { isSuccess, Modals, handlers } = useActivityDetailButtonHandlers()

  if (!activityData) return null

  const {
    activity: { id: detailId, title, description, emoji, images, createdAt, endAt },
    user: { userId, username, avartar },
    owner,
  } = activityData

  return (
    <>
      <Header>
        <Icons.ARROW_LEFT
          style={{
            cursor: 'pointer',
          }}
          onClick={() => navigator(-1)}
          color={COLORS.BLACK}
          size={24}
        />
      </Header>
      <DetailView>
        {!owner && (
          <UserInfo>
            {avartar ? <img className='avartar' src={avartar} /> : <Favicon size={48} />}
            <BMJua.H5>{username}</BMJua.H5>
          </UserInfo>
        )}
        {images.length > 0 ? <ImageSlider images={images.map((image) => image.imageUrl)} /> : null}
        <div className='row'>
          <BMJua.H5 className='title'>{title}</BMJua.H5>
          <Emoji>{emoji}</Emoji>
        </div>
        <BMJua.Body>{description}</BMJua.Body>
        <div className='date'>
          <BMJua.Caption color={COLORS.GRAY500}>시작 일시: {createdAt}</BMJua.Caption>
          {owner && (
            <BMJua.Caption color={COLORS.GRAY500}>종료 일시: {endAt ?? '활동 중'}</BMJua.Caption>
          )}
        </div>
      </DetailView>
      <ButtonRowWithPadding>
        {owner ? (
          <>
            <Button onClick={() => handlers.UPDATE(detailId)}>수정하기</Button>
            <Button onClick={open}>삭제하기</Button>
            {isOpen && (
              <Modal close={close}>
                <ModalContent>
                  {isSuccess ? (
                    <Modals.SUCCESS close={close} />
                  ) : (
                    <Modals.DELETE detailId={detailId} close={close} />
                  )}
                </ModalContent>
              </Modal>
            )}
          </>
        ) : (
          <Button onClick={() => handlers.CHAT(userId)}>채팅하러 가기</Button>
        )}
      </ButtonRowWithPadding>
    </>
  )
}

const DetailView = styled.div`
  width: 100%;
  height: calc(100vh - 56px - 116px);
  overflow-y: auto;
  padding: 16px;

  display: flex;
  flex-direction: column;
  gap: 16px;

  & .row {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  & .title {
    flex: 1;
  }

  & .date {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
`

const ButtonRow = styled.div`
  width: 100%;
  display: flex;
  gap: 16px;
`

const ButtonRowWithPadding = styled(ButtonRow)`
  width: 100%;
  padding: 32px 16px;
  display: flex;
  gap: 16px;
`

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  & .avartar {
    width: 48px;
    height: 48px;
    border-radius: 50%;
  }
`

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
`
