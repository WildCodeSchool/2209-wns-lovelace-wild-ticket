import { Arg, Args, Ctx, Mutation, Query, Resolver } from "type-graphql";

import Pole from "../../models/Pole/Pole.entity";
import PoleRepository from "../../models/Pole/Pole.repository";
import { CreatePoleArgs, UpdatePoleArgs } from "./Pole.input";

@Resolver(Pole)
export default class PoleResolver {
  @Query(() => [Pole])
  poles(): Promise<Pole[]> {
    return PoleRepository.getPoles();
  }

  @Mutation(() => Pole)
  createPole(
    @Args() { name, address, zipCode, city, email }: CreatePoleArgs
  ): Promise<Pole> {
    return PoleRepository.createPole(name, address, zipCode, city, email);
  }

  @Mutation(() => Pole)
  updatePoleName(
    @Args() { id, name, address, zipCode, city, email }: UpdatePoleArgs
  ): Promise<Pole> {
    return PoleRepository.updatePole(id, name, address, zipCode, city, email);
  }

  @Mutation(() => Pole)
  deletePole(@Arg("id") id: string): Promise<Pole> {
    return PoleRepository.deletePole(id);
  }
}
