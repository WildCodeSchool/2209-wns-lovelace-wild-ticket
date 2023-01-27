import { Arg, Args, Mutation, Query, Resolver } from "type-graphql";
import Ticket from "../../models/Ticket/Ticket.entity";
import TicketRepository from "../../models/Ticket/Ticket.repository";
import { CreateTicketArgs, UpdateTicketArgs } from "./Ticket.input";

@Resolver(Ticket)
export default class TicketResolver {
  @Query(() => [Ticket])
  Tickets(): Promise<Ticket[]> {
    return TicketRepository.getTickets();
  }

  @Query(() => [Ticket])
  TicketsByRestaurant(@Arg("id") id: string): Promise<Ticket[] | null> {
    return TicketRepository.getTicketsByRestaurant(id);
  }

  @Query(() => Ticket)
  Ticket(@Arg("id") id: string): Promise<Ticket | null> {
    return TicketRepository.getTicketById(id);
  }

  @Mutation(() => Ticket)
  createTicket(
    @Args() { name, restaurant, email, phoneNumber }: CreateTicketArgs
  ): Promise<Ticket> {
    return TicketRepository.createTicket(name, restaurant, email, phoneNumber);
  }

  @Mutation(() => Ticket)
  updateDeliveredAt(@Args() { id, table }: UpdateTicketArgs): Promise<Ticket> {
    return TicketRepository.updateDeliveredAt(id, table);
  }

  @Mutation(() => Ticket)
  updatePlacedAt(@Arg("id") id: string): Promise<Ticket> {
    return TicketRepository.updatePlacedAt(id);
  }

  @Mutation(() => Ticket)
  updateClosedAt(@Arg("id") id: string): Promise<Ticket> {
    return TicketRepository.updateClosedAt(id);
  }
}
