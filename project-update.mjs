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
  },
  eslintConfig: {
    path: `${projectPrefix}/eslint-config-ethang`,
    updateDeps: true,
    build: false,
    lint: true,
    publish: true,
  },
  hooks: {
    path: `${projectPrefix}/hooks`,
    updateDeps: true,
    build: false,
    lint: false,
    publish: true,
  },
  useForm: {
    path: `${projectPrefix}/use-form`,
    updateDeps: true,
    build: false,
    lint: false,
    publish: true,
  },
  blog: {
    path: `${projectPrefix}/blog`,
    updateDeps: true,
    build: true,
    lint: true,
    publish: false,
  },
  introspect: {
    path: `${projectPrefix}/introspect`,
    updateDeps: true,
    build: true,
    lint: true,
    publish: false,
  },
  sterettAdmin: {
    path: `${projectPrefix}/sterett-admin`,
    updateDeps: true,
    build: true,
    lint: true,
    publish: false,
  },
  sterettClient: {
    path: `${projectPrefix}/sterett-client`,
    updateDeps: true,
    build: true,
    lint: true,
    publish: false,
  }
}

const runCommand = (command) => {
  execSync(command, {
    stdio: 'inherit',
  })
}

const runCommandHandleFail = (command) => {
  try {
    runCommand(command)
    return true
  } catch {
    return false
  }
}

runCommand('pnpm prune')

for (const projectKey in projects) {
  const project = projects[projectKey]

  process.chdir(project.path)

  console.log(chalk.white.bgBlue(`Running for ${projectKey}`))

  if (project.updateDeps) {
    runCommand('pnpm up -i --latest')
  }

  const status = await simpleGit().status()

  if (status.isClean()) {
    break
  }

  if (project.lint) {
    runCommand('pnpm lint')
  }

  if (project.build) {
    runCommand(`pnpm build`)
  }

  await simpleGit().add('.')
  const commitMessage = prompt({})('Commit Message: ')
  await simpleGit().commit(commitMessage)
  const pushSuccess = runCommandHandleFail('git push')

  if (project.publish && commitSuccess && pushSuccess) {
    const input = prompt({})(chalk.yellow('Update Type (patch,minor,major): '))
    runCommand(`npm version ${input}`)

    runCommand('node build.mjs')
  }
}

process.exit()
