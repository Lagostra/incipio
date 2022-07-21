import { css } from "@emotion/react";
import { useState } from "react";
import { useEditConfiguration } from "../hooks/useEditConfiguration";
import { useUserRepositories } from "../hooks/useUserRepositories";
import { useWorkflows } from "../hooks/useWorkflows";
import { IRepository } from "../types";
import { Button } from "./_base/Button";
import { Input } from "./_base/Input";
import { Label } from "./_base/Label";
import { Select } from "./_base/Select";

export const NewApplication = () => {
  const [config, setConfig] = useEditConfiguration();
  const repositories = useUserRepositories();
  const [selectedRepository, setSelectedRepository] = useState("");
  const repository = repositories.find(
    (r) => r.fullName === selectedRepository
  );
  const workflows = useWorkflows(repository);
  const [selectedWorkflow, setSelectedWorkflow] = useState("");
  const workflow = workflows.find((w) => w.name === selectedWorkflow);
  const [versionPrefix, setVersionPrefix] = useState("");

  const unusedRepositories = repositories.filter(
    (r) =>
      !config.applications.some((a) => a.repository.fullName === r.fullName)
  );

  const addApplication = () => {
    if (!repository || !workflow) return;
    setConfig({
      ...config,
      applications: [
        ...config.applications,
        {
          name: repository.name,
          url: "",
          repository: { ...repository },
          deployWorkflow: { name: workflow?.name, path: workflow?.path },
          versionPrefix: versionPrefix,
        },
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

      <Label>Repository</Label>
      <Select
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
      </Select>

      <Label>Deploy workflow</Label>
      <Select
        value={selectedWorkflow}
        onChange={(e) => setSelectedWorkflow(e.target.value)}
      >
        <option value="">--- Select workflow ---</option>
        {workflows.map((workflow, index) => (
          <option key={workflow.name} value={workflow.name}>
            {workflow.name}
          </option>
        ))}
      </Select>

      <Label>Version prefix</Label>
      <Input
        type="text"
        value={versionPrefix}
        onChange={(e) => setVersionPrefix(e.target.value)}
      />

      <Button buttonType="primary" onClick={addApplication}>
        Lagre
      </Button>
    </div>
  );
};
