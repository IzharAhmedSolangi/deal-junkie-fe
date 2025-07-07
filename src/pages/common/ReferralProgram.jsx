/* eslint-disable react/prop-types */
import { useCallback, useContext, useRef, useState } from "react";
import AppHead from "../../seo/AppHead";
import {
  FaCheck,
  FaFacebook,
  FaLinkedin,
  FaUsers,
  FaWhatsapp,
} from "react-icons/fa";
import { MdContentCopy } from "react-icons/md";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import {
  FacebookShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
} from "react-share";
import GlobalContext from "../../context/GlobalContext";
import useReferralStats from "../../services/common/useReferralStats";
import useGetReferredUsers from "../../services/common/useGetReferredUsers";
import { ButtonLoader3 } from "../../components/shared/ButtonLoaders";
import ShowMessage from "../../components/shared/ShowMessage";
import {
  TableSkelton4,
  TableSkelton5,
  TableSkelton6,
} from "../../components/skeltons/TableSkeltons";
import { FormatDate, FormatDateAndTime } from "../../utils/FormatDate";
import useGetPayoutHistory from "../../services/common/useGetPayoutHistory";
import useGetEarnings from "../../services/common/useGetEarnings";

function ReferralProgram() {
  return (
    <>
      <AppHead title="Referral Program - Deal Junkie" />
      <div className="bg-white w-full h-auto md:pb-40 pb-28 relative">
        <div className="w-full md:h-[320px] h-[260px] flex justify-center items-center">
          <img
            src="/assets/images/Banner2.png"
            alt=""
            className="absolute top-0 left-0 w-full md:h-[320px] h-[260px]"
          />
          <h1 className="font-[700] md:text-[48px] text-[30px] text-secondary z-10 text-center">
            Referral Program
          </h1>
        </div>
        <div className="lg:px-10 px-5 mt-5">
          <RefferalCard border="1px solid #E9EDF7" />
          <Stats />
          <ReferredUsersTable />
          <Earnings />
          <PayoutHistoryTable />
        </div>
      </div>
    </>
  );
}

export default ReferralProgram;

const RefferalCard = () => {
  const [copied, setCopied] = useState(false);
  const { userInfo } = useContext(GlobalContext);
  const APP_URL = import.meta.env.VITE_REDIRECT_URL;

  const referral_link = `${APP_URL}/#/?referral=${userInfo?.user?.referral_code}`;

  const handlecopy = () => {
    navigator.clipboard.writeText(referral_link).then(() => {
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 1000);
    });
  };

  return (
    <>
      <div className="rounded-[12px] md:px-6 px-2 py-2 flex lg:flex-row flex-col-reverse items-center justify-between border border-gray-300">
        <div className="flex flex-col md:items-start items-center">
          <h1 className="text-[#263238] font-bold md:text-[30px] text-[24px]">
            Share and claim your reward!
          </h1>
          <span className="text-[#4E4949] md:text-[16px] text-[12px] md:w-[65%]">
            Get your personalized referral link from your Deal Junkie dashboard.
            Share this link with others through SMS, WhatsApp, LinkedIn, or any
            other platform.
          </span>
          <div className="w-full flex items-center gap-2 mt-3">
            <div className="border border-[#BBBFCC] md:w-auto w-full h-[40px] px-2 flex items-center rounded-[6px]">
              {referral_link}
            </div>
            <button
              onClick={handlecopy}
              className="md:flex hidden items-center justify-center gap-1 text-white bg-primary rounded-[6px] px-3 h-[40px] cursor-pointer hover-slide-button"
            >
              {copied ? (
                <>
                  <FaCheck className="text-[20px]" />
                </>
              ) : (
                <>
                  <MdContentCopy className="text-[20px]" />
                </>
              )}
            </button>
          </div>
          <div className="flex justify-between mt-3 w-full">
            <button
              onClick={handlecopy}
              className="md:hidden flex items-center justify-center gap-1 text-white bg-primary rounded-[6px] px-3 h-[40px] cursor-pointer hover-slide-button"
            >
              {copied ? (
                <>
                  <FaCheck className="text-[20px]" />
                </>
              ) : (
                <>
                  <MdContentCopy className="text-[20px]" />
                </>
              )}
            </button>
            <div className="flex gap-5">
              <LinkedinShareButton url={referral_link} title="Deal Junkie">
                <div className="border border-[#BBBFCC] w-[40px] h-[40px] rounded-[3px] flex justify-center items-center hover:bg-primary hover:text-white hover:border-primary hover-slide-button">
                  <FaLinkedin className="text-[22px]" />
                </div>
              </LinkedinShareButton>
              <FacebookShareButton url={referral_link} title="Deal Junkie">
                <div className="border border-[#BBBFCC] w-[40px] h-[40px] rounded-[3px] flex justify-center items-center hover:bg-primary hover:text-white hover:border-primary hover-slide-button">
                  <FaFacebook className="text-[22px]" />
                </div>
              </FacebookShareButton>
              <WhatsappShareButton url={referral_link} title="Deal Junkie">
                <div className="border border-[#BBBFCC] w-[40px] h-[40px] rounded-[3px] flex justify-center items-center hover:bg-primary hover:text-white hover:border-primary hover-slide-button">
                  <FaWhatsapp className="text-[22px]" />
                </div>
              </WhatsappShareButton>
            </div>
          </div>
        </div>
        <img
          className="w-[400px] h-[320px]"
          src="/assets/images/referral-program.png"
          alt=""
        />
      </div>
    </>
  );
};

