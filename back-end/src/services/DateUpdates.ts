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
    return new Date(year, month, day, hours, minutes);
  }
}
