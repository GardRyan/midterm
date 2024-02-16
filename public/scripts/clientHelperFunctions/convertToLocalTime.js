// converts to local time
const convertToLocaleTime = function(date) {
  if (date !== null) {
    const dateOptions = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    };

    const localDate = new Date(date).toLocaleTimeString(undefined, dateOptions);
    return localDate;
  }

  return null;
};
