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
      <ul>
        {config.applications.map((app) => (
          <li key={app.name}>{app.name}</li>
        ))}
      </ul>
    </>
  );
};
