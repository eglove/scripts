const projectPrefix = '/Users/hello/Projects/ethang'

export const projects = {
  scripts: {
    path: `${projectPrefix}/scripts`,
    updateDeps: true,
    build: false,
    lint: false,
    publish: false,
    branch: 'master',
  },
  eslintConfig: {
    path: `${projectPrefix}/eslint-config-ethang`,
    updateDeps: true,
    build: false,
    lint: true,
    publish: true,
    branch: 'master',
  },
  hooks: {
    path: `${projectPrefix}/hooks`,
    updateDeps: true,
    build: false,
    lint: false,
    publish: true,
    branch: 'main',
  },
  useForm: {
    path: `${projectPrefix}/use-form`,
    updateDeps: true,
    build: false,
    lint: false,
    publish: true,
    branch: 'master',
  },
  blog: {
    path: `${projectPrefix}/blog`,
    updateDeps: true,
    build: true,
    lint: true,
    publish: false,
    branch: 'master',
  },
  introspect: {
    path: `${projectPrefix}/introspect`,
    updateDeps: true,
    build: true,
    lint: true,
    publish: false,
    branch: 'main',
  },
  sterettAdmin: {
    path: `${projectPrefix}/sterett-admin`,
    updateDeps: true,
    build: true,
    lint: true,
    publish: false,
    branch: 'master',
  },
  sterettClient: {
    path: `${projectPrefix}/sterett-client`,
    updateDeps: true,
    build: true,
    lint: true,
    publish: false,
    branch: 'master',
  }
}
