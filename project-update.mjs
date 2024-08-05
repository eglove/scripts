import { execSync } from "node:child_process";

const projectPrefix = "~/projects";

const projects = [
  "eslint-config-ethang",
  "project-builder",
  "scripts",
  "toolbelt",
  "hooks",
  "ethang-astro",
  "sterett-admin",
  "sterett-react",
];

for (const project of projects) {
  execSync(`cd ${projectPrefix}/${project} && node build.mjs`, {
    stdio: "inherit",
  });
}

execSync("pnpm store prune", {
  stdio: "inherit",
});
