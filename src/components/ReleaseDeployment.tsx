import { css } from "@emotion/react";
import { useEffect, useState } from "react";
import { getWorkflowRunLog } from "../clients/workflowClient";
import { IDeployment } from "../types";
import { IApplication } from "../types/configuration";
import { WorkflowRunLog } from "./WorkflowRunLog";

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
  const [logs, setLogs] = useState<Blob | undefined>();
  const [showLog, setShowLog] = useState(false);
  useEffect(() => {
    if (showLog && !logs && deployment.runId) {
      getWorkflowRunLog(application.repository, deployment.runId).then(
        (result) => {
          setLogs(result);
        }
      );
    }
  }, [showLog]);

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
          <span css={logHeaderStyle} onClick={() => setShowLog(!showLog)}>
            Logg {showLog ? "v" : <>&gt;</>}
          </span>
          {showLog && (
            <div>
              {!logs && <>Laster...</>}
              {!!logs && <WorkflowRunLog zipBlob={logs} />}
            </div>
          )}
        </>
      )}
    </div>
  );
};

const headerStyle = css`
  cursor: pointer;
`;

const logHeaderStyle = css`
  font-weight: bold;
  cursor: pointer;
`;
