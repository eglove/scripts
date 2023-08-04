import { execSync } from 'child_process'
import prompt from 'prompt-sync'
import chalk from 'chalk'
import { simpleGit } from 'simple-git'
import { projects } from './projects.mjs'

const prompter = prompt({})

const runCommand = (command, condition) => {
  console.log(chalk.white.bgYellow(command))
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

  await simpleGit().checkout(project.branch)
  runCommand('pnpm prune')
  runCommand('pnpm up -i --latest', project.updateDeps)
  runCommand('pnpm up -i -r --latest', project.updateDepsRecursive)

  const status = await simpleGit().status()

  if (status.isClean()) {
    continue
  }

  runCommand('pnpm dedupe')
  runCommand('pnpm lint', project.lint)
  runCommand(`pnpm build`, project.build)

  await simpleGit().add('.')
  await simpleGit().commit('Version Bump')
  await simpleGit().push()

  if (project.publish) {
    const input = prompter(chalk.yellow('Update Type (patch,minor,major): '))
    runCommand(`npm version ${input}`)
    runCommand('node build.mjs')
    await simpleGit().push()
  }
}

process.exit()
