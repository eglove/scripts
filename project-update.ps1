$currentLocation = Get-Location
Set-Location ~/Projects/ethang/scripts
node project-update.mjs
Set-Location $currentLocation
