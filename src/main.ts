import { readFileSync } from 'node:fs'
import { FunctionInputs } from './schema'
import { getVersion } from './sdk/client'
import { ObjectLoader2Factory } from '@speckle/objectloader2'
import { AutomationRunData, FunctionRunData } from '@/sdk/types'

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

const res = await getVersion(automationRunData.speckleServerUrl, speckleToken, automationRunData.projectId, versionId)

const loader = ObjectLoader2Factory.createFromUrl({
    serverUrl: automationRunData.speckleServerUrl,
    streamId: automationRunData.projectId,
    objectId: res.referencedObject,
    token: speckleToken
})

for await (const obj of loader.getObjectIterator()) {
    console.log(obj)
}



