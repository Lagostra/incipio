import { IRepository } from "../types";
import { IApplication } from "../types/configuration";
import { get } from "../utils/crud";
import { octokit } from "./octokit";

export const getWorkflowRunLog = async (
  repository: IRepository,
  runId: string
): Promise<Blob> => {
  const result = await get(
    `https://api.github.com/repos/${repository.owner}/${repository.name}/actions/runs/${runId}/logs`,
    { parseJson: false }
  );
  return result;
};

export const triggerDeployment = async (
  application: IApplication,
  tagName: string,
  environment: string
) => {
  await octokit.rest.actions.createWorkflowDispatch({
    owner: application.repository.owner,
    repo: application.repository.name,
    ref: `refs/tags/${tagName}`,
    workflow_id: application.deployWorkflow.path,
    inputs: { ref: tagName, environment },
  });
};
