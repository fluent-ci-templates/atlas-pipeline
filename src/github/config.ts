import { JobSpec, Workflow } from "fluent_github_actions";

export function generateYaml(): Workflow {
  const workflow = new Workflow("Atlas");

  const push = {
    branches: ["main"],
  };

  const migrate: JobSpec = {
    "runs-on": "ubuntu-latest",
    steps: [
      {
        uses: "actions/checkout@v2",
      },
      {
        name: "Setup Fluent CI",
        uses: "fluentci-io/setup-fluentci@v2",
      },
      {
        name: "Run Dagger Pipelines",
        run: "fluentci run atlas_pipeline",
      },
    ],
  };

  workflow.on({ push }).jobs({ migrate });

  return workflow;
}
