# Visual Studio Update
dotnet tool update -g dotnet-vs
vs update --all

# Update software
choco upgrade all

# Node Update
nvm install latest
nvm use latest
npm i -g @sanity/cli empty-trash-cli jest npm nx pnpm trash-cli turbo yarn typescript
