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

export const addMinutesToDate = (dateNow: Date, minutesToAdd: number): Date => {
  let ticketsDay = new Date(dateNow);
  ticketsDay.setMinutes(ticketsDay.getMinutes() + minutesToAdd);
  return ticketsDay;
};

export const substractMinutesToDate = (
  dateNow: Date,
  minutesToSubstract: number
): Date => {
  let ticketsDay = new Date(dateNow);
  ticketsDay.setMinutes(ticketsDay.getMinutes() - minutesToSubstract);
  return ticketsDay;
};

export const newDateAtMidnight = () => {
  return new Date(new Date().setHours(0, 0, 0, 0));
};

export const changeDateFormat = (date: any) => {
  if (!date) {
    return "";
  }
  const dateToFormat = new Date(date);
  const day = dateToFormat.getDate().toString().padStart(2, "0");
  const month = (dateToFormat.getMonth() + 1).toString().padStart(2, "0");
  const year = dateToFormat.getFullYear().toString();
  const hours = dateToFormat.getHours().toString().padStart(2, "0");
  const minutes = dateToFormat.getMinutes().toString().padStart(2, "0");
  return `${day}-${month}-${year} ${hours}:${minutes}`;
};
