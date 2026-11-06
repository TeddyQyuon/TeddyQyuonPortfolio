# Run after npm run build, with npm run preview running separately.
# External npm cache tool; does not add a project dependency.
$env:CHROME_PATH = 'C:\Program Files\Google\Chrome\Application\chrome.exe'
foreach ($pageName in @('home', 'gamevault')) {
  $url = if ($pageName -eq 'home') { 'http://127.0.0.1:4174/' } else { 'http://127.0.0.1:4174/projects/gamevault-marketplace' }
  foreach ($device in @('mobile', 'desktop')) {
    foreach ($run in 1..3) {
      $flags = @($url, '--chrome-flags=--headless=new', '--output=json', "--output-path=docs/uiux-baseline/$pageName-$device-$run.json", '--quiet')
      if ($device -eq 'desktop') { $flags += '--preset=desktop' }
      npm exec --yes --package=lighthouse@13.6.0 -- lighthouse @flags
      if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
    }
  }
}
node docs/uiux-baseline/summarize.cjs
