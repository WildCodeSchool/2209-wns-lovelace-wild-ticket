import { faker } from "@faker-js/faker";
import DateUpdates from "../services/DateUpdates";

export type TicketFixturesType = {
  number: number;
  name: string;
  seats: number;
  email: string;
  phoneNumber: string;
  createdAt: Date;
  deliveredAt?: Date;
  table: number;
  placedAt?: Date;
  closedAt?: Date;
};

export default class TicketFixtures {
  static getSeatsFromTable(table: number): number {
    if (table <= 6) {
      return 2;
    } else if (table <= 11) {
      return 4;
    } else if (table <= 13) {
      return 6;
    } else {
      return 8;
    }
  }

  static async getRandomTickets(): Promise<TicketFixturesType[]> {
    const ticketsFixtures: TicketFixturesType[] = [];
    const dateNow = new Date();

    // Tickets from day -29 to day 0
    for (let dateDay = 1; dateDay < 29; dateDay++) {
      let ticketsPerDay = Math.floor(Math.random() * 50) + 40;
      let ticketsDate = DateUpdates.substractDaysToDate(dateNow, dateDay);

      for (let ticketNumber = 1; ticketNumber < ticketsPerDay; ticketNumber++) {
        let lastName = faker.name.lastName();
        let table = Math.floor(Math.random() * 15 + 1);

        ticketsFixtures.push({
          number: ticketNumber,
          name: lastName,
          seats: this.getSeatsFromTable(table),
          email: faker.internet.email(faker.name.firstName(), lastName),
          phoneNumber: faker.phone.number("06########"),
          createdAt: ticketsDate,
          deliveredAt: ticketsDate,
          table: table,
          placedAt: ticketsDate,
          closedAt: ticketsDate,
        });
      }
    }

    // Today's closed tickets
    let closedTodaysTickets = Math.floor(Math.random() * 20) + 10;
    let ticketsDate = DateUpdates.substractHoursToDate(dateNow, 2);
    let ticketNumber = 1;

    for (
      let closedTickets = 1;
      closedTickets <= closedTodaysTickets;
      closedTickets++
    ) {
      let lastName = faker.name.lastName();
      let table = Math.floor(Math.random() * 15 + 1);

      ticketsFixtures.push({
        number: ticketNumber,
        name: lastName,
        seats: this.getSeatsFromTable(table),
        email: faker.internet.email(faker.name.firstName(), lastName),
        phoneNumber: faker.phone.number("06########"),
        createdAt: ticketsDate,
        deliveredAt: ticketsDate,
        table: table,
        placedAt: ticketsDate,
        closedAt: ticketsDate,
      });
      ticketNumber++;
    }

    // Today's placed tickets
    let nowTablesFull = Math.floor(Math.random() * 5) + 10;

    for (let table = 1; table <= nowTablesFull; table++) {
      let lastName = faker.name.lastName();
      let minutesToSubstract = Math.floor(Math.random() * 60) + 10;

      ticketsFixtures.push({
        number: ticketNumber,
        name: lastName,
        seats: this.getSeatsFromTable(table),
        email: faker.internet.email(faker.name.firstName(), lastName),
        phoneNumber: faker.phone.number("06########"),
        createdAt: DateUpdates.substractMinutesToDate(
          dateNow,
          minutesToSubstract
        ),
        deliveredAt: DateUpdates.substractMinutesToDate(
          dateNow,
          minutesToSubstract
        ),
        table: table,
        placedAt: DateUpdates.substractMinutesToDate(
          dateNow,
          minutesToSubstract
        ),
      });
      ticketNumber++;
    }

    // Today's waiting tickets
    let numberOfWaitingTickets = Math.floor(Math.random() * 10) + 1;
    let minutesToSubstract = Math.floor(Math.random() * 35) + 1;

    for (
      let waitingTicket = 1;
      waitingTicket < numberOfWaitingTickets;
      waitingTicket++
    ) {
      let lastName = faker.name.lastName();
      let table = Math.floor(Math.random() * 15 + 1);

      ticketsFixtures.push({
        number: ticketNumber,
        name: lastName,
        seats: this.getSeatsFromTable(table),
        email: faker.internet.email(faker.name.firstName(), lastName),
        phoneNumber: faker.phone.number("06########"),
        createdAt: DateUpdates.substractMinutesToDate(
          dateNow,
          minutesToSubstract
        ),
        deliveredAt: DateUpdates.substractMinutesToDate(
          dateNow,
          minutesToSubstract
        ),
        table: table,
        closedAt: DateUpdates.addMinutesToDate(
          DateUpdates.substractMinutesToDate(dateNow, minutesToSubstract),
          15
        ),
      });
      ticketNumber++;
      minutesToSubstract -= Math.floor(Math.random() * 10) + 1;
    }

    return ticketsFixtures;
  }
}
