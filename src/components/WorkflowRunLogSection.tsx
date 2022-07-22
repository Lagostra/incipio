import { css } from "@emotion/react";
import { useState } from "react";

interface IProps {
  name: string;
  log: string;
}
export const WorkflowRunLogSection = ({ name, log }: IProps) => {
  const [active, setActive] = useState(false);

  return (
    <div css={wrapperStyle} onClick={() => setActive(!active)}>
      <h3 css={headerStyle}>
        {name}
        &nbsp;&nbsp;
        {active ? "v" : <>&gt;</>}
      </h3>
      {active && <div css={logStyle}>{log}</div>}
    </div>
  );
};

const wrapperStyle = css`
  cursor: pointer;
  &:not(last-child) {
    border-bottom: 1px solid #ccc;
  }
`;

const headerStyle = css`
  cursor: pointer;
`;

const logStyle = css`
  white-space: pre-wrap;
  word-break: break-all;
  padding-bottom: 15px;
  font-family: monospace;
`;
