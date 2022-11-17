import { Args, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import AppUser from "../../models/AppUser/AppUser.entity";
import AppUserRepository from "../../models/AppUser/AppUser.repository";
import { SignInArgs, SignUpArgs } from "./AppUser.input";
import { setSessionIdInCookie } from "../../http-utils";
import { GlobalContext } from "../..";

@Resolver(AppUser)
export default class AppUserResolver {
  @Mutation(() => AppUser)
  signUp(
    @Args() { firstName, lastName, emailAddress, password }: SignUpArgs
  ): Promise<AppUser> {
    return AppUserRepository.createUser(
      firstName,
      lastName,
      emailAddress,
      password
    );
  }

  @Mutation(() => AppUser)
  async signIn(
    @Args() { emailAddress, password }: SignInArgs,
    @Ctx() context: GlobalContext
  ): Promise<AppUser> {
    const { user, session } = await AppUserRepository.signIn(
      emailAddress,
      password
    );
    setSessionIdInCookie(context, session.id);
    return user;
  }

  @Authorized()
  @Query(() => AppUser)
  async myProfile(@Ctx() context: GlobalContext): Promise<AppUser> {
    return context.user as AppUser;
  }
}
