import { projectBuilder } from "@ethang/project-builder/project-builder.js";

await projectBuilder("scripts", "master", {
  preVersionBumpScripts: ["UPDATE"],
  postVersionBumpScripts: ["DEDUPE", "LINT"],
  isLibrary: false,
});
