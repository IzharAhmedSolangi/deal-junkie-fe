/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GlobalContext from "../context/GlobalContext";
import useCurrentUser from "../services/useCurrentUser";
import { getAccessToken } from "../storage/storage";

// Pages
import { PageLoader } from "../components/shared/PageLoader";
import ScrollToTop from "./ScrollToTop";
import Landing from "../pages/landing/Landing";

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
