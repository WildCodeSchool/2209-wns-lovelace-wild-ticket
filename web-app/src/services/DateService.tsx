/**
 * Function used to convert a date objet in readable date, hours, minutes and seconds
 */
export const convertDate = (dateNow: Date) => {
  const locale = "fr";

  const day = dateNow.toLocaleDateString(locale, { weekday: "long" });
  const date = `${day}, ${dateNow.getDate()} ${dateNow.toLocaleDateString(
    locale,
    { month: "long", year: "numeric" }
  )}`;

  const time = dateNow.toLocaleTimeString(locale, {
    hour: "numeric",
    hour12: false,
    minute: "numeric",
    second: "numeric",
  });

  return {
    date,
    time,
  };
};

/**
 * Function used to show the waiting time of a new ticket
 */
export const waitingTime = (deliveredAt: Date) => {
  const dateNow = new Date();
  //TODO: modifier date dans backend
  return dateNow.getMinutes() + 60 - new Date(deliveredAt).getMinutes();
};
