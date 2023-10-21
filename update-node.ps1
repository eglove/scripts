nvm install lts
nvm use lts

$nodeVersionList = nvm list
$nodeVersionRegex = '\d+\.\d+\.\d+'

$allVersions = Select-String -Input $nodeVersionList -Pattern $nodeVersionRegex -AllMatches |
        ForEach-Object { $_.Matches } |
        ForEach-Object { $_.Value }

$activeVersion = ($nodeVersionList -split '\n') |
        Where-Object {$_ -match '\*'} |
        Select-String -Pattern $nodeVersionRegex -AllMatches |
        ForEach-Object { $_.Matches } |
        ForEach-Object { $_.Value }

foreach ($version in $allVersions) {
    if ($version -ne $activeVersion) {
        nvm uninstall $version
    }
}

npm i -g npm pnpm yarn
pnpm i -g @sanity/cli prettier typescript
