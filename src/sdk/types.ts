export type FunctionRunData<FunctionInputs extends Record<string, unknown>> = {
    functionInputs: FunctionInputs
    automationRunData: AutomationRunData
    speckleToken: string
}

export type AutomationRunData = {
    speckleServerUrl: string
    automationId: string
    projectId: string
    automationRunId: string
    functionRunId: string
    triggers: AutomationRunTrigger[]
}

export type AutomationRunTrigger =
    | {
        triggerType: 'versionCreation'
        payload: {
            modelId: string
            versionId: string
        }
    }