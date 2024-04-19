use extism_pdk::*;
use fluentci_pdk::dag;

use crate::helpers::setup_atlas;

pub mod helpers;

#[plugin_fn]
pub fn setup() -> FnResult<String> {
    let stdout = setup_atlas()?;
    Ok(stdout)
}

#[plugin_fn]
pub fn migrate(args: String) -> FnResult<String> {
    setup_atlas()?;

    let stdout = dag()
        .pipeline("migrate")?
        .with_exec(vec!["atlas schema apply --url $DATABASE_URL --to file://schema.hcl --dev-url $DATABASE_DEV_URL", &args])?
        .stdout()?;
    Ok(stdout)
}

#[plugin_fn]
pub fn dry_run(args: String) -> FnResult<String> {
    setup_atlas()?;

    let stdout = dag()
        .pipeline("dry_run")?
        .with_exec(vec!["atlas schema apply --url $DATABASE_URL --to file://schema.hcl --dev-url $DATABASE_DEV_URL --dry-run", &args])?
        .stdout()?;
    Ok(stdout)
}
