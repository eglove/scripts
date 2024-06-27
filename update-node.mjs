import { execSync } from "node:child_process";

const inherit = { stdio: "inherit" };
const getReturn = { encoding: "utf8" };

const response = await fetch("https://nodejs.org/dist/index.json");
const data = await response.json();

const lts = data.find((item) => {
  return item["lts"] !== false;
});

const version = lts.version;

execSync(`fnm install ${version}`, inherit);
execSync(`fnm default ${version}`, inherit);
execSync(`fnm use ${version}`, inherit);

const versions = execSync("fnm list", getReturn);

const oldVersions = versions
  .split("\n")
  .map((line) => line.replace("*", "").trim())
  .filter((item) => {
    return item.startsWith("v") && !item.includes("default");
  });

for (const oldVersion of oldVersions) {
  try {
    execSync(`fnm uninstall ${oldVersion}`, inherit);
  } catch {
    // do nothing, this likely means process is still locked
  }
}
