import { Field, Int, ObjectType } from "type-graphql";
import Ticket from "../../models/Ticket/Ticket.entity";

@ObjectType()
class PageOfTickets {
  @Field(() => Int)
  totalCount: number;

  @Field(() => [Ticket])
  tickets: Ticket[];
}

export default PageOfTickets;
