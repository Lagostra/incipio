import { gql, useQuery } from "@apollo/client";
import { IDeployment, IRelease, IRepository } from "../types";

export const useReleases = (
  repository: IRepository,
  prefix = "",
  count = 5
): IRelease[] => {
  const { loading, error, data } = useQuery(gql`
    query getReleases {
      repository(name: "${repository.name}", owner: "${repository.owner}") {
        refs(
          refPrefix: "refs/tags/"
          first: ${count}
          query: "${prefix}"
          orderBy: { field: TAG_COMMIT_DATE, direction: DESC }
        ) {
          nodes {
            id
            name
            target {
              ... on Commit {
                oid
                pushedDate
                committedDate
                deployments(
                  first: 100
                  orderBy: { field: CREATED_AT, direction: DESC }
                ) {
                  nodes {
                    id
                    createdAt
                    environment
                    state
                    latestStatus {
                      createdAt
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `);

  const releases =
    data?.repository?.refs?.nodes.map(
      (ref: any) =>
        ({
          name: ref.name,
          tagName: ref.name,
          commitHash: ref.target.oid,
          url: `https://github.com/${repository.owner}/${repository.name}/releases/tag/${ref.name}`,
          deployments: ref.target.deployments.nodes
            .map(
              (deployment: any) =>
                ({
                  environment: deployment.environment,
                  state: deployment.state,
                  lastUpdate: new Date(deployment.latestStatus.createdAt),
                } as IDeployment)
            )
            .sort(
              (a: IDeployment, b: IDeployment) =>
                b.lastUpdate.getTime() - a.lastUpdate.getTime()
            ),
        } as IRelease)
    ) ?? [];

  console.log(releases);

  return releases;
};
