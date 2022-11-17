import { Arg, Args, Ctx, Mutation, Query, Resolver } from "type-graphql";

import Wilder from "../../models/Wilder/Wilder.entity";
import WilderRepository from "../../models/Wilder/Wilder.repository";
import { CreateWilderArgs, UpdateWilderArgs } from "./Wilder.input";

@Resolver(Wilder)
export default class WilderResolver {
  @Query(() => [Wilder])
  wilders(): Promise<Wilder[]> {
    return WilderRepository.getWilders();
  }

  @Mutation(() => Wilder)
  createWilder(
    @Args() { firstName, lastName }: CreateWilderArgs
  ): Promise<Wilder> {
    return WilderRepository.createWilder(firstName, lastName);
  }

  @Mutation(() => Wilder)
  updateWilder(
    @Args() { id, firstName, lastName }: UpdateWilderArgs
  ): Promise<Wilder> {
    return WilderRepository.updateWilder(id, firstName, lastName);
  }

  @Mutation(() => Wilder)
  deleteWilder(@Arg("id") id: string): Promise<Wilder> {
    return WilderRepository.deleteWilder(id);
  }

  @Mutation(() => Wilder)
  addSkillToWilder(
    @Arg("wilderId") wilderId: string,
    @Arg("skillId") skillId: string
  ): Promise<Wilder> {
    return WilderRepository.addSkillToWilder(wilderId, skillId);
  }
}
