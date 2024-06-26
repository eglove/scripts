import { execSync } from "node:child_process";

const projectPrefix = "/Users/hello/Projects/ethang";

const projects = [
  "project-builder",
  "scripts",
  "eslint-config-ethang",
  "toolbelt",
  "hooks",
  "ethang-astro",
  "sterett-admin",
  "sterett-qwik",
];

for (const project of projects) {
  execSync(`cd ${projectPrefix}/${project} && node build.mjs`, {
    stdio: "inherit",
  });
}

execSync("pnpm store prune", {
  stdio: "inherit",
});
