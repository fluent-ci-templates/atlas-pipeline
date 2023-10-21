import { gql } from "../../deps.ts";

export const migrate = gql`
  query migrate($src: String!, $databaseUrl: String!) {
    migrate(src: $src, databaseUrl: $databaseUrl)
  }
`;

export const dryRun = gql`
  query dryRun($src: String!, $databaseUrl: String!) {
    dryRun(src: $src, databaseUrl: $databaseUrl)
  }
`;
