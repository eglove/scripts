import { execSync } from "node:child_process";

const projectPrefix = "/Users/glove/projects";

const projects = [
  "eslint-config-ethang",
  "project-builder",
  "markdown-generator",
  "react-components",
  "store",
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

if (failedProjects.length > 0) {
  console.error("Failed:", failedProjects.join(", "));
}

execSync("pnpm store prune", {
  stdio: "inherit",
});
