import { Arg, Args, Mutation, Query, Resolver } from "type-graphql";
import Ticket from "../../models/Ticket/Ticket.entity";
import TicketRepository from "../../models/Ticket/Ticket.repository";
import { CreateTicketArgs, UpdateTicketArgs} from "./Ticket.input";

@Resolver(Ticket)
export default class TicketResolver {
  @Query(() => [Ticket])
  Tickets(): Promise<Ticket[]> {
    return TicketRepository.getTickets();
  }

  @Mutation(() => Ticket)
  createTicket(
    @Args() {name, restaurant, email, phoneNumber }: CreateTicketArgs
  ): Promise<Ticket> {
    return TicketRepository.createTicket(name, restaurant, email, phoneNumber);
  }

  @Mutation(() => Ticket)
  updateDeliveredAt(@Args() { id, table }: UpdateTicketArgs
  ): Promise<Ticket> {
    return TicketRepository.updateDeliveredAt(id, table);
  }

  @Mutation(() => Ticket)
  updatePlacedAt(@Args() { id, table }: UpdateTicketArgs
  ): Promise<Ticket> {
    return TicketRepository.updatePlacedAt(id, table);
  }

  @Mutation(() => Ticket)
  updateClosedAt(@Arg("id") id: string): Promise<Ticket> {
    return TicketRepository.updateClosedAt(id);
  }
}