import { css } from "@emotion/react";
import { ApplicationReleaseList } from "../components/ApplicationReleaseList";
import { NewApplication } from "../components/NewApplication";
import { ButtonLink } from "../components/_base/ButtonLink";
import { useConfiguration } from "../hooks/useConfiguration";

export const ApplicationOverviewView = () => {
  const config = useConfiguration();

  return (
    <>
      <ButtonLink buttonType="primary" href="/new-application">
        Ny applikasjon
      </ButtonLink>
      <div css={appListStyle}>
        {config.applications.map((app) => (
          <ApplicationReleaseList application={app} key={app.name} />
        ))}
      </div>
    </>
  );
};

const appListStyle = css`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 10px;
`;
