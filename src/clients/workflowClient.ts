import { IRepository } from "../types";
import { get } from "../utils/crud";

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
