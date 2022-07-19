import { css } from "@emotion/react";
import { useState } from "react";
import { useEditConfiguration } from "../hooks/useEditConfiguration";
import { useUserRepositories } from "../hooks/useUserRepositories";
import { useWorkflows } from "../hooks/useWorkflows";
import { IRepository } from "../types";

export const NewApplication = () => {
  const [config, setConfig] = useEditConfiguration();
  const repositories = useUserRepositories();
  const [selectedRepository, setSelectedRepository] = useState("");
  const repository = repositories.find(
    (r) => r.fullName === selectedRepository
  );
  const workflows = useWorkflows(repository);

  const unusedRepositories = repositories.filter(
    (r) =>
      !config.applications.some((a) => a.repository.fullName === r.fullName)
  );

  const addApplication = () => {
    if (!repository) return;
    setConfig({
      ...config,
      applications: [
        ...config.applications,
        { name: repository.name, url: "", repository: { ...repository } },
      ],
    });
    setSelectedRepository("");
  };

  const wrapperStyle = css`
    display: flex;
    flex-direction: column;
    gap: 10px;
  `;

  return (
    <div css={wrapperStyle}>
      <h2>New application</h2>
      <select
        onChange={(e) => setSelectedRepository(e.target.value)}
        value={selectedRepository}
      >
        <option value="" disabled>
          --- Select repository ---
        </option>
        {unusedRepositories.map((repository, index) => (
          <option key={repository.fullName} value={repository.fullName}>
            {repository.name}
          </option>
        ))}
      </select>
      <select>
        <option value="">--- Select workflow ---</option>
        {workflows.map((workflow, index) => (
          <option key={workflow.name} value={workflow.name}>
            {workflow.name}
          </option>
        ))}
      </select>
      <button onClick={addApplication}>Add new application</button>
    </div>
  );
};
