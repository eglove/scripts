const projectPrefix = "/Users/hello/Projects/ethang";

const PRUNE = "pnpm prune";
const UPDATE = "pnpm up -i --latest";
const UPDATE_RECURSIVE = "pnpm up -i -r --latest";
const DEDUPE = "pnpm dedupe";
const TURBO_CLEAN = "turbo daemon clean";
const LINT = "pnpm lint";
const TEST = "pnpm test";
const BUILD = "pnpm build";

export const projects = {
  scripts: {
    path: `${projectPrefix}/scripts`,
    branch: "master",
    dependencyScripts: [UPDATE, PRUNE],
  },
  eslintConfig: {
    path: `${projectPrefix}/eslint-config-ethang`,
    branch: "master",
    dependencyScripts: [UPDATE, PRUNE],
    postDependencyScripts: [DEDUPE, BUILD],
    publish: true,
    writePeers: true,
  },
  hooks: {
    path: `${projectPrefix}/hooks`,
    branch: "main",
    dependencyScripts: [UPDATE, PRUNE],
    publish: true,
    writePeers: true,
    publishDirectory: "dist",
    tsConfig: "tsconfig.json",
  },
  useForm: {
    path: `${projectPrefix}/use-form`,
    branch: "master",
    dependencyScripts: [UPDATE, PRUNE],
    publish: true,
    writePeers: true,
    publishDirectory: "dist",
    tsConfig: "tsconfig.json",
    tsupConfig: {
      format: ["cjs", "esm"],
      bundle: false,
      minify: true,
      outDir: "dist",
      entry: ["src/*"],
    },
  },
  util: {
    path: `${projectPrefix}/util`,
    branch: "master",
    dependencyScripts: [UPDATE, PRUNE],
    postDependencyScripts: [DEDUPE, LINT],
    publish: true,
    publishDirectory: "dist",
    tsConfig: "tsconfig.json",
    buildTsConfig: {
      include: ["src"],
      compilerOptions: {
        emitDeclarationOnly: true,
      },
    },
    tsupConfig: {
      format: ["cjs", "esm"],
      bundle: true,
      minify: true,
      outDir: "dist",
      entry: ["src/*"],
    },
  },
  fetch: {
    path: `${projectPrefix}/fetch`,
    branch: "master",
    dependencyScripts: [UPDATE, PRUNE],
    publish: true,
    writePeers: true,
    publishDirectory: "dist",
    tsConfig: "tsconfig.json",
    buildTsConfig: {
      include: ["src/**/*"],
      compilerOptions: {
        emitDeclarationOnly: true,
      },
    },
  },
  website: {
    path: `${projectPrefix}/website-remix`,
    branch: "master",
    dependencyScripts: [UPDATE, PRUNE],
    postDependencyScripts: [DEDUPE, LINT, BUILD],
  },
  websiteAdmin: {
    path: `${projectPrefix}/ethang-admin`,
    branch: "main",
    dependencyScripts: [UPDATE, PRUNE],
    postDependencyScripts: [DEDUPE, LINT, BUILD],
  },
  introspect: {
    path: `${projectPrefix}/introspect`,
    branch: "master",
    dependencyScripts: [UPDATE, PRUNE],
    postDependencyScripts: [DEDUPE, LINT, BUILD],
  },
  sterettAdmin: {
    path: `${projectPrefix}/sterett-admin`,
    branch: "master",
    dependencyScripts: [UPDATE, PRUNE],
    postDependencyScripts: [DEDUPE, LINT, BUILD],
  },
  sterett: {
    path: `${projectPrefix}/sterett`,
    branch: "master",
    dependencyScripts: [UPDATE, PRUNE],
    postDependencyScripts: [DEDUPE, LINT, BUILD],
  },
  examples: {
    path: `${projectPrefix}/examples`,
    branch: "main",
    dependencyScripts: [UPDATE_RECURSIVE, PRUNE],
    postDependencyScripts: [DEDUPE, TURBO_CLEAN, LINT, BUILD],
  },
};
