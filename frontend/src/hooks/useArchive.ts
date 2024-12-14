import dayjs, { Dayjs } from 'dayjs'
import { useEffect, useState } from 'react'
import { useFetchActivityList } from './queries/useActivity'
import { Activities } from '@/viewModels'

export const useArchive = (initialDate: Dayjs = dayjs()) => {
  const [date, setDate] = useState(initialDate.format('YYYY-MM-DD'))
  const { data } = useFetchActivityList(date)
  const [activities, setActivities] = useState<Activities>(new Activities([]))

  useEffect(() => {
    if (!data) return

    const activities = new Activities(data)
    setActivities(activities)
  }, [data])

  const prev = () => {
    setDate((prev) => dayjs(prev).subtract(1, 'day').format('YYYY-MM-DD'))
  }

  const next = () => {
    setDate((prev) => dayjs(prev).add(1, 'day').format('YYYY-MM-DD'))
  }

  return {
    date,
    prev,
    next,
    isEmpty: activities.isEmpty,
    activities: activities.data,
  }
}
