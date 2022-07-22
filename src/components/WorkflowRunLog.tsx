import { css } from "@emotion/react";
import { useEffect, useState } from "react";
import { getLogsFromZipFile } from "../utils/zipUtils";
import { WorkflowRunLogSection } from "./WorkflowRunLogSection";

interface IProps {
  zipBlob: Blob;
}
export const WorkflowRunLog = ({ zipBlob }: IProps) => {
  const [stepNames, setStepNames] = useState<string[]>([]);
  const [stepLogs, setStepLogs] = useState<string[]>([]);

  useEffect(() => {
    if (!zipBlob) {
      return;
    }

    getLogsFromZipFile(zipBlob).then(({ files, content }) => {
      setStepNames(files);
      setStepLogs(content);
    });
  }, [zipBlob]);

  return (
    <div css={wrapperStyle}>
      {stepNames.map((name, index) => (
        <WorkflowRunLogSection key={name} name={name} log={stepLogs[index]} />
      ))}
    </div>
  );
};

const wrapperStyle = css`
  margin-top: 10px;
  padding: 10px 20px;
  background: white;
`;
