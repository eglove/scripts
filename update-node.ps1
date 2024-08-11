$currentLocation = Get-Location
Set-Location ~/projects/scripts
node update-node.mjs
npm i -g npm pnpm yarn typescript prisma nextui-cli
Set-Location $currentLocation
