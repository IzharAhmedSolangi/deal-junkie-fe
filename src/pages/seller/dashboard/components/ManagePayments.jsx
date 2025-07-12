/* eslint-disable react/prop-types */
import useGetPaymentHistory from "../../../../services/seller/useGetPaymentHistory";
import { TableSkelton2 } from "../../../../components/skeltons/TableSkeltons";
import ShowMessage from "../../../../components/shared/ShowMessage";
import { ButtonLoader3 } from "../../../../components/shared/ButtonLoaders";
import { useCallback, useRef } from "react";
import { FormatDateAndTime } from "../../../../utils/FormatDate";

function ManagePayments() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useGetPaymentHistory();

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

  const payments = data?.pages?.flatMap((page) => page.data.results) || [];

  return (
    <>
      {/* <h1 className="font-semibold text-[30px] text-secondary">My Payments</h1> */}
      {/* <div className="mt-2 flex md:flex-row flex-col gap-3">
        <div className="bg-secondary rounded-[10px] w-full h-[160px] flex flex-col justify-center px-8">
          <h1 className="font-semibold text-[30px] text-[#FAFAFA]">$ 2,000</h1>
          <p className="font-normal text-[18px] text-[#F9FAFB]">
            Your Payment in Card
          </p>
          <div className="flex items-center gap-2 mt-1">
            <button className="font-normal text-[14px] text-primary underline cursor-pointer">
              Submit in Escrow
            </button>
            <button className="font-normal text-[14px] text-[#FFDA12] underline cursor-pointer">
              Withdraw Now
            </button>
          </div>
        </div>
        <div className="bg-secondary rounded-[10px] w-full h-[160px] flex flex-col justify-center px-5">
          <h1 className="font-semibold text-[30px] text-[#FAFAFA]">$ 2,000</h1>
          <p className="font-normal text-[18px] text-[#F9FAFB]">
            Your Payment in Escrow
          </p>
          <div>
            <button className="font-normal text-[14px] text-primary underline cursor-pointer mt-1">
              Put back to Card
            </button>
          </div>
        </div>
      </div> */}
      <h1 className="font-semibold text-[30px] text-secondary">
        Transactions history
      </h1>
      <TransactionTable
        payments={payments}
        lastItemRef={lastItemRef}
        isLoading={isLoading}
        isFetchingNextPage={isFetchingNextPage}
      />
    </>
  );
}

export default ManagePayments;

const TransactionTable = (props) => {
  const { payments, isLoading, isFetchingNextPage, lastItemRef } = props;

  return (
    <div className="w-full mt-3">
      <table className="w-full border-collapse">
        <thead>
          <tr className="text-left border-b-[1px] border-b-[#6F748729]">
            <th className="text-[#6F7487] text-[14px] font-[500] pb-2">
              Paid To
            </th>
            <th className="text-[#6F7487] text-[14px] font-[500] pb-2">
              Total Amount
            </th>
            <th className="text-[#6F7487] text-[14px] font-[500] pb-2">
              Amount Paid
            </th>
            <th className="text-[#6F7487] text-[14px] font-[500] pb-2">
              Platform Fee
            </th>
            <th className="text-[#6F7487] text-[14px] font-[500] pb-2">Date</th>
            <th className="text-[#6F7487] text-[14px] font-[500] pb-2">
              Status
            </th>
          </tr>
        </thead>

        {payments?.length > 0 && (
          <tbody>
            {payments?.map((item, index) => {
              const isLast = index === payments.length - 1;

              return (
                <tr
                  key={index}
                  ref={isLast ? lastItemRef : null}
                  className="border-b-[1px] border-b-[#6F748729]"
                >
                  <td className="py-2 flex items-center gap-2">
                    <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center text-[15px] font-semibold text-white">
                      {item?.first_name?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-semibold text-[16px] text-secondary">
                        {item?.first_name}
                      </p>
                      <p className="text-[#6F7487] text-sm font-[500]"></p>
                    </div>
                  </td>
                  <td className="py-2 text-[#6F7487] text-sm font-[500]">
                    ${item.amount}
                  </td>
                  <td className="py-2 text-[#6F7487] text-sm font-[500]">
                    ${item.seller_amount}
                  </td>
                  <td className="py-2 text-[#6F7487] text-sm font-[500]">
                    ${item.platform_fee}
                  </td>
                  <td className="py-2 text-[#6F7487] text-sm font-[500]">
                    {FormatDateAndTime(item.created_at)}
                  </td>
                  <td className="py-2 text-[#6F7487] text-sm font-[500]">
                    <div
                      className={`w-full px-3 py-1 text-center rounded-sm text-secondary text-sm font-[500] bg-primary`}
                    >
                      Paid
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        )}

        {isLoading && (
          <tbody>
            {Array.from({ length: 6 }, (_, index) => (
              <TableSkelton2 key={index} />
            ))}
          </tbody>
        )}
      </table>

      {isFetchingNextPage && (
        <div className="w-full mt-3 flex justify-center">
          <ButtonLoader3 />
        </div>
      )}

      {payments?.length === 0 && !isLoading && (
        <div className="w-full h-[200px] flex justify-center items-center">
          <ShowMessage title="We didn't find any payments" />
        </div>
      )}
    </div>
  );
};
