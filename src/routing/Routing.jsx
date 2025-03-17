/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import GlobalContext from "../context/GlobalContext";
import useCurrentUser from "../services/common/useCurrentUser";
import { getAccessToken } from "../storage/storage";

import { PageLoader } from "../components/shared/PageLoader";
import ScrollToTop from "./ScrollToTop";

// Buyer pages
import BuyerLanding from "../pages/buyer/landing/Landing";
import FindExperts from "../pages/buyer/find-experts/FindExperts";
import FindExpertDetails from "../pages/buyer/find-expert-details/FindExpertDetails";
import BuyerDashboard from "../pages/buyer/dashboard/Dashboard";
import BuyerFAQs from "../pages/buyer/faqs/FAQs";

// Seller pages
import SellerLanding from "../pages/seller/landing/Landing";
import FindJobs from "../pages/seller/find-jobs/FindJobs";
import FindJobDetails from "../pages/seller/find-job-details/FindJobDetails";
import SellerDashboard from "../pages/seller/dashboard/Dashboard";
import SellerFAQs from "../pages/seller/faqs/FAQs";

// Common pages
import ContactUs from "../pages/common/ContactUs";
import AboutUs from "../pages/common/AboutUs";
import HowItWorks from "../pages/common/HowItWorks";
import Pricing from "../pages/common/Pricing";
import Inbox from "../pages/common/Inbox";

// Admin pages
import AdminLayout from "../pages/admin/components/Layout";
import AdminDashboard from "../pages/admin/Dashboard";
import AdminJobs from "../pages/admin/Jobs";
import AdminEarnings from "../pages/admin/Earnings";
import AdminBuyers from "../pages/admin/Buyers";
import AdminSellers from "../pages/admin/Sellers";
import AdminChats from "../pages/admin/Chats";
import AdminSupportMessages from "../pages/admin/SupportMessages";
import AdminSellerDetails from "../pages/admin/SellerDetails";
import AdminBuyerDetails from "../pages/admin/BuyerDetails";
import AdminJobDetails from "../pages/admin/JobDetails";
import Layout from "../components/shared/Layout";

const Routing = () => {
  const token = getAccessToken();
  const { userInfo } = useContext(GlobalContext);
  const { loading, setLoading, getCurrentUser } = useCurrentUser();

  useEffect(() => {
    if (token) {
      setLoading(true);
      getCurrentUser(token);
    }
  }, []);

  return (
    <>
      {loading && <PageLoader />}
      <Routes>
        {token && (
          <>
            {/* Buyer pages */}
            {userInfo?.user?.role === "buyer" && (
              <Route path="/" element={<Layout />}>
                <Route index element={<BuyerLanding />} />
                <Route path="*" element={<BuyerLanding />} />
                <Route path="find-experts" element={<FindExperts />} />
                <Route
                  path="find-experts/:sellerId"
                  element={<FindExpertDetails />}
                />
                <Route path="dashboard/:tabName" element={<BuyerDashboard />} />
                <Route path="inbox" element={<Inbox />} />
              </Route>
            )}
            {userInfo?.user?.role === "seller" && (
              <Route path="/" element={<Layout />}>
                <Route index element={<SellerLanding />} />
                <Route path="*" element={<SellerLanding />} />
                <Route path="find-jobs" element={<FindJobs />} />
                <Route path="find-jobs/:jobId" element={<FindJobDetails />} />
                <Route
                  path="dashboard/:tabName"
                  element={<SellerDashboard />}
                />
                <Route path="inbox" element={<Inbox />} />
              </Route>
            )}
            {/* Admin pages */}
            {userInfo?.user?.role === "admin" && (
              <Route path="/" element={<AdminLayout />}>
                <Route path="admin/dashboard" element={<AdminDashboard />} />
                <Route path="admin/jobs" element={<AdminJobs />} />
                <Route path="admin/jobs/:jobId" element={<AdminJobDetails />} />
                <Route path="admin/earnings" element={<AdminEarnings />} />
                <Route path="admin/buyers" element={<AdminBuyers />} />
                <Route
                  path="admin/buyers/:buyerId"
                  element={<AdminBuyerDetails />}
                />
                <Route path="admin/sellers" element={<AdminSellers />} />
                <Route
                  path="admin/sellers/:sellerId"
                  element={<AdminSellerDetails />}
                />
                <Route path="admin/chats" element={<AdminChats />} />
                <Route
                  path="admin/support-messages"
                  element={<AdminSupportMessages />}
                />
              </Route>
            )}
          </>
        )}

        {/* Public pages (Seller & Buyer) */}
        <Route path="/" element={<Layout />}>
          <Route index element={<BuyerLanding />} />
          <Route path="*" element={<BuyerLanding />} />
          <Route path="buyer-faqs" element={<BuyerFAQs />} />
          <Route path="seller-faqs" element={<SellerFAQs />} />
          <Route path="contact-us" element={<ContactUs />} />
          <Route path="about-us" element={<AboutUs />} />
          <Route path="how-it-works" element={<HowItWorks />} />
          <Route path="pricing" element={<Pricing />} />
        </Route>
      </Routes>
      <ScrollToTop />
    </>
  );
};

export default Routing;
