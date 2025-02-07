import { toast } from "react-toastify";
import MasterCardLogo from "../../assets/images/masterCardLogo.png";
import { TableLoader } from "../../components/Loader";
import Table from "../../components/table";
import TablePagination from "../../components/table/TablePagination";
import Notification from "../../components/Notification";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import paginate from "../../lib/utils/paginate";

const clients = [
  {
    id: 1,
    name: "Starter Plan",
    linkText: "Upgrade",
    title: "Current Plan",
    date: "December 13, 2022",
    dateTime: "2022-12-13",
    link: "/app/subscription",
  },
  {
    id: 2,
    name: "Card",
    linkText: "Update",
    title: "Payment Method",
    cardNo: "1234********3456",
    dateTime: "2023-01-22",
    amount: "$14,000.00",
    status: "Paid",
    link: "",
  },
];

const sampleData = [
  {
    plan: "Premium",
    type: "Job Seeker",
    amount: "30",
    date: "8/7/2024",
    status: "Paid",
  },
  {
    plan: "Team",
    type: "Recruiter",
    amount: "30",
    date: "8/7/2024",
    status: "Paid",
  },
];

const Subscription = () => {
  const [allResumes, setAllResumes] = useState<any>([]);
  const [_selectedResume, _setSelectedResume] = useState<any>(null);
  const [search, _setSearch] = useState<string>("");
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const { data, isFetching } = useQuery(
    ["ALL CLASSROOMS", search, page, itemsPerPage],
    () => {},
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      enabled: false,
      onSuccess: (data: any) => {
        setAllResumes(data?.resumes);
      },
      onError: (err: any) => {
        toast(
          <Notification variant="error" title="Request Failed!">
            {err.message}
          </Notification>,
          {
            type: "error",
            hideProgressBar: true,
            toastId: Date.now() + "@USER_FILTER_ERROR",
          }
        );
      },
    }
  );

  const pagination = paginate(
    data?.meta.total_no_items,
    Number(page),
    Number(itemsPerPage)
  );
  return (
    <section>
      <div className="py-6 px-4 md:px-6">
        <div className="mx-auto mt-10">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
            <div className="flex items-center justify-between">
              <h2 className="font-bold leading-7">Subscription Management</h2>
              <a
                href="#"
                className="text-sm font-semibold leading-6 bg-primary rounded-full px-5 py-2 text-white hover:bg-indigo-500"
              >
                View all Plans and Benefits
              </a>
            </div>

            {/* <Cards> */}

            <ul
              role="list"
              className="mt-6 grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-3 xl:gap-x-8"
            >
              {clients.map((card) => (
                <li
                  key={card.id}
                  className="flex flex-col overflow-hidden rounded-md bg-white"
                >
                  <div className="p-6 flex-grow">
                    <div className="text-base font-normal leading-6 text-gray-900 mb-2">
                      {card.title}
                    </div>
                    <div className="flex items-center gap-x-4 bg-gray-50">
                      <div className="text-base font-medium leading-6 text-gray-900">
                        {card.name}
                      </div>

                      <div className="relative ml-auto text-primary underline">
                        <a href={card.link}> {card.linkText}</a>
                      </div>
                    </div>
                  </div>

                  <dl className="-my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6">
                    {card.title === "Current Plan" && (
                      <div className="flex gap-x-4 py-3">
                        <dt className="text-gray-500">Expiry Date:</dt>
                        <dd className="text-gray-700">
                          <time dateTime={card.dateTime}>{card.date}</time>
                        </dd>
                      </div>
                    )}

                    {card.title === "Payment Method" && (
                      <div>
                        <div className="flex gap-x-4 py-3">
                          <dt className="text-gray-500">
                            <img
                              src={MasterCardLogo}
                              className="object-contain h-[24px]"
                            />
                          </dt>
                          <dd className="text-gray-700">
                            <div>{card.cardNo}</div>
                          </dd>
                        </div>
                        <div className="flex gap-x-4 py-3 items-center">
                          <dt className="text-gray-500 font-bold">
                            Auto-Renewal
                          </dt>
                          <dd className="text-gray-700 mt-1.5">
                            <label className="relative inline-flex cursor-pointer items-center">
                              <input
                                id="switch"
                                type="checkbox"
                                className="peer sr-only"
                              />
                              <label
                                htmlFor="switch"
                                className="hidden"
                              ></label>
                              <div className="peer h-4 w-9 rounded-full bg-slate-200 after:absolute after:left-[2px] after:top-0.5 after:h-3 after:w-4 after:rounded-full after:border after:border-white after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
                            </label>
                          </dd>
                        </div>
                      </div>
                    )}
                  </dl>
                </li>
              ))}
            </ul>

            {/* table */}

            <div className="mt-10">
              {isFetching ? (
                <TableLoader />
              ) : allResumes?.length === 0 ? (
                <>
                  <div className="flex items-center justify-between bg-white pt-6 pb-10 px-4">
                    <h2 className="font-bold leading-7">Billing Cycle</h2>
                    <a
                      href="#"
                      className="text-sm font-semibold leading-6 border border-primary rounded-full px-5 py-2 text-primary "
                    >
                      Download CSV
                    </a>
                  </div>
                  <Table show>
                    <Table.TableRow>
                      <Table.Row>Plan</Table.Row>
                      <Table.Row>Type</Table.Row>
                      <Table.Row>Date</Table.Row>
                      <Table.Row>Amount</Table.Row>
                      <Table.Row>Status</Table.Row>
                    </Table.TableRow>

                    <Table.TableItems>
                      {sampleData?.map((item: any, index: number) => (
                        <Table.CellRows
                          useSelectOption={false}
                          key={item?.id + "-" + index}
                        >
                          <Table.Cell>{item.plan}</Table.Cell>
                          <Table.Cell>{item.type}</Table.Cell>
                          <Table.Cell>{item.date}</Table.Cell>
                          <Table.Cell>${item.amount}</Table.Cell>
                          <Table.Cell>
                            <div className="rounded-full px-2 py-1.5 bg-[#E3F4E380] sm:w-1/2 text-center text-[#0EA00E]">
                              {item.status}
                            </div>
                          </Table.Cell>
                        </Table.CellRows>
                      ))}
                    </Table.TableItems>
                  </Table>

                  <TablePagination
                    data={allResumes}
                    page={page}
                    pagination={pagination}
                    setPage={setPage}
                    setPageLimit={setItemsPerPage}
                    pageLimit={itemsPerPage}
                  />
                </>
              ) : (
                <Table.NoData
                  // onAdd={() => }
                  hideButton={true}
                  show={
                    allResumes === undefined ||
                    allResumes === null ||
                    allResumes?.length === 0
                  }
                >
                  No subscription yet
                </Table.NoData>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Subscription;
