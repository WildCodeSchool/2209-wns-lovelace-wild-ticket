import Restaurant from "../models/Restaurant/Restaurant.entity";
import Ticket from "../models/Ticket/Ticket.entity";
import DateUpdates from "./DateUpdates";

export default class TicketService {
  static getRestaurantInitials(restaurant: Restaurant) {
    const restaurantName = restaurant.name;

    return restaurantName
      .split(" ")
      .filter((word) => word.length > 0)
      .map((word) => word[0].toUpperCase())
      .join("");
  }

  static isLastTicketFromYesterday(lastTicket: Ticket) {
    const lastTicketDate = new Date(lastTicket.createdAt);
    const today = new Date();
    const yesterday = new Date(today.getTime() - 86400000); // 86400000 = 24 heures * 60 minutes * 60 secondes * 1000 millisecondes

    return lastTicketDate.toDateString() === yesterday.toDateString();
  }

  /**
   * Format Ticket Number like "XX-YYMMDD-NNN"
   * XX : Restaurant Initials
   * YYMMDD : Date
   * NNN : Ticket Number
   */
  static formatTicketNumber = (
    restaurant: Restaurant,
    lastTicket: Ticket | null
  ): string => {
    const restaurantInitials = this.getRestaurantInitials(restaurant);
    const dateString = DateUpdates.dateToString(new Date());

    const ticketNumber = lastTicket
      ? this.isLastTicketFromYesterday(lastTicket)
        ? "001"
        : (parseInt(lastTicket.number.split("-")[2], 10) + 1)
            .toString()
            .padStart(3, "0")
      : "001";

    return `${restaurantInitials}-${dateString}-${ticketNumber}`;
  };

  static formatTicketNumberForFixtures(
    restaurant: Restaurant,
    ticketNumber: number,
    ticketCreation: Date
  ) {
    const restaurantInitials = this.getRestaurantInitials(restaurant);
    const dateString = DateUpdates.dateToString(ticketCreation);
    const ticketNumberString = ticketNumber.toString().padStart(3, "0");

    return `${restaurantInitials}-${dateString}-${ticketNumberString}`;
  }

  static formValidations = async (
    email: string | null = null,
    phoneNumber: string | null = null
  ) => {
    if (
      email &&
      !email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    ) {
      throw new Error("Votre adresse email n'est pas au bon format.");
    } else if (
      phoneNumber &&
      !phoneNumber.match(
        /^(?:(?:\+|00)33[\s.-]?|0)(?:(?:6|7)[\s.-]?)(?:\d{2}[\s.-]?){3}\d{2}$/
      )
    ) {
      throw new Error("Votre numéro de téléphone n'est pas au bon format.");
    }
  };
}
