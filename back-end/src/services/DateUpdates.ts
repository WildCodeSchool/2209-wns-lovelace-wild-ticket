export default class DateUpdates {
  static substractDaysToDate(dateNow: Date, daysToSubstract: number) {
    let ticketsDay = new Date(dateNow);
    ticketsDay.setDate(ticketsDay.getDate() - daysToSubstract);
    return ticketsDay;
  }

  static substractHoursToDate(dateNow: Date, hoursToSubstract: number) {
    let ticketsDay = new Date(dateNow);
    ticketsDay.setHours(ticketsDay.getHours() - hoursToSubstract);
    return ticketsDay;
  }

  static addHoursToDate(dateNow: Date, hoursToAdd: number) {
    let ticketsDay = new Date(dateNow);
    ticketsDay.setHours(ticketsDay.getHours() + hoursToAdd);
    return ticketsDay;
  }

  static substractMinutesToDate(dateNow: Date, minutesToSubstract: number) {
    let ticketsDay = new Date(dateNow);
    ticketsDay.setMinutes(ticketsDay.getMinutes() - minutesToSubstract);
    return ticketsDay;
  }

  static addMinutesToDate(dateNow: Date, minutesToAdd: number) {
    let ticketsDay = new Date(dateNow);
    ticketsDay.setMinutes(ticketsDay.getMinutes() + minutesToAdd);
    return ticketsDay;
  }

  static updateOpenedClosedHoursRestaurant(hours: number, minutes: number) {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const day = today.getDate();

    //TODO: Voir si possible d'automatiser les changements d'heure...
    hours = hours - 2;

    return new Date(year, month, day, hours, minutes);
  }

  static newDateAtMidnight() {
    return new Date(new Date().setHours(0, 0, 0, 0));
  }

  static lastThirtyDays = () => {
    const lastThirtyDays = [];
    const today = new Date();
    for (let i = 0; i < 30; i++) {
      const date = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() - i
      );
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const dayMonth = day.toString() + "/" + month.toString();
      lastThirtyDays.unshift(dayMonth);
    }
    return lastThirtyDays;
  };

  static dateToString = (date: Date) => {
    const year = date.getFullYear().toString().slice(-2);
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");

    return year + month + day;
  };
}
