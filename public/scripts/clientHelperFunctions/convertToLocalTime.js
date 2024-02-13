
// converts to local time
const convertToLocaleTime = function (date) {
  const dateOptions = {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }
  console.log("date", date);
  const localDate = (new Date(date)).toLocaleTimeString(undefined, dateOptions);
  return localDate
}

