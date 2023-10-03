const projectPrefix = '/Users/hello/Projects/ethang'

const PRUNE = 'pnpm prune';
const UPDATE = 'pnpm up -i --latest';
const UPDATE_RECURSIVE = 'pnpm up -i -r --latest';
const DEDUPE = 'pnpm dedupe';
const TURBO_CLEAN = 'turbo daemon clean';
const LINT = 'pnpm lint';
const TEST = 'pnpm test';
const BUILD = 'pnpm build';

export const projects = {
  scripts: {
    path: `${projectPrefix}/scripts`,
    branch: 'master',
    dependencyScripts: [UPDATE, PRUNE],
  },
  eslintConfig: {
    path: `${projectPrefix}/eslint-config-ethang`,
    branch: 'master',
    dependencyScripts: [UPDATE, PRUNE],
    postDependencyScripts: [DEDUPE, LINT, BUILD],
    publish: true,
  },
  hooks: {
    path: `${projectPrefix}/hooks`,
    branch: 'main',
    dependencyScripts: [UPDATE, PRUNE, BUILD],
    publish: true,
  },
  useForm: {
    path: `${projectPrefix}/use-form`,
    branch: 'master',
    dependencyScripts: [UPDATE, PRUNE, BUILD],
    publish: true,
  },
  fetch: {
    path: `${projectPrefix}/fetch`,
    branch: 'master',
    dependencyScripts: [UPDATE, PRUNE, BUILD],
    publish: true,
  },
  website: {
    path: `${projectPrefix}/website`,
    branch: 'master',
    dependencyScripts: [UPDATE, PRUNE],
    postDependencyScripts: [DEDUPE, LINT, BUILD],
  },
  introspect: {
    path: `${projectPrefix}/introspect-2`,
    branch: 'master',
    dependencyScripts: [UPDATE, PRUNE],
    postDependencyScripts: [DEDUPE, LINT, TEST, BUILD],
  },
  sterettAdmin: {
    path: `${projectPrefix}/sterett-admin`,
    branch: 'master',
    dependencyScripts: [UPDATE, PRUNE],
    postDependencyScripts: [DEDUPE, LINT], BUILD,
  },
  sterett: {
    path: `${projectPrefix}/sterett`,
    branch: 'master',
    dependencyScripts: [UPDATE, PRUNE],
    postDependencyScripts: [DEDUPE, LINT, BUILD],
  },
  examples: {
    path: `${projectPrefix}/examples`,
    branch: 'main',
    dependencyScripts: [UPDATE_RECURSIVE, PRUNE],
    postDependencyScripts: [DEDUPE, TURBO_CLEAN, LINT, BUILD],
  }
}
