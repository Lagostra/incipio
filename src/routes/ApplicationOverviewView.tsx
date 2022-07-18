import { NewApplication } from "../components/NewApplication";
import { useConfiguration } from "../hooks/useConfiguration";

export const ApplicationOverviewView = () => {
  const config = useConfiguration();

  return (
    <>
      <NewApplication />
      <ul>
        {config.applications.map((app) => (
          <li key={app.name}>{app.name}</li>
        ))}
      </ul>
    </>
  );
};
