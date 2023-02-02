import { Arg, Args, Authorized, Mutation, Query, Resolver } from "type-graphql";
import Table from "../../models/Table/Table.entity";
import TableRepository from "../../models/Table/Table.repository";
import { CreateTableArgs, UpdateTableArgs } from "./Table.input";

@Resolver(Table)
export default class TableResolver {
  @Authorized("ROLE_RESTAURANT")
  @Query(() => Table)
  Table(@Arg("id") id: string): Promise<Table | null> {
    return TableRepository.getTableById(id);
  }

  @Authorized()
  @Query(() => [Table])
  Tables(): Promise<Table[]> {
    return TableRepository.getTables();
  }

  @Authorized("ROLE_RESTAURANT")
  @Query(() => [Table])
  TablesByRestaurant(@Arg("id") id: string): Promise<Table[] | null> {
    return TableRepository.getTablesByRestaurant(id);
  }

  @Authorized("ROLE_RESTAURANT")
  @Mutation(() => Table)
  createTable(
    @Args() { number, capacity, restaurant }: CreateTableArgs
  ): Promise<Table> {
    return TableRepository.createTable(number, capacity, restaurant);
  }

  @Authorized("ROLE_RESTAURANT")
  @Mutation(() => Table)
  updateTable(
    @Args() { id, number, capacity }: UpdateTableArgs
  ): Promise<Table> {
    return TableRepository.updateTable(id, number, capacity);
  }

  @Authorized("ROLE_RESTAURANT")
  @Mutation(() => Table)
  deleteTable(@Arg("id") id: string): Promise<Table> {
    return TableRepository.deleteTable(id);
  }
}
