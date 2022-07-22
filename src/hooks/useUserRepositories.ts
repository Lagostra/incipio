import { gql, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { getUserRepositories } from "../clients/repositoryClient";
import { IRepository } from "../types";

export const useUserRepositories = (): IRepository[] => {
  const { loading, error, data } = useQuery(gql`
    query getRepositories {
      viewer {
        repositories(
          first: 100
          ownerAffiliations: [COLLABORATOR, ORGANIZATION_MEMBER, OWNER]
          affiliations: [COLLABORATOR, ORGANIZATION_MEMBER, OWNER]
          orderBy: { direction: ASC, field: NAME }
        ) {
          totalCount
          pageInfo {
            hasNextPage
          }
          nodes {
            id
            name
            nameWithOwner
            url
            isPrivate
            isArchived
            owner {
              login
            }
          }
        }
      }
    }
  `);

  const repositories =
    data?.viewer?.repositories?.nodes.map(
      (repositoryNode: any) =>
        ({
          name: repositoryNode.name,
          owner: repositoryNode.owner.login,
          fullName: repositoryNode.nameWithOwner,
          url: repositoryNode.url,
        } as IRepository)
    ) ?? [];

  return repositories;
};
