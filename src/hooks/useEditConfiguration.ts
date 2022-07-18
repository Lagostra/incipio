import { useContext, useState } from "react";
import { ConfigurationEditContext } from "../contexts/ConfigurationEditContext";
import { IConfiguration } from "../types/configuration";

export const useEditConfiguration = (): [
  IConfiguration,
  (config: IConfiguration) => void
] => {
  const [config, setConfigInternal] = useContext(ConfigurationEditContext);

  const setConfig = (config: IConfiguration) => {
    console.log("Beep", config);
    localStorage.setItem("incipio.configuration", JSON.stringify(config));
    setConfigInternal(config);
  };

  return [config, setConfig];
};
