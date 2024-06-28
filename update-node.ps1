$currentLocation = Get-Location
Set-Location ~/Projects/ethang/scripts
node update-node.mjs
npm i -g npm pnpm yarn
Set-Location $currentLocation
