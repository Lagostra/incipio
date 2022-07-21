import { GITHUB_URL } from "../constants";
import { IRelease, IRepository } from "../types";
import { IReleaseDto } from "../types/contractTypes";
import { get } from "../utils/crud";

export const getReleases = async (
  repository: IRepository,
  prefix = "",
  page = 1,
  perPage = 5
) => {
  let result = (await get(
    `${GITHUB_URL}/repos/${repository.owner}/${repository.name}/releases?page=${page}&per_page=${perPage}`
  )) as IReleaseDto[];
  result = result.filter((release) => release.tag_name.startsWith(prefix));
  return result.map(mapRelease);
};

const mapRelease = (release: IReleaseDto): IRelease => ({
  name: release.name,
  tagName: release.tag_name,
  url: release.html_url,
});
