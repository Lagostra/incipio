import { useEffect, useState } from "react";
import { getReleases } from "../clients/releaseClient";
import { IRelease, IRepository } from "../types";

export const useReleases = (repository: IRepository, prefix = "") => {
  const [releases, setReleases] = useState<IRelease[]>([]);

  useEffect(() => {
    getReleases(repository, prefix).then(setReleases);
  }, []);

  return releases;
};
