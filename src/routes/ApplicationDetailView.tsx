import { Link, useParams } from "react-router-dom";
import { ApplicationReleaseList } from "../components/ApplicationReleaseList";
import { useConfiguration } from "../hooks/useConfiguration";

export const ApplicationDetailView = () => {
  const { applicationName } = useParams();

  const config = useConfiguration();
  const application = config.applications.find(
    (a) => a.name === applicationName
  );

  const applicationView = application ? (
    <>
      <h2>{application.name}</h2>
      <ApplicationReleaseList application={application} />
    </>
  ) : (
    <p>Fant ikke applikasjonen {applicationName}</p>
  );

  return (
    <div>
      <Link to="/">&lt;-- Tilbake</Link>
      {applicationView}
    </div>
  );
};
