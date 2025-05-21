/* eslint-disable react/prop-types */
import { useCallback, useRef } from "react";
import { ButtonLoader3 } from "../../components/shared/ButtonLoaders";
import ShowMessage from "../../components/shared/ShowMessage";
import { TableSkelton1 } from "../../components/skeltons/TableSkeltons";
import AppHead from "../../seo/AppHead";
import useGetAllSupportMessages from "../../services/admin/useGetAllSupportMessages";

function SupportMessages() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useGetAllSupportMessages();

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

  const allMessages = data?.pages?.flatMap((page) => page.data.results) || [];

  return (
    <>
      <AppHead title="Support Messages - Deal Junkie" />
      <div className="w-full h-auto p-5">
        <div className="flex items-center justify-between">
          <h1 className="text-[#02174C] text-[30px] font-[600]">
            Support Messages
          </h1>
        </div>
        <div className="mt-3">
          <Table
            messages={allMessages}
            lastItemRef={lastItemRef}
            isLoading={isLoading}
            isFetchingNextPage={isFetchingNextPage}
          />
        </div>
      </div>
    </>
  );
}

export default SupportMessages;

function Table(props) {
  const { messages, isLoading, isFetchingNextPage, lastItemRef } = props;

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
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">
                  Phone Number
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">
                  State
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">
                  City
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">
                  Address
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">
                  Query
                </th>
              </tr>
            </thead>

            {/* Table Data */}
            {messages && (
              <tbody className="divide-y divide-gray-200">
                {messages?.map((data, index) => {
                  const isLast = index === messages.length - 1;

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
                        {data.first_name} {data.last_name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {data.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {data.phone_no}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {data.state}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {data.city}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {data.street_address}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {data.reason}
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
                  <TableSkelton1 key={index} />
                ))}
              </tbody>
            )}
          </table>

          {isFetchingNextPage && (
            <div className="w-full mt-3 flex justify-center">
              <ButtonLoader3 />
            </div>
          )}

          {messages?.length === 0 && !isLoading && (
            <div className="w-full h-[200px] flex justify-center items-center">
              <ShowMessage title="We didn't find any support messages" />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
