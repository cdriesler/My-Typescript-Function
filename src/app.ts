import { readFileSync } from 'node:fs'
import { FunctionInputs } from './schema'
import { getVersion } from './sdk/client'
import ObjectLoader from '@speckle/objectloader'

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

getVersion(automationRunData.speckleServerUrl, speckleToken, automationRunData.projectId, versionId)
    .then((res) => {
        console.log(res)

        const loader = new ObjectLoader({
            serverUrl: automationRunData.speckleServerUrl,
            streamId: automationRunData.projectId,
            objectId: res.referencedObject,
            token: speckleToken
        })

        for (const obj of loader.getObjectIterator()) {
            console.log(obj)
        }
    })



