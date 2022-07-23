import { Link } from "react-router-dom";
import { triggerDeployment } from "../clients/workflowClient";
import { useReleases } from "../hooks/useReleases";
import { IRelease } from "../types";
import { IApplication } from "../types/configuration";
import { Block } from "./_base/Block";
import { Button } from "./_base/Button";
import { Table } from "./_base/Table";

interface IProps {
  application: IApplication;
}
export const ApplicationReleaseList = ({ application }: IProps) => {
  const releases = useReleases(
    application.repository,
    application.versionPrefix ?? "",
    15
  );

  const deploy = async (release: IRelease, environment: string) => {
    await triggerDeployment(application, release.tagName, environment);
  };

  return (
    <Block>
      <Table>
        <thead>
          <tr>
            <td></td>
            {application.environments.map((env) => (
              <td key={env}>{env}</td>
            ))}
          </tr>
        </thead>
        <tbody>
          {releases.map((release) => (
            <tr key={release.tagName}>
              <td>
                <a href={release.url} target="_blank" rel="noopener noreferer">
                  {release.tagName}
                </a>
              </td>
              {application.environments.map((env) => {
                const deployment = release.deployments.find(
                  (d) => d.environment === env
                );
                return (
                  <td key={env}>
                    {deployment ? (
                      <Link
                        to={`/applications/${application.name}/releases/${release.tagName}/${env}`}
                      >
                        {deployment.state}
                      </Link>
                    ) : (
                      <Button
                        buttonType="primary"
                        onClick={() => deploy(release, env)}
                      >
                        Deploy
                      </Button>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </Table>
    </Block>
  );
};
