import { gql, useQuery } from "@apollo/client";
import { IDeployment, IReleaseDetails, IRepository } from "../types";

export const useReleaseDetails = (
  repository: IRepository,
  tag: string,
  environment: string | undefined = undefined
): IReleaseDetails => {
  const { data } = useQuery(gql`
    query getReleaseDetails {
      repository(
        name: "${repository.name}", 
        owner: "${repository.owner}") {
        release(tagName: "${tag}") {
          name
          publishedAt
          descriptionHTML
          description
          shortDescriptionHTML
          url
          tagName
          tagCommit {
            oid
            message
            deployments(first:100) {
              nodes {
                id
                createdAt
                environment
                state
                latestStatus {
                  createdAt
                }
                payload
              }
            }
          }          
        }
      }
    }
  `);

  return {
    name: data?.repository?.release?.name,
    tagName: data?.repository?.release?.tagName,
    commitHash: data?.repository?.release?.tagCommit?.oid,
    url: `https://github.com/${repository.owner}/${repository.name}/releases/tag/${data?.repository?.release?.tagName}`,
    description: data?.repository?.release?.description
      ? data?.repository?.release?.description
      : data?.repository?.release?.tagCommit?.message,
    deployments: data?.repository?.release?.tagCommit?.deployments?.nodes
      .map(
        (deployment: any) =>
          ({
            id: deployment.id,
            environment: deployment.environment,
            state: deployment.state,
            lastUpdate: new Date(deployment.latestStatus.createdAt),
            runId: deployment.payload
              ? JSON.parse(JSON.parse(deployment.payload)).run_id
              : undefined,
          } as IDeployment)
      )
      .filter((d: IDeployment) => !environment || d.environment === environment)
      .sort(
        (a: IDeployment, b: IDeployment) =>
          b.lastUpdate.getTime() - a.lastUpdate.getTime()
      ),
  } as IReleaseDetails;
};
