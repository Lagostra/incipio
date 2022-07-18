import { useUserRepositories } from "../hooks/useUserRepositories";

export const RepositoryList = () => {
  const repositories = useUserRepositories();
  return (
    <ul>
      {repositories.map((repo) => (
        <li key={repo.fullName}>
          <a href={repo.url}>{repo.fullName}</a>
        </li>
      ))}
    </ul>
  );
};
