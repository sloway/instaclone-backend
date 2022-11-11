import { gql } from "apollo-server";

export default gql`
  type Mutation {
    login(userName: String!, password: String!): LoginResult
  }
  type LoginResult {
    ok: Boolean!
    token: String
    error: String
  }
`;
