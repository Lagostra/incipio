import { css } from "@emotion/react";
import { useReleases } from "../hooks/useReleases";
import { IApplication } from "../types/configuration";

interface IProps {
  application: IApplication;
}
export const ApplicationDeployState = ({ application }: IProps) => {
  const releases = useReleases(
    application.repository,
    application.versionPrefix ?? ""
  );

  return (
    <div css={wrapperStyle}>
      <h2>{application.name}</h2>
      <table css={tableStyle}>
        <thead>
          <tr>
            <td></td>
            {application.environments.map((env) => (
              <td>{env}</td>
            ))}
          </tr>
        </thead>
        <tbody>
          {releases.map((release) => (
            <tr>
              <td>
                <a href={release.url} target="_blank" rel="noopener noreferer">
                  {release.tagName}
                </a>
              </td>
              {application.environments.map((env) => (
                <td></td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const wrapperStyle = css`
  background: #eee;
  padding: 10px;
  border-radius: 5px;
`;

const tableStyle = css`
  background: #fff;
  width: 100%;
  border-collapse: collapse;

  & th,
  td {
    padding: 5px 10px;
    border: 1px solid #ddd;
  }

  & th {
    font-weight: bold;
  }

  & td {
  }
`;
