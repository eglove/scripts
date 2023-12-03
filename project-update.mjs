import { execSync } from "node:child_process";

const projectPrefix = "/Users/hello/Projects/ethang";

const projects = [
  "project-builder",
  "scripts",
  "eslint-config-ethang",
  "hooks",
  "use-form",
  "util",
  "fetch",
  "website-remix",
  "ethang-admin",
  "introspect",
  "sterett-admin",
  "sterett",
  "examples",
];

for (const project of projects) {
  execSync(`cd ${projectPrefix}/${project}`);
  execSync(`node build.mjs`);
}
