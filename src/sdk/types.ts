
type FunctionRunData<FunctionInputs extends Record<string, unknown>> = {
    functionInputs: FunctionInputs
    automationRunData: AutomationRunData
    speckleToken: string
}

type AutomationRunData = {
    speckleServerUrl: string
    automationId: string
    projectId: string
    automationRunId: string
    functionRunId: string
    triggers: AutomationRunTrigger[]
}

type AutomationRunTrigger =
    | {
        triggerType: 'versionCreation'
        payload: {
            modelId: string
            versionId: string
        }
    }