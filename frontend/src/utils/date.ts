export const formatDateKo = (dateParam: string) => {
  const [yyyy, mm, dd] = dateParam.split('-').map(Number)
  const date = new Date(yyyy, mm - 1, dd)

  const dayOfWeek = ['일', '월', '화', '수', '목', '금', '토'][date.getDay()]

  return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일 (${dayOfWeek})`
}

export const formatToKoreanTime = (isoDate: string) => {
  const date = new Date(isoDate)
  const koreaDate = new Date(date.toLocaleString('en-US', { timeZone: 'Asia/Seoul' }))

  const hours = koreaDate.getHours()
  const minutes = koreaDate.getMinutes().toString().padStart(2, '0')
  const meridiem = hours < 12 ? '오전' : '오후'
  const formattedHours = hours % 12 === 0 ? 12 : hours % 12

  return `${meridiem} ${formattedHours}시 ${minutes}분`
}

export const extractDate = (isoDate: string) => {
  return formatDateKo(isoDate.split('T')[0])
}
