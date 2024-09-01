import { execSync } from "node:child_process";

const projectPrefix = "/Users/glove/projects";

const projects = [
  "eslint-plugin",
  "eslint-config-ethang",
  "project-builder",
  "markdown-generator",
  "scripts",
  "toolbelt",
  "hooks",
  "ethang-profile",
  "sterett-admin",
  "sterett-react",
];

for (const project of projects) {
  try {
    execSync(`cd ${projectPrefix}/${project} && node build.mjs`, {
      stdio: "inherit",
    });
  } catch (error) {
    // Move on to next project
    console.error(error);
  }
}

execSync("pnpm store prune", {
  stdio: "inherit",
});
