import { css } from "@emotion/react";
import { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { RouteList } from "./components/RouteList";
import { ConfigurationContext } from "./contexts/ConfigurationContext";
import {
  ConfigurationEditContext,
  DEFAULT_CONFIG,
} from "./contexts/ConfigurationEditContext";
import { IConfiguration } from "./types/configuration";
import { loadConfiguration } from "./utils/config";

export const App = () => {
  const [config, setConfig] = useState<IConfiguration>(
    loadConfiguration() ?? { ...DEFAULT_CONFIG }
  );

  const wrapperStyle = css`
    display: flex;
    justify-content: center;
  `;
  const contentStyle = css`
    width: 100%;
    max-width: 1024px;
    padding: 15px;
  `;
  return (
    <ConfigurationContext.Provider value={config}>
      <ConfigurationEditContext.Provider value={[config, setConfig]}>
        <main css={wrapperStyle}>
          <div css={contentStyle}>
            <Router>
              <RouteList />
            </Router>
          </div>
        </main>
      </ConfigurationEditContext.Provider>
    </ConfigurationContext.Provider>
  );
};
