# Visual Studio Update
dotnet tool update -g dotnet-vs
vs update --all

# Update software
choco upgrade all

# Node Update
nvm install 20
nvm use 20
npm i -g npm pnpm yarn
pnpm i -g @sanity/cli prettier typescript gatsby-cli
