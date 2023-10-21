import Client, { connect } from "../../deps.ts";

export enum Job {
  migrate = "migrate",
  dryRun = "dry_run",
}

export const exclude = [];

const DATABASE_DEV_URL =
  Deno.env.get("DATABASE_DEV_URL") || "mysql://root:pass@mysqldev:3306/example";

export const migrate = async (src = ".", databaseUrl?: string) => {
  const DATABASE_URL = Deno.env.get("DATABASE_URL") || databaseUrl;
  await connect(async (client: Client) => {
    if (!DATABASE_URL) {
      throw new Error("DATABASE_URL is not set");
    }

    const mysql = client
      .container()
      .from("mysql")
      .withEnvVariable("MYSQL_ROOT_PASSWORD", "pass")
      .withEnvVariable("MYSQL_DATABASE", "example")
      .withExposedPort(3306);

    const mysqldev = client
      .container()
      .from("mysql")
      .withEnvVariable("MYSQL_ROOT_PASSWORD", "pass")
      .withEnvVariable("MYSQL_DATABASE", "example")
      .withExposedPort(3306);

    const context = client.host().directory(src);
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
      .withExec([
        "atlas",
        "schema",
        "apply",
        "--url",
        DATABASE_URL, // "mysql://root:pass@localhost:3306/example",
        "--to",
        "file://schema.hcl",
        "--dev-url",
        DATABASE_DEV_URL,
        "--auto-approve",
      ]);

    const result = await ctr.stdout();

    console.log(result);
  });
  return "Done";
};

export const dryRun = async (src = ".", databaseUrl?: string) => {
  const DATABASE_URL = Deno.env.get("DATABASE_URL") || databaseUrl;
  await connect(async (client: Client) => {
    const context = client.host().directory(src);
    if (!DATABASE_URL) {
      throw new Error("DATABASE_URL is not set");
    }

    const mysql = client
      .container()
      .from("mysql")
      .withEnvVariable("MYSQL_ROOT_PASSWORD", "pass")
      .withEnvVariable("MYSQL_DATABASE", "example")
      .withExposedPort(3306);

    const mysqldev = client
      .container()
      .from("mysql")
      .withEnvVariable("MYSQL_ROOT_PASSWORD", "pass")
      .withEnvVariable("MYSQL_DATABASE", "example")
      .withExposedPort(3306);

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
      .withExec([
        "atlas",
        "schema",
        "apply",
        "--url",
        DATABASE_URL,
        "--to",
        "file://schema.hcl",
        "--dev-url",
        DATABASE_DEV_URL,
        "--dry-run",
      ]);

    const result = await ctr.stdout();

    console.log(result);
  });
  return "Done";
};

export type JobExec = (src?: string) =>
  | Promise<string>
  | ((
      src?: string,
      options?: {
        ignore: string[];
      }
    ) => Promise<string>);

export const runnableJobs: Record<Job, JobExec> = {
  [Job.migrate]: migrate,
  [Job.dryRun]: dryRun,
};

export const jobDescriptions: Record<Job, string> = {
  [Job.migrate]: "Run database migrations",
  [Job.dryRun]: "Run database migrations in dry run mode",
};
