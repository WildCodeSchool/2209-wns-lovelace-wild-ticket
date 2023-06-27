import {
  Arg,
  Args,
  Authorized,
  Ctx,
  Mutation,
  Query,
  Resolver,
} from "type-graphql";
import AppUser from "../../models/AppUser/AppUser.entity";
import AppUserRepository from "../../models/AppUser/AppUser.repository";
import {
  SignInArgs,
  UserCreationArgs,
  UserUpdateArgs,
  updateUserPasswordArgs,
  prepareAndSendResetPasswordEmailArgs,
  updateUserPasswordWithTokenArgs,
} from "./AppUser.input";
import { setSessionIdInCookie } from "../../http-utils";
import { GlobalContext } from "../..";

@Resolver(AppUser)
export default class AppUserResolver {
  @Authorized("ROLE_ADMIN", "ROLE_SUPER_ADMIN")
  @Query(() => [AppUser])
  getUsers(): Promise<AppUser[]> {
    return AppUserRepository.getUsers();
  }

  @Authorized()
  @Query(() => AppUser)
  getUserById(@Arg("id") id: string): Promise<AppUser | null> {
    return AppUserRepository.getUserById(id);
  }

  @Authorized("ROLE_ADMIN", "ROLE_SUPER_ADMIN")
  @Mutation(() => AppUser)
  createUser(
    @Args()
    { firstname, lastname, email, role, restaurant }: UserCreationArgs
  ): Promise<AppUser> {
    return AppUserRepository.createUser(
      firstname,
      lastname,
      email,
      role,
      restaurant
    );
  }

  @Authorized()
  @Mutation(() => AppUser)
  updateUser(
    @Args() { id, firstname, lastname, email, role, restaurant }: UserUpdateArgs
  ): Promise<AppUser> {
    return AppUserRepository.updateUser(
      id,
      firstname,
      lastname,
      email,
      role,
      restaurant
    );
  }

  @Authorized("ROLE_ADMIN", "ROLE_SUPER_ADMIN")
  @Mutation(() => AppUser)
  deleteUser(@Arg("id") id: string): Promise<AppUser | null> {
    return AppUserRepository.deleteUser(id);
  }

  @Authorized()
  @Mutation(() => AppUser)
  async updateUserPassword(
    @Args() { id, password, newUserPassword }: updateUserPasswordArgs
  ): Promise<AppUser> {
    return AppUserRepository.updateUserPassword(id, password, newUserPassword);
  }

  @Mutation(() => Boolean)
  async updateUserPasswordWithToken(
    @Args() { token, password }: updateUserPasswordWithTokenArgs
  ): Promise<boolean> {
    await AppUserRepository.updateUserPasswordWithToken(token, password);
    return true;
  }

  @Mutation(() => Boolean)
  async prepareAndSendResetPasswordEmail(
    @Args() { email }: prepareAndSendResetPasswordEmailArgs
  ): Promise<boolean> {
    await AppUserRepository.prepareAndSendResetPasswordEmail(email);
    return true;
  }

  @Mutation(() => AppUser)
  async signIn(
    @Args() { email, password, rememberMe }: SignInArgs,
    @Ctx() context: GlobalContext
  ): Promise<AppUser> {
    const { user, session } = await AppUserRepository.signIn(email, password);
    setSessionIdInCookie(context, session.id, rememberMe);
    return user;
  }

  @Authorized()
  @Mutation(() => AppUser)
  async signOut(@Arg("id") id: string): Promise<AppUser | null> {
    return AppUserRepository.signOut(id);
  }

  @Authorized()
  @Query(() => AppUser)
  async myProfile(@Ctx() context: GlobalContext): Promise<AppUser> {
    return context.user as AppUser;
  }
}
