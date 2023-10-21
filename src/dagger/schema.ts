import {
  queryType,
  makeSchema,
  dirname,
  join,
  resolve,
  stringArg,
  nonNull,
} from "../../deps.ts";

import { migrate, dryRun } from "./jobs.ts";

const Query = queryType({
  definition(t) {
    t.string("migrate", {
      args: {
        src: nonNull(stringArg()),
        databaseUrl: nonNull(stringArg()),
      },
      resolve: async (_root, args, _ctx) =>
        await migrate(args.src, args.databaseUrl),
    });
    t.string("dryRun", {
      args: {
        src: nonNull(stringArg()),
        databaseUrl: nonNull(stringArg()),
      },
      resolve: async (_root, args, _ctx) =>
        await dryRun(args.src, args.databaseUrl),
    });
  },
});

export const schema = makeSchema({
  types: [Query],
  outputs: {
    schema: resolve(join(dirname(".."), dirname(".."), "schema.graphql")),
    typegen: resolve(join(dirname(".."), dirname(".."), "gen", "nexus.ts")),
  },
});