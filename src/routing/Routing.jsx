/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GlobalContext from "../context/GlobalContext";
import useCurrentUser from "../services/common/useCurrentUser";
import { getAccessToken } from "../storage/storage";

import { PageLoader } from "../components/shared/PageLoader";
import ScrollToTop from "./ScrollToTop";
// Buyer pages
import Landing from "../pages/buyer/landing/Landing";
import FindExperts from "../pages/buyer/find-experts/FindExperts";

const Routing = () => {
  const token = getAccessToken();
  const { userInfo } = useContext(GlobalContext);
  const { loading, getCurrentUser } = useCurrentUser();

  useEffect(() => {
    if (token) {
      getCurrentUser(token);
    }
  }, [token]);

  return (
    <>
      {loading && <PageLoader />}
      <Router>
        <Routes>
          {token ? (
            <>
              <Route path="/" element={<Landing />} />
              <Route path="*" element={<Landing />} />
              <Route path="/find-experts" element={<FindExperts />} />
            </>
          ) : (
            <>
              <Route path="/" element={<Landing />} />
              <Route path="*" element={<Landing />} />
            </>
          )}
        </Routes>
        <ScrollToTop />
      </Router>
    </>
  );
};

export default Routing;
