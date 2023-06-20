export default class DateService {
  static convertDateToDateAndTimeArray = (dateNow: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "short",
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "numeric",
      hour12: false,
      minute: "numeric",
      second: "numeric",
    };

    const formattedDate = dateNow.toLocaleString("fr", options);

    return {
      date: formattedDate.split(" à")[0],
      time: formattedDate.split("à ")[1],
    };
  };

  static waitingTimeSinceDelivery = (createdAt: Date) => {
    return Math.ceil(
      (Date.now() - new Date(createdAt).getTime()) / (1000 * 60)
    );
  };

  static addMinutesToDate = (dateNow: Date, minutesToAdd: number): Date => {
    let ticketsDay = new Date(dateNow);
    ticketsDay.setMinutes(ticketsDay.getMinutes() + minutesToAdd);
    return ticketsDay;
  };

  static substractMinutesToDate = (
    dateNow: Date,
    minutesToSubstract: number
  ): Date => {
    let ticketsDay = new Date(dateNow);
    ticketsDay.setMinutes(ticketsDay.getMinutes() - minutesToSubstract);
    return ticketsDay;
  };

  static changeDateToStringFormatWithDateAndHours = (date: any) => {
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
}
