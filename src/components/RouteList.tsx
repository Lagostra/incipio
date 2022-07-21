import { Route, Routes } from "react-router-dom";
import { ApplicationOverviewView } from "../routes/ApplicationOverviewView";
import { NewApplicationView } from "../routes/NewApplicationView";

export const RouteList = () => {
  return (
    <Routes>
      <Route path="/" element={<ApplicationOverviewView />} />
      <Route path="/new-application" element={<NewApplicationView />} />
    </Routes>
  );
};
