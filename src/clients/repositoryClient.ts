import { GITHUB_URL } from "../constants";
import { IRepository, IWorkflow } from "../types";
import {
  IRepositoryDto,
  IWorkflowDto,
  IWorkflowResponse,
} from "../types/contractTypes";
import { get } from "../utils/crud";

export const getWorkflows = async (
  repository: IRepository
): Promise<IWorkflow[]> => {
  const result = (await get(
    `${GITHUB_URL}/repos/${repository.owner}/${repository.name}/actions/workflows`
  )) as IWorkflowResponse;
  return result.workflows.map(mapWorkflow);
};

const mapWorkflow = (workflow: IWorkflowDto): IWorkflow => ({
  name: workflow.name,
  path: workflow.path,
});
