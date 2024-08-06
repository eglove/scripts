$currentLocation = Get-Location
Set-Location ~/projects/scripts
node project-update.mjs
Set-Location $currentLocation
