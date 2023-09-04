import { Between, Brackets, MoreThan } from "typeorm";
import DateUpdates from "../../services/DateUpdates";
import EmailService from "../../services/EmailService";
import Restaurant from "../Restaurant/Restaurant.entity";
import RestaurantRepository from "../Restaurant/Restaurant.repository";
import Table from "../Table/Table.entity";
import TableRepository from "../Table/Table.repository";
import TicketDb from "./Ticket.db";
import Ticket from "./Ticket.entity";
import PageOfTickets from "../../resolvers/Ticket/PageOfTickets";
import TicketService from "../../services/TicketService";

export default class TicketRepository extends TicketDb {
  public static async getTickets(): Promise<Ticket[]> {
    return this.repository.find();
  }

  public static async getTicketsByRestaurant(
    restaurantId: string,
    seats: number | null
  ): Promise<Ticket[] | null> {
    (await RestaurantRepository.getRestaurantById(restaurantId)) as Restaurant;
    let query = this.repository
      .createQueryBuilder("ticket")
      .leftJoinAndSelect("ticket.restaurant", "restaurant")
      .leftJoinAndSelect("ticket.table", "userTable")
      .where("ticket.restaurant.id = :restaurantId", {
        restaurantId: restaurantId,
      });
    if (seats as number) {
      query.andWhere("ticket.seats BETWEEN :seatsMin AND :seatsMax", {
        seatsMin: (seats as number) - 1,
        seatsMax: seats,
      });
    }
    query.orderBy("ticket.number", "DESC");
    return await query.getMany();
  }

  public static async getTicketsBySeats(
    restaurantId: string,
    seats: number
  ): Promise<Ticket[] | null> {
    const restaurant = (await RestaurantRepository.getRestaurantById(
      restaurantId
    )) as Restaurant;

    return await this.repository.findBy({
      restaurant,
      seats: Between(seats - 1, seats),
      createdAt: MoreThan(DateUpdates.newDateAtMidnight()),
    });
  }

  public static async getPaginatedAndSortedTicketsByRestaurant(
    restaurantId: string,
    globalFilter: string,
    pageSize: number,
    pageNumber: number,
    sort: string[],
    order: number[]
  ): Promise<PageOfTickets> {
    const restaurant = (await RestaurantRepository.getRestaurantById(
      restaurantId
    )) as Restaurant;

    const countTotalTickets = await this.repository.count({
      where: { restaurant },
    });

    const query = this.repository
      .createQueryBuilder("ticket")
      .where("ticket.restaurant = :restaurantId", { restaurantId });

    globalFilter &&
      query.andWhere("ticket.name ILIKE :filter", {
        filter: `%${globalFilter}%`,
      });

    sort.forEach((sortField, index) => {
      query.addOrderBy(
        `ticket.${sortField}`,
        order[index] === 1 ? "ASC" : "DESC"
      );
    });

    if (!sort.length || !order.length || sort.length !== order.length) {
      query.orderBy("ticket.number", "DESC");
    }

    query.take(pageSize).skip((pageNumber - 1) * pageSize);

    const tickets = await query.getMany();

    return {
      totalCount: countTotalTickets,
      tickets,
    };
  }

  public static async getWaitingTicketsByRestaurant(
    restaurantId: string,
    seats: number | null
  ): Promise<Ticket[] | null> {
    const restaurant = (await RestaurantRepository.getRestaurantById(
      restaurantId
    )) as Restaurant;

    const maxDisapearDelay = restaurant.notComingTicketDisapearDelay;

    let query = this.repository
      .createQueryBuilder("ticket")
      .leftJoinAndSelect("ticket.restaurant", "restaurant")
      .leftJoinAndSelect("ticket.table", "userTable")
      .where("ticket.restaurant.id = :restaurantId", {
        restaurantId: restaurantId,
      })
      .andWhere("ticket.placedAt IS NULL")
      .andWhere(
        new Brackets((qb) =>
          qb
            .where("ticket.deliveredAt IS NOT NULL")
            .andWhere(
              `ticket.closedAt + interval '${maxDisapearDelay} minute' > NOW()`
            )
            .orWhere("ticket.closedAt IS NULL")
        )
      );

    if (seats) {
      query.andWhere("ticket.seats = :seats", {
        seats: seats,
      });
    }

    query.orderBy("ticket.number", "ASC");

    return await query.getMany();
  }