const Stats = () => {
  const { data, isLoading } = useReferralStats();

  return (
    <div className="mt-5">
      <div className="grid sm:grid-cols-6 grid-cols-2 gap-2">
        <Card
          title="Total Referrals"
          icon={<FaUsers />}
          count={data?.total_referrals || 0}
        />
        <Card
          title="Total Earning"
          icon={<RiMoneyDollarCircleFill />}
          count={`$${data?.total_earnings || 0}`}
        />
        <Card
          title="Pending Earning"
          icon={<RiMoneyDollarCircleFill />}
          count={`$${data?.pending_earnings || 0}`}
        />
        <Card
          title="Paid Earning"
          icon={<RiMoneyDollarCircleFill />}
          count={`$${data?.paid_earnings || 0}`}
        />
        <Card
          title="Total Payouts"
          icon={<RiMoneyDollarCircleFill />}
          count={`$${data?.total_payouts || 0}`}
        />
        <Card
          title="Pending Payouts"
          icon={<RiMoneyDollarCircleFill />}
          count={`$${data?.pending_payouts || 0}`}
        />
      </div>
    </div>
  );
};

const Card = (props) => {
  const { title, icon, count } = props;
  return (
    <div className="bg-white border border-[#E9EDF7] rounded-xl flex flex-col justify-between md:h-[150px] h-[150px] md:p-5 p-3">
      <div className="flex flex-col">
        <h1 className="text-[#02174C] md:text-[20px] text-[18px] font-[600]">
          {title}
        </h1>
        <span className="text-[#02174C] md:text-[30px] text-[20px] font-[600]">
          {count}
        </span>
      </div>
      <div className="flex items-center justify-end text-[40px]">{icon}</div>
    </div>
  );
};

