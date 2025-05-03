/* eslint-disable react/prop-types */
import { ButtonLoader3 } from "../../components/shared/ButtonLoaders";
import ShowMessage from "../../components/shared/ShowMessage";
import { TableSkelton1 } from "../../components/skeltons/TableSkeltons";
import AppHead from "../../seo/AppHead";
import useGetllAllSupportMessages from "../../services/admin/useGetllAllSupportMessages";

function SupportMessages() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useGetllAllSupportMessages();

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
            messages={data}
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
  const { messages, isLoading, isFetchingNextPage } = props;
  return (
    <>
      <div className="border border-[#DFDFDF] bg-white rounded-[10px] overflow-x-auto">
        <table id="analyticsTable" className="w-full  min-w-full">
          <thead className="bg-[#F9F9F9] text-black font-[500] md:text-[16px] text-[12px] text-center">
            <tr>
              <th className="py-3 px-4 lg:min-w-[100px] md:min-w-[120px] min-w-[120px] ">
                #
              </th>
              <th className="py-3 px-4 lg:min-w-[100px] md:min-w-[140px] min-w-[120px] ">
                Name
              </th>
              <th className="py-3 px-4 lg:min-w-[100px] md:min-w-[140px] min-w-[120px] ">
                Email
              </th>
              <th className="py-3 px-4 lg:min-w-[100px] md:min-w-[180px] min-w-[160px] ">
                Phone Number
              </th>
              <th className="py-3 px-4 lg:min-w-[100px] md:min-w-[140px] min-w-[120px] ">
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
              {Array.from({ length: 20 }).map((data, index) => (
                <tr
                  key={index}
                  className="bg-white text-[#716F7D] border-t border-t-[#DFDFDF] text-center md:text-[14px] text-[12px]"
                >
                  <td className="px-2 py-3">{index + 1}</td>
                  <td className="px-2 py-3">Alex Hales</td>
                  <td className="px-2 py-3">test@gmail.com</td>
                  <td className="px-2 py-3">1234567890</td>
                  <td className="px-2 py-3">Punjab</td>
                  <td className="px-2 py-3">Lahore</td>
                  <td className="px-2 py-3">Ali town, Lahore</td>
                  <td className="px-2 py-3">
                    Do you want help updating the JSX where these icons are
                    used? Do you want help updating the JSX where these icons
                    are used? Do you want help updating the JSX where these
                    icons are used?
                  </td>
                </tr>
              ))}
            </tbody>
          )}

          {/* Loading */}
          {isLoading && (
            <>
              {Array.from({ length: 6 }, (_, index) => (
                <TableSkelton1 key={index} />
              ))}
            </>
          )}
        </table>

        {isFetchingNextPage && messages && (
          <div className="w-full mt-3 flex justify-center">
            <ButtonLoader3 />
          </div>
        )}

        {messages?.length === 0 && !isLoading && (
          <div className="w-full h-[200px] flex justify-center items-center">
            <ShowMessage title="We didn't find any messages" />
          </div>
        )}
      </div>
    </>
  );
}
