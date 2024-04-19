use anyhow::Error;
use fluentci_pdk::dag;

pub fn setup_atlas() -> Result<String, Error> {
    let stdout = dag()
        .pkgx()?
        .with_exec(vec![
            "type atlas > /dev/null || pkgx curl -sSf https://atlasgo.sh | sh -s -- --yes",
        ])?
        .with_exec(vec!["atlas", "version"])?
        .stdout()?;
    Ok(stdout)
}
