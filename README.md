# Atlas Pipeline

[![fluentci pipeline](https://img.shields.io/badge/dynamic/json?label=pkg.fluentci.io&labelColor=%23000&color=%23460cf1&url=https%3A%2F%2Fapi.fluentci.io%2Fv1%2Fpipeline%2Fatlas_pipeline&query=%24.version)](https://pkg.fluentci.io/atlas_pipeline)
![deno compatibility](https://shield.deno.dev/deno/^1.37)
[![](https://img.shields.io/codecov/c/gh/fluent-ci-templates/atlas-pipeline)](https://codecov.io/gh/fluent-ci-templates/atlas-pipeline)

A ready-to-use CI/CD Pipeline for managing your database migrations with [Atlas](https://atlasgo.io/)

## 🚀 Usage

Run the following command in your project:

```bash
fluentci run atlas_pipeline
```

Or, if you want to use it as a template:

```bash
fluentci init -t atlas
```

This will create a `.fluentci` folder in your project.

Now you can run the pipeline with:

```bash
fluentci run .
```

## Dagger Module

Use as a [Dagger](https://dagger.io) module:

```bash
dagger mod install github.com/fluent-ci-templates/atlas-pipeline@mod
```

## Environment variables

| Variable         | Description                    | Required |
| ---------------- | ------------------------------ | -------- |
| DATABASE_URL     | The database connection string | Yes      |
| DATABASE_DEV_URL | The database connection string used for calculating migrations differences | No      |

## Jobs

| Job       | Description               |
| --------- | ------------------------- |
| migrate   | Apply database migrations |
| dry_run   | Dry run migrations        |

```graphql
 dryRun(
  databaseDevUrl: String,
  databaseUrl: String!,
  src: String!
 ): String
 migrate(
  databaseDevUrl: String, 
  databaseUrl: String!, 
  src: String!
 ): String
```

## Programmatic usage

You can also use this pipeline programmatically:

```ts
import { migrate } from "https://pkg.fluentci.io/atlas_pipeline@v0.5.1/mod.ts";

await migrate();
```
