import { Route, Routes } from "react-router-dom";
import { RepositoryList } from "./RepositoryList";

export const RouteList = () => {
  return (
    <Routes>
      <Route path="/" element={<RepositoryList />} />
    </Routes>
  );
};
