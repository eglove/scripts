import { execSync } from "node:child_process";

const projectPrefix = "/Users/hello/Projects/ethang";

const projects = [
  "project-builder",
  "scripts",
  "eslint-config-ethang",
  "toolbelt",
  "hooks",
  "website-remix",
  "ethang-admin",
  "sterett-admin",
  "sterett-qwik",
  "examples",
];

for (const project of projects) {
  execSync(
    `cd ${projectPrefix}/${project} && pnpm up -i ${project === "example" ? "-r" : ""} --latest && git commit -am 'version bump' && git push`,
    {
      stdio: "inherit",
    },
  );
}
