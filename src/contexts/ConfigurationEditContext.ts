import { createContext } from "react";
import { IConfiguration } from "../types/configuration";

export const DEFAULT_CONFIG: IConfiguration = {
  applications: [],
};

export const ConfigurationEditContext = createContext<
  [IConfiguration, (config: IConfiguration) => void]
>([{ ...DEFAULT_CONFIG }, () => {}]);
