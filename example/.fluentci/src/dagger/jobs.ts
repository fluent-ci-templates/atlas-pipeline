import Client, { Directory, Secret } from "../../deps.ts";
import { connect } from "../../sdk/connect.ts";
import { getDirectory, getDatabaseUrl } from "./lib.ts";

export enum Job {
  migrate = "migrate",
  dryRun = "dry_run",
}

export const exclude = [];

export const migrate = async (
  src: string | Directory | undefined = ".",
  databaseUrl?: string | Secret,
  databaseDevUrl?: string
) => {
  await connect(async (client: Client) => {
    const DATABASE_DEV_URL =
      Deno.env.get("DATABASE_DEV_URL") ||
      databaseDevUrl ||
      "mysql://root:pass@mysqldev:3306/example";

    const mysql = client
      .container()
      .from("mysql")
      .withEnvVariable("MYSQL_ROOT_PASSWORD", "pass")
      .withEnvVariable("MYSQL_DATABASE", "example")
      .withExposedPort(3306)
      .asService();

    const mysqldev = client
      .container()
      .from("mysql")
      .withEnvVariable("MYSQL_ROOT_PASSWORD", "pass")
      .withEnvVariable("MYSQL_DATABASE", "example")
      .withExposedPort(3306)
      .asService();

    const context = getDirectory(client, src);
    const secret = getDatabaseUrl(client, databaseUrl);
    if (!secret) {
      console.error("DATABASE_URL is not set");
      Deno.exit(1);
    }

    const ctr = client
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

    const result = await ctr.stdout();

    console.log(result);
  });
  return "Done";
};

export const dryRun = async (
  src: string | Directory | undefined = ".",
  databaseUrl?: string | Secret,
  databaseDevUrl?: string
) => {
  await connect(async (client: Client) => {
    const context = getDirectory(client, src);
    const DATABASE_DEV_URL =
      Deno.env.get("DATABASE_DEV_URL") ||
      databaseDevUrl ||
      "mysql://root:pass@mysqldev:3306/example";
    const secret = getDatabaseUrl(client, databaseUrl);
    if (!secret) {
      console.error("DATABASE_URL is not set");
      Deno.exit(1);
    }

    const mysql = client
      .container()
      .from("mysql")
      .withEnvVariable("MYSQL_ROOT_PASSWORD", "pass")
      .withEnvVariable("MYSQL_DATABASE", "example")
      .withExposedPort(3306)
      .asService();

    const mysqldev = client
      .container()
      .from("mysql")
      .withEnvVariable("MYSQL_ROOT_PASSWORD", "pass")
      .withEnvVariable("MYSQL_DATABASE", "example")
      .withExposedPort(3306)
      .asService();

    const ctr = client
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

    const result = await ctr.stdout();

    console.log(result);
  });
  return "Done";
};

export type JobExec = (
  src?: string,
  databaseUrl?: string | Secret,
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
