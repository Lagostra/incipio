import { useContext } from "react";
import { ConfigurationContext } from "../contexts/ConfigurationContext";
import { IConfiguration } from "../types/configuration";

export const useConfiguration = (): IConfiguration => {
  return useContext(ConfigurationContext);
};
