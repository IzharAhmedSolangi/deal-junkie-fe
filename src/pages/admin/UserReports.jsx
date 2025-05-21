/* eslint-disable react/prop-types */
import { useCallback, useRef } from "react";
import { ButtonLoader3 } from "../../components/shared/ButtonLoaders";
import ShowMessage from "../../components/shared/ShowMessage";
import { TableSkelton3 } from "../../components/skeltons/TableSkeltons";
import AppHead from "../../seo/AppHead";
import useGetllAllUserReports from "../../services/admin/useGetAllUserReports";

function UserReports() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useGetllAllUserReports();

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

  // const allReports = data?.pages?.flatMap((page) => page.data.results) || [];
  const allReports = [];

  return (
    <>
      <AppHead title="User Reports - Deal Junkie" />
      <div className="w-full h-auto p-5">
        <div className="flex items-center justify-between">
          <h1 className="text-[#02174C] text-[30px] font-[600]">
            User Reports
          </h1>
        </div>
        <div className="mt-3">
          <Table
            reports={allReports}
            lastItemRef={lastItemRef}
            isLoading={isLoading}
            isFetchingNextPage={isFetchingNextPage}
          />
        </div>
      </div>
    </>
  );
}

export default UserReports;

function Table(props) {
  const { reports, isLoading, isFetchingNextPage, lastItemRef } = props;

  return (
    <>
      <div className="bg-white rounded-lg border border-[#DFDFDF] overflow-hidden">
        <div className="overflow-x-auto">
          <table
            id="analyticsTable"
            className="min-w-full divide-y divide-gray-200"
          >
            <thead className="bg-[#F9F9F9]">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">
                  #
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">
                  Reported User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">
                  Reason
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">
                  Description
                </th>
              </tr>
            </thead>

            {/* Table Data */}
            {reports && (
              <tbody className="divide-y divide-gray-200">
                {reports?.map((data, index) => {
                  const isLast = index === reports.length - 1;

                  return (
                    <tr
                      key={index}
                      ref={isLast ? lastItemRef : null}
                      className="text-left text-xs"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {data.reported_user}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {data.reason}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {data.details}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            )}

            {/* Loading State */}
            {isLoading && (
              <tbody>
                {Array.from({ length: 6 }, (_, index) => (
                  <TableSkelton3 key={index} />
                ))}
              </tbody>
            )}
          </table>

          {isFetchingNextPage && (
            <div className="w-full mt-3 flex justify-center">
              <ButtonLoader3 />
            </div>
          )}

          {reports?.length === 0 && !isLoading && (
            <div className="w-full h-[200px] flex justify-center items-center">
              <ShowMessage title="We didn't find any user reports" />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
