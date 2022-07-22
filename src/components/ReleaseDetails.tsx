import { css } from "@emotion/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { IDeployment, IReleaseDetails } from "../types";
import { IApplication } from "../types/configuration";
import { ReleaseDeployment } from "./ReleaseDeployment";
import { Block } from "./_base/Block";

interface IProps {
  release: IReleaseDetails;
  environment?: string;
  application: IApplication;
}
export const ReleaseDetails = ({
  release,
  environment,
  application,
}: IProps) => {
  const [activeDeployment, setActiveDeployment] = useState<
    IDeployment | undefined
  >();

  return (
    <div>
      <Link to="/">&lt;-- Tilbake</Link>
      <h2>{release.name}</h2>
      <a href={release.url} target="_blank" rel="noopener noreferrer">
        Vis i GitHub
      </a>
      <p>{release.description}</p>

      <Block>
        <h2>Deployments</h2>

        {release.deployments?.map((deployment) => (
          <ReleaseDeployment
            key={deployment.id}
            application={application}
            environment={environment}
            deployment={deployment}
            active={activeDeployment === deployment}
            onClick={() =>
              activeDeployment === deployment
                ? setActiveDeployment(undefined)
                : setActiveDeployment(deployment)
            }
          />
        ))}
      </Block>
    </div>
  );
};
