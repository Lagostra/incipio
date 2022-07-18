import { GITHUB_URL } from "../constants";
import { IRepository } from "../types";
import { IRepositoryDto } from "../types/contractTypes";
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
    result.push(...response.map(mapRepository));
  } while (response.length === PAGE_SIZE);
  return result;
};

const mapRepository = (repository: IRepositoryDto): IRepository => ({
  name: repository.name,
  owner: repository.owner.login,
  fullName: repository.full_name,
  url: repository.html_url,
});
