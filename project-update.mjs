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

let failedProjects = [];

for (const project of projects) {
  try {
    execSync(`cd ${projectPrefix}/${project} && node build.mjs`, {
      stdio: "inherit",
    });
  } catch (error) {
    failedProjects.push(project);
  }
}

console.error('Failed:', failedProjects.join(', '));

execSync("pnpm store prune", {
  stdio: "inherit",
});
