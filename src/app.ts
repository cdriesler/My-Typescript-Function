import { readFileSync } from 'node:fs'
import yargs from 'yargs'

const [inputDataPath] = process.argv.slice(2)
const {
    functionInputs,
    automationRunData,
    speckleToken
} = JSON.parse(readFileSync(inputDataPath, 'utf-8'))
const {
    speckleServerUrl,
    automationId,
    projectId,
    automationRunId,
    triggers,
    functionRunId
} = automationRunData

// const data = JSON.parse(readFileSync('/speckle/automate.json', 'utf-8'))

console.log(functionInputs)
console.log(speckleServerUrl)
console.log(triggers)
console.log(speckleToken)

