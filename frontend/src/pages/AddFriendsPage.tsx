import * as S from './AddFriendsPage.styled'
import { Header, Icons } from '@/components/atoms'
import { Button, Info, Input } from '@/components/modules'
import { List } from '@/components/templates'
import { useDeleteFriend, useFetchFriends } from '@/hooks'
import { useAddFriends } from '@/hooks/useAddFriends'
import { useNavigate } from 'react-router-dom'

export const AddFriendsPage = () => {
  const navigate = useNavigate()
  const {
    onSubmit,
    register,
    handleSubmit,
    formState: { errors },
  } = useAddFriends()
  const { data } = useFetchFriends()
  const { mutate } = useDeleteFriend()

  if (!data) {
    return null
  }

  const friends = data.friends

  return (
    <>
      <Header>
        <Icons.ARROW_LEFT style={{ cursor: 'pointer' }} onClick={() => navigate(-1)} size={24} />
      </Header>

      <S.Container>
        <Input
          label='친구 추가'
          placeholder='추가할 친구의 친구코드를 입력해주세요.'
          register={register('friendCode')}
          error={errors?.friendCode?.message}
        />

        <List
          style={{
            height: 'calc(100svh - 260px)',
            overflowY: 'auto',
          }}
        >
          {friends.length === 0 ? (
            <Info>{'친구 코드를 입력하고\n친구를 등록해보세요!'}</Info>
          ) : (
            friends.map(({ id, avatar, username }) => (
              <List.Friend
                key={id}
                avatar={avatar}
                username={username}
                onClick={() => mutate(id)}
              />
            ))
          )}
        </List>

        <Button type='submit' onClick={handleSubmit(onSubmit)}>
          친구 추가하기
        </Button>
      </S.Container>
    </>
  )
}
