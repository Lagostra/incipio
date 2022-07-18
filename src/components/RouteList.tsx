import { Route, Routes } from "react-router-dom";
import { ApplicationOverviewView } from "../routes/ApplicationOverviewView";

export const RouteList = () => {
  return (
    <Routes>
      <Route path="/" element={<ApplicationOverviewView />} />
    </Routes>
  );
};
