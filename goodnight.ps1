node C:\Users\hello\Projects\ethang\eglove\git-history.mjs
Write-Host "Updating Windows..."
Update-Module PSWindowsUpdate
Get-WindowsUpdate -MicrosoftUpdate -AcceptAll -Install
#docker system prune -af
update
Stop-Computer
