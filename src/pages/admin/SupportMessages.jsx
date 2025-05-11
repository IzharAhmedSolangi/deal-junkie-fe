/* eslint-disable react/prop-types */
import { useCallback, useRef } from "react";
import { ButtonLoader3 } from "../../components/shared/ButtonLoaders";
import ShowMessage from "../../components/shared/ShowMessage";
import { TableSkelton1 } from "../../components/skeltons/TableSkeltons";
import AppHead from "../../seo/AppHead";
import useGetAllSupportMessages from "../../services/admin/useGetllAllSupportMessages";

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
      <div className="border border-[#DFDFDF] bg-white rounded-[10px] overflow-x-auto">
        <table id="analyticsTable" className="w-full min-w-full">
          <thead className="bg-[#F9F9F9] text-black font-[500] md:text-[16px] text-[12px] text-center">
            <tr>
              <th className="py-3 px-4 lg:min-w-[100px] md:min-w-[120px] min-w-[120px]">
                #
              </th>
              <th className="py-3 px-4 lg:min-w-[100px] md:min-w-[140px] min-w-[120px]">
                Name
              </th>
              <th className="py-3 px-4 lg:min-w-[100px] md:min-w-[140px] min-w-[120px]">
                Email
              </th>
              <th className="py-3 px-4 lg:min-w-[100px] md:min-w-[180px] min-w-[160px]">
                Phone Number
              </th>
              <th className="py-3 px-4 lg:min-w-[100px] md:min-w-[140px] min-w-[120px]">
                State
              </th>
              <th className="py-3 px-4 lg:min-w-[100px] md:min-w-[120px]">
                City
              </th>
              <th className="py-3 px-4 lg:min-w-[100px] md:min-w-[120px]">
                Address
              </th>
              <th className="py-3 px-4 lg:min-w-[100px] md:min-w-[120px]">
                Query
              </th>
            </tr>
          </thead>

          {/* Table Data */}
          {messages && (
            <tbody>
              {messages?.map((data, index) => {
                const isLast = index === messages.length - 1;

                return (
                  <tr
                    key={index}
                    ref={isLast ? lastItemRef : null}
                    className="bg-white text-[#716F7D] border-t border-t-[#DFDFDF] text-center md:text-[14px] text-[12px]"
                  >
                    <td className="px-2 py-3">{index + 1}</td>
                    <td className="px-2 py-3">
                      {data.first_name} {data.last_name}
                    </td>
                    <td className="px-2 py-3">{data.email}</td>
                    <td className="px-2 py-3">{data.phone_no}</td>
                    <td className="px-2 py-3">{data.state}</td>
                    <td className="px-2 py-3">{data.city}</td>
                    <td className="px-2 py-3">{data.street_address}</td>
                    <td className="px-2 py-3">{data.reason}</td>
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
    </>
  );
}
