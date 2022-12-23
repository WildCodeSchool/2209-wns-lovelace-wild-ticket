/* eslint-disable */
import * as types from "./graphql";
import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";

const documents = {
  "\n  query MyProfile {\n    myProfile {\n      id\n      email\n    }\n  }\n":
    types.MyProfileDocument,
  "\n  mutation SignIn($email: String!, $password: String!) {\n    signIn(email: $email, password: $password) {\n      id\n      email\n    }\n  }\n":
    types.SignInDocument,
  "\n  mutation createUser(\n    $login: String!\n    $email: String!\n    $password: String!\n    $role: String!\n  ) {\n    createUser(\n      login: $login\n      email: $email\n      password: $password\n      role: $role\n    ) {\n      id\n      email\n    }\n  }\n":
    types.CreateUserDocument,
};

export function graphql(
  source: "\n  query MyProfile {\n    myProfile {\n      id\n      email\n    }\n  }\n"
): typeof documents["\n  query MyProfile {\n    myProfile {\n      id\n      email\n    }\n  }\n"];
export function graphql(
  source: "\n  mutation SignIn($email: String!, $password: String!) {\n    signIn(email: $email, password: $password) {\n      id\n      email\n    }\n  }\n"
): typeof documents["\n  mutation SignIn($email: String!, $password: String!) {\n    signIn(email: $email, password: $password) {\n      id\n      email\n    }\n  }\n"];
export function graphql(
  source: "\n  mutation createUser(\n    $login: String!\n    $email: String!\n    $password: String!\n    $role: String!\n  ) {\n    createUser(\n      login: $login\n      email: $email\n      password: $password\n      role: $role\n    ) {\n      id\n      email\n    }\n  }\n"
): typeof documents["\n  mutation createUser(\n    $login: String!\n    $email: String!\n    $password: String!\n    $role: String!\n  ) {\n    createUser(\n      login: $login\n      email: $email\n      password: $password\n      role: $role\n    ) {\n      id\n      email\n    }\n  }\n"];

export function graphql(source: string): unknown;
export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
