export const formatDateKo = (dateParam: string) => {
  const [yyyy, mm, dd] = dateParam.split('-').map(Number)
  const date = new Date(yyyy, mm - 1, dd)

  const dayOfWeek = ['일', '월', '화', '수', '목', '금', '토'][date.getDay()]

  return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일 (${dayOfWeek})`
}
