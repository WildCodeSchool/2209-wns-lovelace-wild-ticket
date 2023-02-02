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
} from "./AppUser.input";
import { setSessionIdInCookie } from "../../http-utils";
import { GlobalContext } from "../..";

@Resolver(AppUser)
export default class AppUserResolver {
  @Authorized("ROLE_ADMIN")
  @Query(() => [AppUser])
  getUsers(): Promise<AppUser[]> {
    return AppUserRepository.getUsers();
  }

  @Authorized()
  @Query(() => AppUser)
  getUserById(@Arg("id") id: string): Promise<AppUser | null> {
    return AppUserRepository.getUserById(id);
  }

  @Authorized("ROLE_ADMIN")
  @Mutation(() => AppUser)
  createUser(
    @Args()
    { login, email, password, role, poles, restaurant }: UserCreationArgs
  ): Promise<AppUser> {
    return AppUserRepository.createUser(
      login,
      email,
      password,
      role,
      poles,
      restaurant
    );
  }

  @Authorized()
  @Mutation(() => AppUser)
  updateUser(
    @Args() { id, login, email, role, poles, restaurant }: UserUpdateArgs
  ): Promise<AppUser> {
    return AppUserRepository.updateUser(
      id,
      login,
      email,
      role,
      poles,
      restaurant
    );
  }

  @Authorized("ROLE_ADMIN")
  @Mutation(() => AppUser)
  deleteUser(@Arg("id") id: string): Promise<AppUser> {
    return AppUserRepository.deleteUser(id);
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
  async signOut(@Arg("id") id: string): Promise<AppUser> {
    return AppUserRepository.signOut(id);
  }

  @Authorized()
  @Mutation(() => AppUser)
  async updateUserPassword(
    @Args() { id, password }: updateUserPasswordArgs
  ): Promise<AppUser> {
    return AppUserRepository.updateUserPassword(id, password);
  }

  @Authorized()
  @Query(() => AppUser)
  async myProfile(@Ctx() context: GlobalContext): Promise<AppUser> {
    return context.user as AppUser;
  }
}
