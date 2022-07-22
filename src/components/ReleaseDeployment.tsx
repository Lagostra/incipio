import { css } from "@emotion/react";
import { IDeployment } from "../types";
import { IApplication } from "../types/configuration";

interface IProps {
  application: IApplication;
  environment?: string;
  deployment: IDeployment;
  active: boolean;
  onClick: () => void;
}
export const ReleaseDeployment = ({
  application,
  environment,
  active,
  deployment,
  onClick,
}: IProps) => {
  return (
    <div key={deployment.id}>
      <h3 onClick={onClick} css={headerStyle}>
        {deployment.lastUpdate.toLocaleDateString()}
        {!environment && <> – {deployment.environment}</>}
        <span> ({deployment.state})</span>
      </h3>
      {active && (
        <>
          {!!deployment.runId && (
            <a
              href={`https://github.com/${application.repository.owner}/${application.repository.name}/actions/runs/${deployment.runId}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Vis i GitHub
            </a>
          )}
          <p>{deployment.state}</p>
        </>
      )}
    </div>
  );
};

const headerStyle = css`
  cursor: pointer;
`;
