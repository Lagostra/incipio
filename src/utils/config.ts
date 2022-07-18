import { IConfiguration } from "../types/configuration";

export const saveConfiguration = (configuration: IConfiguration) => {
  localStorage.setItem("incipio.configuration", JSON.stringify(configuration));
};

export const loadConfiguration = (): IConfiguration | undefined => {
  const configuration = localStorage.getItem("incipio.configuration");
  if (configuration) {
    return JSON.parse(configuration);
  }
  return undefined;
};
