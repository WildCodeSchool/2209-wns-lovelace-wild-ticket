import { Arg, Args, Authorized, Mutation, Query, Resolver } from "type-graphql";
import Ticket from "../../models/Ticket/Ticket.entity";
import TicketRepository from "../../models/Ticket/Ticket.repository";
import {
  CreateTicketArgs,
  GetExportTicketsByRestaurantArgs,
  GetTicketsByRestaurantArgs,
  UpdateTicketArgs,
  getPaginatedAndSortedTicketsArgs,
} from "./Ticket.input";
import PageOfTickets from "./PageOfTickets";

@Resolver(Ticket)
export default class TicketResolver {
  @Authorized()
  @Query(() => [Ticket])
  Tickets(): Promise<Ticket[]> {
    return TicketRepository.getTickets();
  }

  //TODO: Find a way to secure this query (used in mobile-app)
  @Query(() => [Ticket])
  TicketsByRestaurant(
    @Args() { restaurantId, seats }: GetTicketsByRestaurantArgs
  ): Promise<Ticket[] | null> {
    return TicketRepository.getTicketsByRestaurant(restaurantId, seats);
  }

  @Authorized("ROLE_RESTAURANT")
  @Query(() => PageOfTickets)
  PaginatedAndSortedTickets(
    @Args()
    {
      restaurantId,
      globalFilter,
      pageSize,
      pageNumber,
      sort,
      order,
    }: getPaginatedAndSortedTicketsArgs
  ): Promise<PageOfTickets> {
    return TicketRepository.getPaginatedAndSortedTicketsByRestaurant(
      restaurantId,
      globalFilter,
      pageSize,
      pageNumber,
      sort,
      order
    );
  }

  @Query(() => [Ticket])
  @Authorized("ROLE_RESTAURANT")
  WaitingTicketsByRestaurant(
    @Args() { restaurantId, seats }: GetTicketsByRestaurantArgs
  ): Promise<Ticket[] | null> {
    return TicketRepository.getWaitingTicketsByRestaurant(restaurantId, seats);
  }

  @Query(() => [Ticket])
  @Authorized("ROLE_RESTAURANT")
  PlacedTicketsByRestaurant(
    @Args() { restaurantId, seats }: GetTicketsByRestaurantArgs
  ): Promise<Ticket[] | null> {
    return TicketRepository.getPlacedTicketsByRestaurant(restaurantId, seats);
  }

  @Query(() => [Ticket])
  @Authorized("ROLE_RESTAURANT")
  ExportTicketsByRestaurant(
    @Args() { restaurantId, dateMin, dateMax }: GetExportTicketsByRestaurantArgs
  ): Promise<Ticket[] | null> {
    return TicketRepository.getExportTicketsByRestaurant(
      restaurantId,
      dateMin,
      dateMax
    );
  }

  @Authorized("ROLE_RESTAURANT")
  @Query(() => Ticket)
  Ticket(@Arg("id") id: string): Promise<Ticket | null> {
    return TicketRepository.getTicketById(id);
  }

  @Mutation(() => Ticket)
  createTicket(
    @Args() { name, seats, restaurant, email, phoneNumber }: CreateTicketArgs
  ): Promise<Ticket> {
    return TicketRepository.createTicket(
      name,
      seats,
      restaurant,
      email,
      phoneNumber
    );
  }

  @Authorized("ROLE_RESTAURANT")
  @Mutation(() => Ticket)
  updateDeliveredAt(@Args() { id, table }: UpdateTicketArgs): Promise<Ticket> {
    return TicketRepository.updateDeliveredAt(id, table);
  }

  @Authorized("ROLE_RESTAURANT")
  @Mutation(() => Ticket)
  updatePlacedAt(@Arg("id") id: string): Promise<Ticket> {
    return TicketRepository.updatePlacedAt(id);
  }

  @Authorized("ROLE_RESTAURANT")
  @Mutation(() => Ticket)
  updateClosedAt(@Arg("id") id: string): Promise<Ticket> {
    return TicketRepository.updateClosedAt(id);
  }
}
