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
export const waitingTime = (createdAt: Date) => {
  const dateNow = new Date();
  const dateDeliveredAt = new Date(createdAt);
  const diffInMs = dateNow.getTime() - dateDeliveredAt.getTime();

  return Math.ceil(diffInMs / (1000 * 60));
};
