import { projectBuilder } from "@ethang/project-builder/project-builder.js";

await projectBuilder("scripts", "master", {
  scripts: ["bun x taze latest -I", "bun lint"],
  isLibrary: false,
});
