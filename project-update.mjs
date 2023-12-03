import { execSync } from 'child_process'
import chalk from 'chalk'
import { simpleGit } from 'simple-git'
import { projects } from './projects.mjs'
import inquirer from 'inquirer'
import fs from 'fs'
import { rimraf } from 'rimraf'
import esbuild from 'esbuild'
import { deepMerge } from '@ethang/util/object.js'

const runCommand = (command) => {
  console.log(chalk.greenBright(command))
  execSync(command, {
    stdio: 'inherit',
  })
}

const gitPush = async () => {
  await simpleGit().push()
  const remote = await simpleGit().listRemote(['--get-url']);
  console.log(chalk.blueBright(`Published to ${remote}`))
}

let index = 0;
const length = Object.keys(projects).length;
for (const projectKey in projects) {
  const project = projects[projectKey]

  process.chdir(project.path)

  console.log(chalk.white.bgBlue(`(${++index}/${length}) Running for ${projectKey}`))

  await simpleGit().checkout(project.branch)

  if (project.dependencyScripts?.length > 0) {
    for (const script of project.dependencyScripts) {
      runCommand(script)
    }
  }

  const status = await simpleGit().status()

  if (status.isClean()) {
    continue
  }

  if (project.postDependencyScripts?.length > 0) {
    for (const script of project.postDependencyScripts) {
      runCommand(script)
    }
  }

  await simpleGit().add('.')
  await simpleGit().commit('Version Bump')
  await gitPush();

  if (project.writePeers) {
    const packageJson = fs.readFileSync('package.json', { encoding: 'utf8' })

    const packageObject = JSON.parse(packageJson)
    packageObject.peerDependencies = packageObject.dependencies

    fs.writeFileSync('package.json', JSON.stringify(packageObject, null, 2) + '\n', 'utf8')

    await simpleGit().add('.')
    await simpleGit().commit('Peer Dependency Update')
    await gitPush()
  }

  if (project.publish) {
    const { updateType } = await inquirer.prompt([
      {
        type: 'list',
        name: 'updateType',
        message: 'Update Type',
        choices: ['patch', 'minor', 'major'],
      }
    ])

    runCommand(`npm version ${updateType}`)

    if (project.publishDirectory) {
      await rimraf(project.publishDirectory)

      if (project.buildTsConfig) {
        const tsConfigString = fs.readFileSync('tsconfig.json', {encoding: 'utf8'})
        const originalTsConfig = JSON.parse(tsConfigString)

        const merged = deepMerge(originalTsConfig, project.buildTsConfig)
        fs.writeFileSync('tsconfig.build.json', JSON.stringify(merged, null, 2))

        runCommand('tsc --project tsconfig.build.json')
      } else {
        runCommand(`tsc --project ${project.tsConfig}`)
      }

      if (project.esBuild) {
        esbuild.buildSync(project.esBuild)
      }

      fs.copyFileSync('package.json', `${project.publishDirectory}/package.json`)

      runCommand(`cd ${project.publishDirectory} && npm publish --access public && cd ..`)
    } else {
      runCommand('npm publish --access public')
    }

    await gitPush()
  }
}

process.exit()
