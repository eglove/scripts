import { projectBuilder } from "@ethang/project-builder/project-builder.js";

await projectBuilder("scripts", "master", {
  preVersionBumpScripts: ["UPDATE", "PRUNE"],
  postVersionBumpScripts: ["DEDUPE", "LINT"],
  isLibrary: false,
});
