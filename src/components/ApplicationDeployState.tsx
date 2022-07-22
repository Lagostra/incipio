import { Link } from "react-router-dom";
import { useReleases } from "../hooks/useReleases";
import { IDeployment } from "../types";
import { IApplication } from "../types/configuration";
import { Block } from "./_base/Block";
import { Table } from "./_base/Table";

interface IProps {
  application: IApplication;
}
export const ApplicationDeployState = ({ application }: IProps) => {
  const releases = useReleases(
    application.repository,
    application.versionPrefix ?? "",
    50
  );

  return (
    <Block>
      <h2>
        <Link to={`/applications/${application.name}`}>{application.name}</Link>
      </h2>
      <Table>
        <thead>
          <tr>
            {application.environments.map((env) => (
              <td key={env}>{env}</td>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {application.environments.map((env) => {
              const release = releases.find((r) =>
                r.deployments.some(
                  (d) => d.environment === env && d.state === "ACTIVE"
                )
              );
              return (
                <td key={env}>
                  <Link
                    to={`/applications/${application.name}/releases/${release?.tagName}/${env}`}
                  >
                    {release?.tagName}
                  </Link>
                </td>
              );
            })}
          </tr>
        </tbody>
      </Table>
    </Block>
  );
};
