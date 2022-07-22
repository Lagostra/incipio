import { Route, Routes } from "react-router-dom";
import { ApplicationDetailView } from "../routes/ApplicationDetailView";
import { ApplicationOverviewView } from "../routes/ApplicationOverviewView";
import { NewApplicationView } from "../routes/NewApplicationView";
import { ReleaseDetailsView } from "../routes/ReleaseDetailsView";

export const RouteList = () => {
  return (
    <Routes>
      <Route path="/" element={<ApplicationOverviewView />} />
      <Route path="/new-application" element={<NewApplicationView />} />
      <Route
        path="/applications/:applicationName"
        element={<ApplicationDetailView />}
      />
      <Route
        path="/applications/:applicationName/releases/:releaseTag/:environment"
        element={<ReleaseDetailsView />}
      />
      <Route
        path="/applications/:applicationName/releases/:releaseTag"
        element={<ReleaseDetailsView />}
      />
    </Routes>
  );
};