  public static async getPlacedTicketsByRestaurant(
    restaurantId: string,
    seats: number | null
  ): Promise<Ticket[] | null> {
    const restaurant = (await RestaurantRepository.getRestaurantById(
      restaurantId
    )) as Restaurant;

    const ticketWaitingLimit = restaurant.ticketWaitingLimit as number;

    let query = this.repository
      .createQueryBuilder("ticket")
      .leftJoinAndSelect("ticket.restaurant", "restaurant")
      .leftJoinAndSelect("ticket.table", "userTable")
      .where("ticket.restaurant.id = :restaurantId", {
        restaurantId: restaurantId,
      })
      .andWhere("ticket.placedAt IS NOT NULL")
      .andWhere("ticket.deliveredAt IS NOT NULL")
      .andWhere("ticket.closedAt > :delay", {
        delay: DateUpdates.addMinutesToDate(new Date(), ticketWaitingLimit),
      });

    if (seats) {
      query.andWhere("ticket.seats = :seats", {
        seats: seats,
      });
    }

    query.orderBy("ticket.number", "ASC");

    return await query.getMany();
  }

  public static async getExportTicketsByRestaurant(
    restaurantId: string,
    dateMin: Date | null,
    dateMax: Date | null
  ): Promise<Ticket[] | null> {
    await RestaurantRepository.getRestaurantById(restaurantId);

    let query = this.repository
      .createQueryBuilder("ticket")
      .leftJoinAndSelect("ticket.restaurant", "restaurant")
      .leftJoinAndSelect("ticket.table", "userTable")
      .where("ticket.restaurant.id = :restaurantId", {
        restaurantId: restaurantId,
      });

    if (dateMin as Date) {
      query.andWhere("ticket.createdAt > :dateMin", {
        dateMin: dateMin,
      });
    }

    if (dateMax as Date) {
      query.andWhere("ticket.createdAt < :dateMax", {
        dateMax: dateMax,
      });
    }

    query.orderBy("ticket.number", "ASC");

    return await query.getMany();
  }

  public static async getTicketById(id: string): Promise<Ticket | null> {
    const ticket = await this.repository.findOneBy({ id });

    if (!ticket) {
      throw new Error("Aucun ticket ne correspond à cet ID.");
    }

    return ticket;
  }

  public static async createTicket(
    name: string,
    seats: number,
    restaurantId: string,
    email: string | undefined,
    phoneNumber: string | undefined
  ): Promise<Ticket> {
    if (!email && !phoneNumber) {
      throw new Error(
        "Une adresse e-mail ou un numéro de téléphone mobile est obligatoire."
      );
    }

    await TicketService.formValidations(email, phoneNumber);

    const restaurant = (await RestaurantRepository.getRestaurantById(
      restaurantId
    )) as Restaurant;

    const lastTicket = await this.getLastTicket(restaurant);

    const ticketNumber = TicketService.formatTicketNumber(
      restaurant,
      lastTicket
    );

    const createdAt = new Date();

    const newTicket = new Ticket(
      ticketNumber,
      name,
      seats,
      createdAt,
      restaurant,
      email,
      phoneNumber
    );
    await this.repository.save(newTicket);

    email && (await EmailService.sendCreatedTicketEmail(newTicket));

    return newTicket;
  }

  public static async updateDeliveredAt(
    id: string,
    tableId: string
  ): Promise<
    {
      id: string;
      table: Table;
    } & Ticket
  > {
    const ticket = (await this.getTicketById(id)) as Ticket;

    const table = (await TableRepository.getTableById(tableId)) as Table;

    const ticketWaitingLimit = ticket.restaurant.ticketWaitingLimit;
    const deliveredAt = new Date();
    const closedAt = DateUpdates.addMinutesToDate(
      deliveredAt,
      ticketWaitingLimit
    );

    const deliveredTicket = await this.repository.save({
      id,
      table,
      deliveredAt,
      closedAt,
    });

    if (deliveredTicket && ticket.email) {
      EmailService.sendDeliveredTicketEmail(ticket, table);
    }

    return deliveredTicket;
  }

  public static async updatePlacedAt(id: string): Promise<
    {
      id: string;
    } & Ticket
  > {
    (await this.getTicketById(id)) as Ticket;

    const placedAt = new Date();
    const closedAt = DateUpdates.addMinutesToDate(placedAt, 240);

    return this.repository.save({
      id,
      placedAt,
      closedAt,
    });
  }

  public static async updateClosedAt(id: string): Promise<
    {
      id: string;
    } & Ticket
  > {
    const ticket = (await this.getTicketById(id)) as Ticket;

    const minutesToSubstract =
      ticket.restaurant.notComingTicketDisapearDelay + 1;
    const closedAt =
      ticket.deliveredAt && !ticket.placedAt
        ? DateUpdates.substractMinutesToDate(new Date(), minutesToSubstract)
        : new Date();

    return await this.repository.save({
      id,
      closedAt,
    });
  }
}
