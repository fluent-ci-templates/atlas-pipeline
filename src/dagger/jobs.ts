/**
 * @module atlas
 * @description This module provides a set of functions to run database migrations using Atlas.
 */
import { Directory, Secret, dag, env, exit } from "../../deps.ts";
import { getDirectory, getDatabaseUrl } from "./lib.ts";

export enum Job {
  migrate = "migrate",
  dryRun = "dry_run",
}

export const exclude = [];

/**
 * Run database migrations
 *
 * @function
 * @description Run database migrations
 * @param {string | Directory} src
 * @param {string | Secret} databaseUrl
 * @param {string} databaseDevUrl
 * @returns {string}
 */
export async function migrate(
  src: string | Directory,
  databaseUrl: string | Secret,
  databaseDevUrl?: string
): Promise<string> {
  const DATABASE_DEV_URL =
    env.get("DATABASE_DEV_URL") ||
    databaseDevUrl ||
    "mysql://root:pass@mysqldev:3306/example";

  const mysql = dag
    .container()
    .from("mysql")
    .withEnvVariable("MYSQL_ROOT_PASSWORD", "pass")
    .withEnvVariable("MYSQL_DATABASE", "example")
    .withExposedPort(3306)
    .asService();

  const mysqldev = dag
    .container()
    .from("mysql")
    .withEnvVariable("MYSQL_ROOT_PASSWORD", "pass")
    .withEnvVariable("MYSQL_DATABASE", "example")
    .withExposedPort(3306)
    .asService();

  const context = await getDirectory(src);
  const secret = await getDatabaseUrl(databaseUrl);
  if (!secret) {
    console.error("DATABASE_URL is not set");
    exit(1);
    return "";
  }

  const ctr = dag
    .pipeline(Job.migrate)
    .container()
    .from("alpine")
    .withServiceBinding("mysql", mysql)
    .withServiceBinding("mysqldev", mysqldev)
    .withExec(["apk", "update"])
    .withExec(["apk", "add", "curl"])
    .withExec(["sh", "-c", "curl -sSf https://atlasgo.sh | sh"])
    .withDirectory("/app", context)
    .withWorkdir("/app")
    .withSecretVariable("DATABASE_URL", secret)
    .withEnvVariable("DATABASE_DEV_URL", DATABASE_DEV_URL)
    .withExec([
      "sh",
      "-c",
      "atlas schema apply --url $DATABASE_URL --to file://schema.hcl --dev-url $DATABASE_DEV_URL --auto-approve",
    ]);

  return ctr.stdout();
}

/**
 * Run database migrations in dry run mode
 *
 * @function
 * @description Run database migrations in dry run mode
 * @param {string | Directory} src
 * @param {string | Secret} databaseUrl
 * @param {string} databaseDevUrl
 * @returns {string}
 */
export async function dryRun(
  src: string | Directory,
  databaseUrl: string | Secret,
  databaseDevUrl?: string
): Promise<string> {
  const context = await getDirectory(src);
  const DATABASE_DEV_URL =
    env.get("DATABASE_DEV_URL") ||
    databaseDevUrl ||
    "mysql://root:pass@mysqldev:3306/example";
  const secret = await getDatabaseUrl(databaseUrl);
  if (!secret) {
    console.error("DATABASE_URL is not set");
    Deno.exit(1);
  }

  const mysql = dag
    .container()
    .from("mysql")
    .withEnvVariable("MYSQL_ROOT_PASSWORD", "pass")
    .withEnvVariable("MYSQL_DATABASE", "example")
    .withExposedPort(3306)
    .asService();

  const mysqldev = dag
    .container()
    .from("mysql")
    .withEnvVariable("MYSQL_ROOT_PASSWORD", "pass")
    .withEnvVariable("MYSQL_DATABASE", "example")
    .withExposedPort(3306)
    .asService();

  const ctr = dag
    .pipeline(Job.migrate)
    .container()
    .from("alpine")
    .withServiceBinding("mysql", mysql)
    .withServiceBinding("mysqldev", mysqldev)
    .withExec(["apk", "update"])
    .withExec(["apk", "add", "curl"])
    .withExec(["sh", "-c", "curl -sSf https://atlasgo.sh | sh"])
    .withDirectory("/app", context)
    .withWorkdir("/app")
    .withEnvVariable("DATABASE_DEV_URL", DATABASE_DEV_URL)
    .withSecretVariable("DATABASE_URL", secret)
    .withExec([
      "sh",
      "-c",
      "atlas schem apply --url $DATABASE_URL --to file://schema.hcl --dev-url $DATABASE_DEV_URL --dry-run",
    ]);

  return ctr.stdout();
}

export type JobExec = (
  src: string | Directory,
  databaseUrl: string | Secret,
  databaseDevUrl?: string
) => Promise<string>;

export const runnableJobs: Record<Job, JobExec> = {
  [Job.migrate]: migrate,
  [Job.dryRun]: dryRun,
};

export const jobDescriptions: Record<Job, string> = {
  [Job.migrate]: "Run database migrations",
  [Job.dryRun]: "Run database migrations in dry run mode",
};
