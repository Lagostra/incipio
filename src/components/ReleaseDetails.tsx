import { useState } from "react";
import { Link } from "react-router-dom";
import { IDeployment, IReleaseDetails } from "../types";
import { Block } from "./_base/Block";

interface IProps {
  release: IReleaseDetails;
  environment?: string;
}
export const ReleaseDetails = ({ release, environment }: IProps) => {
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
          <div key={deployment.id}>
            <h3
              onClick={() =>
                activeDeployment === deployment
                  ? setActiveDeployment(undefined)
                  : setActiveDeployment(deployment)
              }
            >
              {deployment.lastUpdate.toLocaleDateString()}
              {!environment && <> – {deployment.environment}</>}
            </h3>
            {activeDeployment === deployment && (
              <>
                <p>{deployment.state}</p>
              </>
            )}
          </div>
        ))}
      </Block>
    </div>
  );
};
