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
  table?: number;
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
    for (let dateDay = 1; dateDay < 30; dateDay++) {
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
    let ticketsDate = DateUpdates.substractHoursToDate(dateNow, 3);
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
    let nowTablesFull = Math.ceil(Math.random() * 4) + 10;

    for (let table = 1; table <= nowTablesFull; table++) {
      let lastName = faker.name.lastName();
      let minutesToSubstract = Math.floor(Math.random() * 90) + 50;

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
        closedAt: DateUpdates.addMinutesToDate(dateNow, 180),
      });
      ticketNumber++;
    }

    // Today's waiting tickets
    let numberOfWaitingTickets = Math.ceil(Math.random() * 6) + 1;
    let minutesToSubstract = numberOfWaitingTickets * 5;

    for (
      let waitingTicket = 1;
      waitingTicket <= numberOfWaitingTickets;
      waitingTicket++
    ) {
      let lastName = faker.name.lastName();
      let seats = Math.floor(Math.random() * 8) + 1;

      if (waitingTicket === 1) {
        ticketsFixtures.push({
          number: ticketNumber,
          name: lastName,
          seats: 8,
          email: faker.internet.email(faker.name.firstName(), lastName),
          phoneNumber: faker.phone.number("06########"),
          table: 15,
          createdAt: DateUpdates.substractMinutesToDate(
            dateNow,
            minutesToSubstract
          ),
          deliveredAt: DateUpdates.substractMinutesToDate(dateNow, 4),
          closedAt: DateUpdates.addMinutesToDate(dateNow, 1),
        });
        ticketNumber++;
        minutesToSubstract -= Math.floor(Math.random() * 7) + 1;
        continue;
      }

      ticketsFixtures.push({
        number: ticketNumber,
        name: lastName,
        seats: seats % 2 ? seats + 1 : seats,
        email: faker.internet.email(faker.name.firstName(), lastName),
        phoneNumber: faker.phone.number("06########"),
        createdAt: DateUpdates.substractMinutesToDate(
          dateNow,
          minutesToSubstract
        ),
      });
      ticketNumber++;
      minutesToSubstract -= Math.floor(Math.random() * 7) + 1;
    }

    return ticketsFixtures;
  }
}
