import { useEditConfiguration } from "../hooks/useEditConfiguration";

export const NewApplication = () => {
  const [config, setConfig] = useEditConfiguration();

  const addApplication = () => {
    setConfig({
      ...config,
      applications: [
        ...config.applications,
        { name: `Application ${config.applications.length + 1}`, url: "" },
      ],
    });
  };

  return (
    <div>
      <h2>New application</h2>
      <button onClick={addApplication}>Add new application</button>
    </div>
  );
};
