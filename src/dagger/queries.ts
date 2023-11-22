import { gql } from "../../deps.ts";

export const migrate = gql`
  query migrate($src: String!, $databaseUrl: String!, $databaseDevUrl: String) {
    migrate(
      src: $src
      databaseUrl: $databaseUrl
      databaseDevUrl: $databaseDevUrl
    )
  }
`;

export const dryRun = gql`
  query dryRun($src: String!, $databaseUrl: String!, $databaseDevUrl: String) {
    dryRun(
      src: $src
      databaseUrl: $databaseUrl
      databaseDevUrl: $databaseDevUrl
    )
  }
`;
