import { useEffect, useState } from "react";
import { getUserRepositories } from "../clients/repositoryClient";
import { IRepository } from "../types";

export const useUserRepositories = () => {
  const [repositories, setRepositories] = useState<IRepository[]>([]);

  useEffect(() => {
    getUserRepositories().then((result) => setRepositories(result));
  }, []);

  return repositories;
};
