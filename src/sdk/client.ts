import { print } from "graphql"
import gql from "graphql-tag"

export const getVersion = async (speckleServerUrl: string, speckleToken: string, projectId: string, versionId: string): Promise<any> => {
    const operationName = "GetProjectVersion"

    const query = print(gql`
        query ${operationName} ($projectId: String!, $versionId: String!) {
            project(id: $projectId) {
                version(id: $versionId) {
                    id
                    referencedObject
                }
            }
        }
        `)

    const response = await fetch(
        `${speckleServerUrl}graphql`,
        {
            method: 'POST',
            body: JSON.stringify({
                query,
                operationName,
                variables: {
                    projectId,
                    versionId
                }
            }),
            headers: {
                Authorization: `Bearer ${speckleToken}`,
                "Content-Type": "application/json"
            }
        })


    const { data, errors } = await response.json()

    if (errors?.length > 0) {
        console.log(errors)
    }

    console.log(JSON.stringify(data))

    return data.project.version
}