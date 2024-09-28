import { projectBuilder } from "@ethang/project-builder/project-builder.js";

await projectBuilder("scripts", "master", {
  scripts: ["pnpm up -i --latest", "pnpm lint"],
  isLibrary: false,
});
