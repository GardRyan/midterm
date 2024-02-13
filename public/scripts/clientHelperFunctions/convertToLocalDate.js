

const date = "2024-02-01T04:00:00.000Z";
const convertToLocaleDate = function (date) {
  const dateOptions = {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }
  const localDate = (new Date(date)).toLocaleDateString(undefined, dateOptions);
  return localDate
}

console.log(convertToLocaleDate(date));