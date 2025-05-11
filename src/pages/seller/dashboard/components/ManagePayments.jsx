/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import useGetPaymentHistory from "../../../../services/seller/useGetPaymentHistory";
import { TableSkelton2 } from "../../../../components/skeltons/TableSkeltons";
import ShowMessage from "../../../../components/shared/ShowMessage";

function ManagePayments() {
  const { GetPaymentHistory, paymentHistory } = useGetPaymentHistory();

  useEffect(() => {
    GetPaymentHistory();
  }, []);

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
      <TransactionTable paymentHistory={paymentHistory} />
    </>
  );
}

export default ManagePayments;

const TransactionTable = (props) => {
  const { paymentHistory } = props;

  console.log({ paymentHistory });
  return (
    <div className="w-full mt-3">
      <table className="w-full border-collapse">
        <thead>
          <tr className="text-left border-b-[1px] border-b-[#6F748729]">
            <th className="text-[#6F7487] text-[14px] font-[500] pb-2">
              Paid To
            </th>
            <th className="text-[#6F7487] text-[14px] font-[500] pb-2">
              Amount
            </th>
            <th className="text-[#6F7487] text-[14px] font-[500] pb-2">
              Billing Date
            </th>
            <th className="text-[#6F7487] text-[14px] font-[500] pb-2">
              Status
            </th>
            <th className="text-[#6F7487] text-[14px] font-[500] pb-2">
              Action
            </th>
          </tr>
        </thead>

        {paymentHistory.data?.length > 0 && (
          <tbody>
            {Array.from({ length: 5 }).map((item, index) => (
              <tr key={index} className="border-b-[1px] border-b-[#6F748729]">
                <td className="py-2 flex items-center gap-2">
                  <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center text-[15px] font-semibold text-white">
                    {item?.user?.first_name?.charAt(0).toUpperCase()}
                    {item?.user?.last_name?.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-semibold text-[16px] text-secondary">
                      Dylan Hodges
                    </p>
                    <p className="text-[#6F7487] text-sm font-[500]">
                      #2025550176
                    </p>
                  </div>
                </td>
                <td className="py-2 text-[#6F7487] text-sm font-[500]">$112</td>
                <td className="py-2 text-[#6F7487] text-sm font-[500]">
                  Feb 04, 2023
                </td>
                <td className="py-2 text-[#6F7487] text-sm font-[500]">Paid</td>
                <td className="py-2 text-[#6F7487] text-sm font-[500]">
                  <div
                    className={`w-full px-3 py-1 text-center rounded-sm text-secondary text-sm font-[500] bg-primary`}
                  >
                    Paid
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        )}

        {paymentHistory.loading && (
          <>
            {Array.from({ length: 6 }, (_, index) => (
              <TableSkelton2 key={index} />
            ))}
          </>
        )}
      </table>

      {paymentHistory.message && !paymentHistory.loading && (
        <div className="w-full h-[200px] flex justify-center items-center">
          <ShowMessage title={paymentHistory.message} />
        </div>
      )}
    </div>
  );
};
