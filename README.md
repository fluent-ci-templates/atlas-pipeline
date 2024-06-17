# Atlas Pipeline

[![fluentci pipeline](https://img.shields.io/badge/dynamic/json?label=pkg.fluentci.io&labelColor=%23000&color=%23460cf1&url=https%3A%2F%2Fapi.fluentci.io%2Fv1%2Fpipeline%2Fatlas_pipeline&query=%24.version)](https://pkg.fluentci.io/atlas_pipeline)
![deno compatibility](https://shield.deno.dev/deno/^1.41)
[![dagger-min-version](https://img.shields.io/badge/dagger-v0.11.7-blue?color=3D66FF&labelColor=000000&&logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGlkPSJDYWxxdWVfNSIgdmlld0JveD0iMCAwIDIyMS4xMDIgMjIxLjEwMiI%2BPGRlZnM%2BPHN0eWxlPi5jbHMtNHtmaWxsOiNiZTFkNDN9LmNscy01e2ZpbGw6IzEzMTIyNn0uY2xzLTZ7ZmlsbDojNDBiOWJjfTwvc3R5bGU%2BPC9kZWZzPjxjaXJjbGUgY3g9IjExMC41NTEiIGN5PSIxMTAuNTUxIiByPSIxMTAuNTI1IiBjbGFzcz0iY2xzLTUiLz48Y2lyY2xlIGN4PSIxMTAuNTUxIiBjeT0iMTEwLjU1MSIgcj0iOTQuODMzIiBjbGFzcz0iY2xzLTUiIHRyYW5zZm9ybT0icm90YXRlKC00NSAxMTAuNTUgMTEwLjU1MSkiLz48cGF0aCBkPSJNMTcuNTQ4IDkxLjk0NGE5NS4yODggOTUuMjg4IDAgMCAwLTEuNjk5IDIzLjYxNGM1LjgyOC4xMDEgMTAuODUxLTEuMDggMTQuMzQxLTQuMTIyIDE3LjMxNi0xNS4wOTMgNTAuMDg4LTEwLjgxMyA1MC4wODgtMTAuODEzcy0xMC4wNjQtMTcuMzczLTYyLjczLTguNjc5eiIgY2xhc3M9ImNscy02Ii8%2BPHBhdGggZD0iTTI2LjgxOSA2Ni4wMDJjNDkuMDUzLTE1LjA4NyA2MS42MDkgMTAuMTQgNjQuMjM0IDE4LjI4MiAwIDAgMy4wMDMtNDYuMDUyLTM0Ljc3OC01MS41YTk1LjI2NyA5NS4yNjcgMCAwIDAtMjkuNDU2IDMzLjIxOXoiIGNsYXNzPSJjbHMtNCIvPjxwYXRoIGZpbGw9IiNlZjdiMWEiIGQ9Ik0xMTAuMTY3IDcxLjExOHM1LjEzMy0zMi4yODQgMTQuMjI5LTU0LjM5YTk1LjYyOSA5NS42MjkgMCAwIDAtMjguNDE0LjEwNWM5LjA2OSAyMi4xMDQgMTQuMTg1IDU0LjI4NiAxNC4xODUgNTQuMjg2eiIvPjxwYXRoIGQ9Ik0xNjQuNzA0IDMyLjY5OGMtMzguNDU2IDUuMDE3LTM1LjQyMiA1MS41ODYtMzUuNDIyIDUxLjU4NiAyLjY0MS04LjE5MiAxNS4zMzYtMzMuNjg0IDY1LjE1MS0xNy45OTdhOTUuMjggOTUuMjggMCAwIDAtMjkuNzI5LTMzLjU4OXoiIGNsYXNzPSJjbHMtNCIvPjxwYXRoIGQ9Ik0yMDMuNTc5IDkyLjA3NGMtNTMuMzYzLTkuMDAzLTYzLjUyMiA4LjU1LTYzLjUyMiA4LjU1czMyLjc3Mi00LjI4IDUwLjA4OCAxMC44MTNjMy42NDIgMy4xNzQgOC45NTUgNC4zMTkgMTUuMTA5IDQuMDk4YTk1LjMzNyA5NS4zMzcgMCAwIDAtMS42NzUtMjMuNDYxeiIgY2xhc3M9ImNscy02Ii8%2BPHBhdGggZmlsbD0iI2ZjYzAwOSIgZD0iTTExMC41NTEgMjA1LjM4NGMyLjYzNyAwIDUuMjQ4LS4xMTMgNy44My0uMzI0LTYuMjU3LTEwLjg1Ny02LjYwOC0yNy4zODgtNi42MDgtMzcuNjE0IDAgMCA2LjI3MSAyNy44OTggMTMuOTE3IDM2LjcyOSAyNS41NC00LjA5OCA0Ny42NzItMTguMzkgNjIuMDg3LTM4LjU3NS0yLjY0Ny0yLjUyMy04LjQ0Ny01Ljk3MS0xNi4zNTkgMS4yMDUgMCAwIDMuNDgyLTEzLjc2IDE5LjExNS03LjMyOS0yLjg4Ny03LjY2NS0xMC41MzMtMTIuOTk0LTE5LjM1Mi0xMi4zMTgtOS4zNjkuNzE5LTE2Ljk1NSA4LjQyNi0xNy41NTMgMTcuODAzLS4zMSA0Ljg2OCAxLjIyNCA5LjM1NyAzLjk0NSAxMi44ODQtNC45MTcuOTMxLTkuMTU5IDMuNzQ3LTExLjk2MyA3LjY2OS0uNzM2LTQuNTQyLTQuNjY1LTguMDE0LTkuNDE1LTguMDE0YTkuNDg5IDkuNDg5IDAgMCAwLTUuNzIgMS45MTZjLTIuMTExLTEuNzMxLTQuNDEzLTQuNDMyLTYuNzAxLTcuODY0LTYuMDMzLTkuMDQ5LTguNjQ2LTIyLjgyNi05LjY0My0zMC43Mi0uMjUzLTEuOTk4LTEuOTUtMy40OS0zLjk2NC0zLjQ5cy0zLjcxMSAxLjQ5MS0zLjk2NCAzLjQ5Yy0uOTk3IDcuODk0LTQuMzAxIDIxLjY3MS0xMC4zMzUgMzAuNzItNy42OTYgMTEuNTQ0LTEzLjA4MyAxMi42OTktMTYuMjkgMGwtLjA1OS4wMTRjLTIuNjk3LTkuNTUyLTExLjQ1Ny0xNi41Ni0yMS44NzMtMTYuNTYtOS43MTggMC0xNy45NzUgNi4xMDktMjEuMjI3IDE0LjY4NWE5NS4zMjcgOTUuMzI3IDAgMCAwIDEwLjkwMSAxMS41MzFjMTEuODQ3LTEwLjIzNyAyMS44NjggMy42NjkgMjEuODY4IDMuNjY5LTguNTIxLTMuOTEtMTQuMzUzLTIuODUtMTguMTg2LS41MzggMTEuMzgzIDkuMTk2IDI0LjkzNCAxNS44MTIgMzkuNzY5IDE4Ljk2IDYuMTkxLTcuMTE1IDEyLjE1MS0yMC4zNDUgMTIuMTUxLTIwLjM0NSAwIDQuNDgzLTIuNTggMTQuOTAyLTYuNDAxIDIxLjM4MmE5NS41NzMgOTUuNTczIDAgMCAwIDE0LjAyOSAxLjAzNXoiLz48cGF0aCBmaWxsPSIjZmZmIiBkPSJNMTEzLjIwOCA4MS43OTVhNC4wNzggNC4wNzggMCAwIDAtMy4wNC0xLjM1MiA0LjA4MSA0LjA4MSAwIDAgMC0zLjA0IDEuMzUyYy0yMS40ODIgMjMuNzg5LTI2Ljc1MSA1NS43MjgtMjAuNTc1IDU5Ljk3NCA2LjQ1OSA0LjQ0IDE0LjUzMi0xNC45MzIgMjMuMjExLTE1LjEzM2guODA4YzguNjc4LjIwMiAxNi43NTIgMTkuNTc0IDIzLjIxMSAxNS4xMzMgNi4xNzctNC4yNDcuOTA4LTM2LjE4Ni0yMC41NzUtNTkuOTc0em0tMy4wNCAzMS41NjhhNi4zNyA2LjM3IDAgMSAxIDAtMTIuNzQgNi4zNyA2LjM3IDAgMCAxIDAgMTIuNzR6Ii8%2BPC9zdmc%2B)](https://dagger.io)
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
