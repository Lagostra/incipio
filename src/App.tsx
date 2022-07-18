import { css } from "@emotion/react";
import { BrowserRouter as Router } from "react-router-dom";
import { RepositoryList } from "./components/RepositoryList";
import { RouteList } from "./components/RouteList";

export const App = () => {
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
    <main css={wrapperStyle}>
      <div css={contentStyle}>
        <Router>
          <RouteList />
        </Router>
      </div>
    </main>
  );
};