const ReferredUsersTable = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useGetReferredUsers();

  const observer = useRef();

  const lastItemRef = useCallback(
    (node) => {
      if (isFetchingNextPage) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });

      if (node) observer.current.observe(node);
    },
    [isFetchingNextPage, hasNextPage, fetchNextPage]
  );

  const allReferredUsers =
    data?.pages?.flatMap((page) => page.data.results) || [];

  return (
    <div className="mt-5">
      <h1 className="font-[600] md:text-[22px] text-[18px] text-secondary">
        Referred Users
      </h1>
      <div className="bg-white rounded-lg border border-[#DFDFDF] overflow-hidden">
        <div className="overflow-x-auto">
          <table
            id="analyticsTable"
            className="min-w-full divide-y divide-gray-200"
          >
            <thead className="bg-[#F9F9F9]">
              <tr>
                <th className="px-3 py-3 text-left text-[16px] font-bold text-gray-500 tracking-wider">
                  #
                </th>
                <th className="px-3 py-3 text-left text-[16px] font-bold text-gray-500 tracking-wider">
                  Name
                </th>
                <th className="px-3 py-3 text-left text-[16px] font-bold text-gray-500 tracking-wider">
                  Email
                </th>
                <th className="px-3 py-3 text-left text-[16px] font-bold text-gray-500 tracking-wider">
                  Phone
                </th>
                <th className="px-3 py-3 text-left text-[16px] font-bold text-gray-500 tracking-wider">
                  Date
                </th>
              </tr>
            </thead>

            {/* Table Data */}
            {allReferredUsers && (
              <tbody className="divide-y divide-gray-200">
                {allReferredUsers?.map((data, index) => {
                  const isLast = index === allReferredUsers.length - 1;

                  return (
                    <tr
                      key={index}
                      ref={isLast ? lastItemRef : null}
                      className="text-left text-[16px]"
                    >
                      <td className="px-3 py-3 whitespace-nowrap">
                        {index + 1}
                      </td>
                      <td className="px-3 py-3 flex items-center gap-2">
                        <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center text-[15px] font-semibold text-white">
                          {data?.first_name?.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-semibold text-[16px] text-secondary">
                            {data?.first_name}
                          </p>
                          <p className="text-[#6F7487] text-sm font-[500]"></p>
                        </div>
                      </td>
                      <td className="px-3 py-3 text-[15px] whitespace-nowrap">
                        {data.email}
                      </td>
                      <td className="px-3 py-3 text-[15px] whitespace-nowrap">
                        {data.phone_number}
                      </td>
                      <td className="px-3 py-3 text-[15px] whitespace-nowrap">
                        {FormatDate(data.created_at)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            )}

            {/* Loading State */}
            {isLoading && (
              <tbody className="divide-y divide-gray-200">
                {Array.from({ length: 6 }, (_, index) => (
                  <TableSkelton4 key={index} />
                ))}
              </tbody>
            )}
          </table>

          {isFetchingNextPage && (
            <div className="w-full mt-3 flex justify-center">
              <ButtonLoader3 />
            </div>
          )}

          {allReferredUsers?.length === 0 && !isLoading && (
            <div className="w-full h-[200px] flex justify-center items-center">
              <ShowMessage title="We didn't find any referred users" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Earnings = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useGetEarnings();

  const observer = useRef();

  const lastItemRef = useCallback(
    (node) => {
      if (isFetchingNextPage) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });

      if (node) observer.current.observe(node);
    },
    [isFetchingNextPage, hasNextPage, fetchNextPage]
  );

  const earnings = data?.pages?.flatMap((page) => page.data.results) || [];

  return (
    <div className="mt-5">
      <h1 className="font-[600] md:text-[22px] text-[18px] text-secondary">
        Earnings
      </h1>
      <div className="bg-white rounded-lg border border-[#DFDFDF] overflow-hidden">
        <div className="overflow-x-auto">
          <table
            id="analyticsTable"
            className="min-w-full divide-y divide-gray-200"
          >
            <thead className="bg-[#F9F9F9]">
              <tr>
                <th className="px-3 py-3 text-left text-[16px] font-bold text-gray-500 tracking-wider">
                  #
                </th>
                <th className="px-3 py-3 text-left text-[16px] font-bold text-gray-500 tracking-wider">
                  Name
                </th>
                <th className="px-3 py-3 text-left text-[16px] font-bold text-gray-500 tracking-wider">
                  Project Name
                </th>
                <th className="px-3 py-3 text-left text-[16px] font-bold text-gray-500 tracking-wider">
                  Transaction Amount
                </th>
                <th className="px-3 py-3 text-left text-[16px] font-bold text-gray-500 tracking-wider">
                  Earning
                </th>
                <th className="px-3 py-3 text-left text-[16px] font-bold text-gray-500 tracking-wider">
                  Paid Date
                </th>
              </tr>
            </thead>

            {/* Table Data */}
            {earnings && (
              <tbody className="divide-y divide-gray-200">
                {earnings?.map((data, index) => {
                  const isLast = index === earnings.length - 1;

                  return (
                    <tr
                      key={index}
                      ref={isLast ? lastItemRef : null}
                      className="text-left text-[16px]"
                    >
                      <td className="px-3 py-3 whitespace-nowrap">
                        {index + 1}
                      </td>
                      <td className="px-3 py-3 flex items-center gap-2">
                        <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center text-[15px] font-semibold text-white">
                          {data?.referred_user_name?.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-semibold text-[16px] text-secondary">
                            {data?.referred_user_name}
                          </p>
                          <p className="text-[#6F7487] text-sm font-[500]"></p>
                        </div>
                      </td>
                      <td className="px-3 py-3 text-[15px] whitespace-nowrap">
                        {data.project_title}
                      </td>
                      <td className="px-3 py-3 text-[15px] whitespace-nowrap">
                        ${data.transaction_amount}
                      </td>
                      <td className="px-3 py-3 text-[15px] whitespace-nowrap">
                        ${data.ambassador_earning}
                      </td>
                      <td className="px-3 py-3 text-[15px] whitespace-nowrap">
                        {FormatDateAndTime(data.paid_at)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            )}

            {/* Loading State */}
            {isLoading && (
              <tbody className="divide-y divide-gray-200">
                {Array.from({ length: 6 }, (_, index) => (
                  <TableSkelton5 key={index} />
                ))}
              </tbody>
            )}
          </table>

          {isFetchingNextPage && (
            <div className="w-full mt-3 flex justify-center">
              <ButtonLoader3 />
            </div>
          )}

          {earnings?.length === 0 && !isLoading && (
            <div className="w-full h-[200px] flex justify-center items-center">
              <ShowMessage title="We didn't find any earnings" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const PayoutHistoryTable = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useGetPayoutHistory();

  const observer = useRef();

  const lastItemRef = useCallback(
    (node) => {
      if (isFetchingNextPage) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });

      if (node) observer.current.observe(node);
    },
    [isFetchingNextPage, hasNextPage, fetchNextPage]
  );

  const allPayoutHistory =
    data?.pages?.flatMap((page) => page.data.results) || [];

  return (
    <div className="mt-5">
      <h1 className="font-[600] md:text-[22px] text-[18px] text-secondary">
        Payout History
      </h1>
      <div className="bg-white rounded-lg border border-[#DFDFDF] overflow-hidden">
        <div className="overflow-x-auto">
          <table
            id="analyticsTable"
            className="min-w-full divide-y divide-gray-200"
          >
            <thead className="bg-[#F9F9F9]">
              <tr>
                <th className="px-3 py-3 text-left text-[16px] font-bold text-gray-500 tracking-wider">
                  #
                </th>
                <th className="px-3 py-3 text-left text-[16px] font-bold text-gray-500 tracking-wider">
                  Name
                </th>
                <th className="px-3 py-3 text-left text-[16px] font-bold text-gray-500 tracking-wider">
                  Amount
                </th>
                <th className="px-3 py-3 text-left text-[16px] font-bold text-gray-500 tracking-wider">
                  Status
                </th>
                <th className="px-3 py-3 text-left text-[16px] font-bold text-gray-500 tracking-wider">
                  Stripe ID
                </th>
                <th className="px-3 py-3 text-left text-[16px] font-bold text-gray-500 tracking-wider">
                  Payment Method
                </th>
                <th className="px-3 py-3 text-left text-[16px] font-bold text-gray-500 tracking-wider">
                  Requested Date
                </th>
                <th className="px-3 py-3 text-left text-[16px] font-bold text-gray-500 tracking-wider">
                  Processed Date
                </th>
                <th className="px-3 py-3 text-left text-[16px] font-bold text-gray-500 tracking-wider">
                  Request Payout
                </th>
              </tr>
            </thead>

            {/* Table Data */}
            {allPayoutHistory && (
              <tbody className="divide-y divide-gray-200">
                {allPayoutHistory?.map((data, index) => {
                  const isLast = index === allPayoutHistory.length - 1;

                  return (
                    <tr
                      key={index}
                      ref={isLast ? lastItemRef : null}
                      className="text-left text-[16px]"
                    >
                      <td className="px-3 py-3 whitespace-nowrap">
                        {index + 1}
                      </td>
                      <td className="px-3 py-3 flex items-center gap-2">
                        <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center text-[15px] font-semibold text-white">
                          {data?.ambassador_name?.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-semibold text-[16px] text-secondary">
                            {data?.ambassador_name}
                          </p>
                          <p className="text-[#6F7487] text-sm font-[500]"></p>
                        </div>
                      </td>
                      <td className="px-3 py-3 text-[15px] whitespace-nowrap">
                        ${data.amount}
                      </td>
                      <td className="px-3 py-3 text-[15px] whitespace-nowrap">
                        {data.status}
                      </td>
                      <td className="px-3 py-3 text-[15px] whitespace-nowrap">
                        {data.stripe_transfer_id}
                      </td>
                      <td className="px-3 py-3 text-[15px] whitespace-nowrap">
                        {data.payout_method}
                      </td>
                      <td className="px-3 py-3 text-[15px] whitespace-nowrap">
                        {FormatDateAndTime(data.requested_at)}
                      </td>
                      <td className="px-3 py-3 text-[15px] whitespace-nowrap">
                        {FormatDateAndTime(data.processed_at)}
                      </td>
                      <td className="px-3 py-3 text-[15px] whitespace-nowrap">
                        <button className="hover-slide-button rounded w-[120px] h-[40px] bg-primary text-[#003F63] text-center cursor-pointer">
                          Request
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            )}

            {/* Loading State */}
            {isLoading && (
              <tbody className="divide-y divide-gray-200">
                {Array.from({ length: 6 }, (_, index) => (
                  <TableSkelton6 key={index} />
                ))}
              </tbody>
            )}
          </table>

          {isFetchingNextPage && (
            <div className="w-full mt-3 flex justify-center">
              <ButtonLoader3 />
            </div>
          )}

          {allPayoutHistory?.length === 0 && !isLoading && (
            <div className="w-full h-[200px] flex justify-center items-center">
              <ShowMessage title="We didn't find any payout history" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
