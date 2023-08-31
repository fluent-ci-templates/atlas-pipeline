import Client from "@dagger.io/dagger";

export enum Job {
  migrate = "migrate",
}

export const migrate = async (client: Client, src = ".") => {
  const context = client.host().directory(src);
  const ctr = client
    .pipeline(Job.migrate)
    .container()
    .from("alpine")
    .withExec(["apk", "update"])
    .withExec(["apk", "add", "curl"])
    .withExec(["sh", "-c", "curl -sSf https://atlasgo.sh | sh"])
    .withDirectory("/app", context)
    .withWorkdir("/app")
    .withExec(["atlas", "--help"]);

  const result = await ctr.stdout();

  console.log(result);
};

export type JobExec = (
  client: Client,
  src?: string
) =>
  | Promise<void>
  | ((
      client: Client,
      src?: string,
      options?: {
        ignore: string[];
      }
    ) => Promise<void>);

export const runnableJobs: Record<Job, JobExec> = {
  [Job.migrate]: migrate,
};

export const jobDescriptions: Record<Job, string> = {
  [Job.migrate]: "Run database migrations",
};
