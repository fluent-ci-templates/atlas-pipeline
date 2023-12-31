# Azure Pipelines

[![deno module](https://shield.deno.dev/x/codecov_pipeline)](https://deno.land/x/deno_pipeline)
![deno compatibility](https://shield.deno.dev/deno/^1.34)
[![](https://img.shields.io/codecov/c/gh/fluent-ci-templates/deno-pipeline)](https://codecov.io/gh/fluent-ci-templates/deno-pipeline)

The following command will generate a `azure-pipelines.yml` file in your project:

```bash
fluentci ap init -t deno_pipeline
```

Generated file:

```yaml
# Do not edit this file directly. It is generated by https://deno.land/x/fluent_azure_pipelines

trigger:
  - main
pool:
  name: Default
  vmImage: ubuntu-latest
steps:
  - script: |
        curl -fsSL https://deno.land/x/install/install.sh | sh
        export DENO_INSTALL="$HOME/.deno"
        export PATH="$DENO_INSTALL/bin:$PATH"
    displayName: Install Deno
  - script: deno install -A -r https://cli.fluentci.io -n fluentci
    displayName: Setup Fluent CI CLI
  - script: |
        curl -L https://dl.dagger.io/dagger/install.sh | DAGGER_VERSION=0.8.4 sh
        sudo mv bin/dagger /usr/local/bin
        dagger version
    displayName: Setup Dagger
  - script: dagger run fluentci deno_pipeline fmt lint test
    displayName: Run Dagger Pipelines

```

Feel free to edit the template generator at `.fluentci/src/azure/config.ts` to your needs.
