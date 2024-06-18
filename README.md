# Atlas Pipeline

[![fluentci pipeline](https://shield.fluentci.io/x/atlas_pipeline)](https://pkg.fluentci.io/atlas_pipeline)
![deno compatibility](https://shield.deno.dev/deno/^1.41)
[![dagger-min-version](https://shield.fluentci.io/dagger/v0.11.7)](https://dagger.io)
[![](https://jsr.io/badges/@fluentci/atlas)](https://jsr.io/@fluentci/atlas)
[![](https://img.shields.io/codecov/c/gh/fluent-ci-templates/atlas-pipeline)](https://codecov.io/gh/fluent-ci-templates/atlas-pipeline)
[![ci](https://github.com/fluent-ci-templates/atlas-pipeline/actions/workflows/ci.yml/badge.svg)](https://github.com/fluent-ci-templates/atlas-pipeline/actions/workflows/ci.yml)

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

## 🧩 Dagger Module

Use as a [Dagger](https://dagger.io) module:

```bash
dagger install github.com/fluent-ci-templates/atlas-pipeline@main
```

Call a function from the module:

```bash
dagger call migrate --src . --database-url env:DATABASE_URL
```

## 🛠️ Environment variables

| Variable         | Description                    | Required |
| ---------------- | ------------------------------ | -------- |
| DATABASE_URL     | The database connection string | Yes      |
| DATABASE_DEV_URL | The database connection string used for calculating migrations differences | No      |

## ✨ Jobs

| Job       | Description               |
| --------- | ------------------------- |
| migrate   | Apply database migrations |
| dry_run   | Dry run migrations        |

```typescript
dryRun(
  src: string | Directory,
  databaseUrl: string | Secret,
  databaseDevUrl?: string
): Promise<string>

migrate(
  src: string | Directory,
  databaseUrl: string | Secret,
  databaseDevUrl?: string
): Promise<string> 
```

## 👨‍💻 Programmatic usage

You can also use this pipeline programmatically:

```ts
import { migrate } from "jsr:@fluentci/atlas";

await migrate();
```
