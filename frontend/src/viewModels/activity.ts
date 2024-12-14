import { ListItemProps } from '@/components/templates'
import { FetchListActivityResponse } from '@/types'
import dayjs from 'dayjs'

type Activity = Omit<ListItemProps, 'subtitle'> & {
  id: number
}

export class Activities {
  activities: Activity[]

  constructor(activities: FetchListActivityResponse) {
    this.activities = activities.map((activity, index, array) => {
      let caption = '현재'
      if (index > 0) {
        const prevActivityTime = dayjs(array[index - 1].createdAt)
        const createdAt = dayjs(activity.createdAt)
        const diffInMinutes = createdAt.diff(prevActivityTime, 'minute')

        caption =
          diffInMinutes < 60 ? `${diffInMinutes}분` : `${Math.floor(diffInMinutes / 60)}시간`
      }

      return {
        id: activity.id,
        imageUrl: activity.images[0].imageUrl,
        title: activity.title,
        emoji: activity.emoji,
        caption,
      }
    })
  }

  get data() {
    return this.activities
  }

  get length() {
    return this.activities.length
  }

  get isEmpty() {
    return this.length === 0
  }
}
