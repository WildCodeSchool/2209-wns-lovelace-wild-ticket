import { Field, ObjectType } from "type-graphql";

@ObjectType()
export default class Stats {
  constructor(
    tableCapacity: string[],
    countTicketsBySeat: number[],
    daysOfWeek: string[],
    countActualWeekTickets: number[],
    lastThirtyDays: string[],
    countLastThirtyDaysTickets: number[]
  ) {
    this.tableCapacity = tableCapacity;
    this.countTicketsBySeat = countTicketsBySeat;
    this.daysOfWeek = daysOfWeek;
    this.countActualWeekTickets = countActualWeekTickets;
    this.lastThirtyDays = lastThirtyDays;
    this.countLastThirtyDaysTickets = countLastThirtyDaysTickets;
  }

  @Field(() => [String])
  tableCapacity: string[];

  @Field(() => [Number])
  countTicketsBySeat: number[];

  @Field(() => [String])
  daysOfWeek: string[];

  @Field(() => [Number])
  countActualWeekTickets: number[];

  @Field(() => [String])
  lastThirtyDays: string[];

  @Field(() => [Number])
  countLastThirtyDaysTickets: number[];
}
