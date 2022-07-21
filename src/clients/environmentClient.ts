import { GITHUB_URL } from "../constants";
import { IRepository } from "../types";
import { IEnvironmentDto } from "../types/contractTypes";
import { get } from "../utils/crud";

export const getEnvironments = async (
  repository: IRepository
): Promise<string[]> => {
  let result = (await get(
    `${GITHUB_URL}/repos/${repository.owner}/${repository.name}/environments`
  )) as IEnvironmentDto[];
  return result.map(mapEnvironment);
};

const mapEnvironment = (environment: IEnvironmentDto): string =>
  environment.name;
