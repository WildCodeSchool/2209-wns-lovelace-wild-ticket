import { Arg, Args, Mutation, Query, Resolver } from "type-graphql";

import Table from "../../models/Table/Table.entity";
import TableRepository from "../../models/Table/Table.repository";
import { CreateTableArgs, UpdateTableArgs } from "./Table.input";

@Resolver(Table)
export default class TableResolver {
  @Query(() => Table)
  Table(@Arg("id") id:string): Promise<Table | null> {
    return TableRepository.getTableById(id);
  }

  @Query(() => [Table])
  Tables(): Promise<Table[]> {
    return TableRepository.getTables();
  }

  @Mutation(() => Table)
  createTable(
    @Args() { number, capacity }: CreateTableArgs
  ): Promise<Table> {
    return TableRepository.createTable(number, capacity);
  }

  @Mutation(() => Table)
  updateTable(
    @Args() { id, number, capacity }: UpdateTableArgs
  ): Promise<Table> {
    return TableRepository.updateTable(id, number, capacity);
  }

  @Mutation(() => Table)
  deleteTable(@Arg("id") id: string): Promise<Table> {
    return TableRepository.deleteTable(id);
  }
}