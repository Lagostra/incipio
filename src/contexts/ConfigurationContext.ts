import { createContext } from "react";
import { DEFAULT_CONFIG } from "./ConfigurationEditContext";

export const ConfigurationContext = createContext({ ...DEFAULT_CONFIG });
