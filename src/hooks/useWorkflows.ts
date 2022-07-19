import { useEffect, useState } from "react";
import { getWorkflows } from "../clients/repositoryClient";
import { IRepository, IWorkflow } from "../types";

export const useWorkflows = (
  repository: IRepository | undefined
): IWorkflow[] => {
  const [workflows, setWorkflows] = useState<IWorkflow[]>([]);
  useEffect(() => {
    if (!repository) return;
    getWorkflows(repository).then(setWorkflows);
  }, [repository]);
  return workflows;
};
