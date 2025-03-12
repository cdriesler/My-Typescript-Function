import { readFileSync } from 'node:fs'
import { FunctionInputs } from './schema'
import { getVersion } from './sdk/client'

const getAutomationContext = (): FunctionRunData<FunctionInputs> => {
    const [inputDataPath] = process.argv.slice(2)
    return JSON.parse(readFileSync(inputDataPath, 'utf-8'))
}

const getVersionId = (context: AutomationRunData): string => {
    return context.triggers.at(0)?.payload.versionId ?? ''
}

const { functionInputs, automationRunData, speckleToken } = getAutomationContext()

const versionId = getVersionId(automationRunData)

console.log(functionInputs)
console.log(versionId)

getVersion(automationRunData.speckleServerUrl, speckleToken, automationRunData.projectId, versionId).finally(() => {
    process.exit()
})

// const data = JSON.parse(readFileSync('/speckle/automate.json', 'utf-8'))



