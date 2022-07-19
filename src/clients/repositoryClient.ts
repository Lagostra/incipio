import { GITHUB_URL } from "../constants";
import { IRepository, IWorkflow } from "../types";
import {
  IRepositoryDto,
  IWorkflowDto,
  IWorkflowResponse,
} from "../types/contractTypes";
import { get } from "../utils/crud";

const PAGE_SIZE = 100;

export const getUserRepositories = async (): Promise<IRepository[]> => {
  const result = [] as IRepository[];
  let response;
  let page = 1;
  do {
    response = (await get(
      `${GITHUB_URL}/user/repos?per_page=${PAGE_SIZE}&page=${page++}`
    )) as IRepositoryDto[];
    result.push(...response.filter((r) => !r.archived).map(mapRepository));
  } while (response.length === PAGE_SIZE);
  return result;
};

const mapRepository = (repository: IRepositoryDto): IRepository => ({
  name: repository.name,
  owner: repository.owner.login,
  fullName: repository.full_name,
  url: repository.html_url,
});

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
});
