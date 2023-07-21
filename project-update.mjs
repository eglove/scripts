import { execSync } from 'child_process'
import prompt from 'prompt-sync'
import chalk from 'chalk'
import { simpleGit } from 'simple-git'

const projectPrefix = '/Users/hello/Projects/ethang'

const projects = {
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

const prompter = prompt({})

const runCommand = (command, condition) => {
  if (condition !== false) {
    execSync(command, {
      stdio: 'inherit',
    })
  }
}

for (const projectKey in projects) {
  const project = projects[projectKey]

  process.chdir(project.path)

  console.log(chalk.white.bgBlue(`Running for ${projectKey}`))

  await simpleGit().checkout(project.branch);
  runCommand('pnpm prune')
  runCommand('pnpm up -i --latest', project.updateDeps)

  const status = await simpleGit().status()

  if (status.isClean()) {
    continue
  }

  runCommand('pnpm dedupe')
  runCommand('pnpm lint', project.lint)
  runCommand(`pnpm build`, project.build)

  await simpleGit().add('.')
  const commitMessage = prompter('Commit Message: ')
  await simpleGit().commit(commitMessage)
  await simpleGit().push()

  if (project.publish) {
    const input = prompter(chalk.yellow('Update Type (patch,minor,major): '))
    runCommand(`npm version ${input}`)
    runCommand('node build.mjs')
  }
}

process.exit()
