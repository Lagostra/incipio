import { useParams } from "react-router-dom";
import { ReleaseDetails } from "../components/ReleaseDetails";
import { useConfiguration } from "../hooks/useConfiguration";
import { useReleaseDetails } from "../hooks/useReleaseDetails";

export const ReleaseDetailsView = () => {
  const { applicationName, releaseTag, environment } = useParams();
  const config = useConfiguration();
  const application = config.applications.find(
    (a) => a.name === applicationName
  );

  if (!application || !releaseTag) {
    return <div>Laster...</div>;
  }

  const release = useReleaseDetails(
    application?.repository,
    releaseTag,
    environment
  );

  return (
    <ReleaseDetails
      application={application}
      release={release}
      environment={environment}
    />
  );
};
