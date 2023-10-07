import dayjs from 'dayjs'
export const format = (timestamp: number): string => {
  const newStamp = +String(timestamp).slice(0, -3)
  return dayjs.unix(newStamp).format('YYYY.MM.DD HH:mm')
}
