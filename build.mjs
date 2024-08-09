import { projectBuilder } from "@ethang/project-builder/project-builder.js";

await projectBuilder("scripts", "master", {
  scripts: ["UPDATE", "DEDUPE", "LINT"],
  isLibrary: false,
});
