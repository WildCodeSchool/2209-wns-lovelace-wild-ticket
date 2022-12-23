import { Arg, Args, Mutation, Query, Resolver } from "type-graphql";
import Ticket from "../../models/Ticket/Ticket.entity";
import TicketRepository from "../../models/Ticket/Ticket.repository";
import { CreateTicketArgs} from "./Ticket.input";

@Resolver(Ticket)
export default class TicketResolver {
  @Query(() => [Ticket])
  Tickets(): Promise<Ticket[]> {
    return TicketRepository.getTickets();
  }

  @Mutation(() => Ticket)
  createTicket(
    @Args() {name, email, phoneNumber }: CreateTicketArgs
  ): Promise<Ticket> {
    return TicketRepository.createTicket(name, email, phoneNumber);
  }


  @Mutation(() => Ticket)
  updateClosedAt(@Arg("id") id: string): Promise<Ticket> {
    return TicketRepository.updateClosedAt(id);
  }
}