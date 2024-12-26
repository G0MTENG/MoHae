import { BMJua, Header, Icons } from '@/components/atoms'
import { Info } from '@/components/modules'
import { List } from '@/components/templates'
import { COLORS } from '@/constants'
import { useArchive } from '@/hooks'
import { formatDateKo } from '@/utils'

export const ArchivePage = () => {
  const { activities, isEmpty, date, prev, next } = useArchive()

  return (
    <>
      <Header>
        <Icons.ARROW_LEFT
          style={{
            cursor: 'pointer',
          }}
          onClick={prev}
          color={COLORS.BLACK}
          size={24}
        />
        <BMJua.H5>{formatDateKo(date)}</BMJua.H5>
        <Icons.ARROW_RIGHT
          style={{
            cursor: 'pointer',
          }}
          onClick={next}
          color={COLORS.BLACK}
          size={24}
        />
      </Header>
      {isEmpty ? (
        <Info>{'활동이 존재하지 않습니다.\n추억을 쌓아보세요!'}</Info>
      ) : (
        <List>
          {activities.map(({ id, ...activity }) => (
            <List.Archive to={`/activity/${id}`} key={id} {...activity} />
          ))}
        </List>
      )}
    </>
  )
}
