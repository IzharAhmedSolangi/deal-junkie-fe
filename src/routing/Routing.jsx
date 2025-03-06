/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GlobalContext from "../context/GlobalContext";
import useCurrentUser from "../services/common/useCurrentUser";
import { getAccessToken } from "../storage/storage";

import { PageLoader } from "../components/shared/PageLoader";
import ScrollToTop from "./ScrollToTop";

// Buyer pages
import BuyerLanding from "../pages/buyer/landing/Landing";
import FindExperts from "../pages/buyer/find-experts/FindExperts";
import BuyerDashboard from "../pages/buyer/dashboard/Dashboard";
import BuyerFAQs from "../pages/buyer/faqs/FAQs";

// Seller pages
import SellerFAQs from "../pages/seller/faqs/FAQs";

// Common pages
import ContactUs from "../pages/common/ContactUs";
import AboutUs from "../pages/common/AboutUs";
import HowItWorks from "../pages/common/HowItWorks";
import Pricing from "../pages/common/Pricing";

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
          {token && (
            <>
              <Route path="/" element={<BuyerLanding />} />
              <Route path="*" element={<BuyerLanding />} />
              <Route path="/find-experts" element={<FindExperts />} />
              <Route path="/dashboard/:tabName" element={<BuyerDashboard />} />
            </>
          )}

          {/* Common pages */}
          <Route path="/" element={<BuyerLanding />} />
          <Route path="*" element={<BuyerLanding />} />
          <Route path="/buyer-faqs" element={<BuyerFAQs />} />
          <Route path="/seller-faqs" element={<SellerFAQs />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/pricing" element={<Pricing />} />
        </Routes>
        <ScrollToTop />
      </Router>
    </>
  );
};

export default Routing;
