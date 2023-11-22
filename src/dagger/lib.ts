import Client, {
  Directory,
  DirectoryID,
  Secret,
  SecretID,
} from "../../deps.ts";

export const getDirectory = (
  client: Client,
  src: string | Directory | undefined = "."
) => {
  if (typeof src === "string" && src.startsWith("core.Directory")) {
    return client.directory({
      id: src as DirectoryID,
    });
  }
  return src instanceof Directory ? src : client.host().directory(src);
};

export const getDatabaseUrl = (client: Client, token?: string | Secret) => {
  if (Deno.env.get("DATABASE_URL")) {
    return client.setSecret("DATABASE_URL", Deno.env.get("DATABASE_URL")!);
  }
  if (token && typeof token === "string") {
    if (token.startsWith("core.Secret")) {
      return client.loadSecretFromID(token as SecretID);
    }
    return client.setSecret("DATABASE_URL", token);
  }
  if (token && token instanceof Secret) {
    return token;
  }
  return undefined;
};
