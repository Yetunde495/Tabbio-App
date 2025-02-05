import DefaultLayout from "../../layout/DefaultLayout";
import { Icons } from "../../components/icons";
import paginate from "../../lib/utils/paginate";
import Notification from "../../components/Notification";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { useState } from "react";
import { TableLoader } from "../../components/Loader";
import Table from "../../components/table";
import TablePagination from "../../components/table/TablePagination";

const sampleData = [
  {
    id: 1,
    job: {
      companyName: "Henry Peters",
      email: "hellog@gmail.com",
    },
    desc: "Lorem ipsum dolor sit amet consectetur. Neque dui duis volutpat lobortis sed. Morbi sed eget aliquam nec vitae tristique fames quis amet. Ultricies eleifend mattis aenean amet eget. Platea non nam nunc congue et. Pharetra consequat tincidunt.",
    lastAccessDate: "12/05/2024",
    lastAccessTime: "12:24 PM",
  },
  {
    id: 2,
    job: {
      companyName: "John Doe",
      email: "hellog@gmail.com",
    },
    desc: "Lorem ipsum dolor sit amet",
    lastAccessDate: "12/05/2024",
    lastAccessTime: "12:24 PM",
  },
];

const pages = [{ name: "Activity Report", href: "#", current: true }];

const ActivityReport = () => {
  const [allResumes, setAllResumes] = useState<any>([]);
  const [_selectedResume, setSelectedResume] = useState<any>(null);
  const [search, setSearch] = useState<string>("");
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
    <DefaultLayout>
      <div className="py-6 px-4 md:px-6">
        <section className="sm:block py-8">
          <nav aria-label="Breadcrumb" className="flex">
            <ol role="list" className="flex items-center space-x-4">
              <li>
                <div>
                  <a href="/app/settings" className=" hover:underline">
                    <span className="text-[#5B5B5B] hover:text-black">
                      Team Management
                    </span>
                  </a>
                </div>
              </li>
              {pages.map((page) => (
                <li key={page.name}>
                  <div className="flex items-center">
                    <Icons.ChevronRight
                      aria-hidden="true"
                      className="h-5 w-5 flex-shrink-0 text-gray-400"
                    />
                    <a
                      href={page.href}
                      aria-current={page.current ? "page" : undefined}
                      className={`ml-4 text-sm font-medium text-gray-500 hover:text-gray-700 ${
                        page.current ? "cursor-text " : ""
                      }`}
                    >
                      {page.name}
                    </a>
                  </div>
                </li>
              ))}
            </ol>
          </nav>
          <div className="flex xl:gap-5 gap-3 items-center relative mb-3 flex-wrap mt-10">
            <div className="mt-2 flex gap-5 items-center">
              <div className="relative">
                <button className="absolute top-1/2 left-0 -translate-y-1/2 pl-3">
                  <Icons.search />
                </button>

                <input
                  type="text"
                  placeholder="Search Persona"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full lg:w-80 border  border-stroke py-2.5 rounded-full bg-white text-sm pr-3 pl-8 focus:outline-none focus:border-1 focus:border-primary"
                />
              </div>
              <div className="relative">
                <button className="absolute top-1/2 left-0 -translate-y-1/2 pl-3">
                  <Icons.filter />
                </button>

                <input
                  type="text"
                  placeholder="Filter By"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full lg:w-80 border  border-stroke py-2.5 rounded-full bg-white text-sm pr-3 pl-8 focus:outline-none focus:border-1 focus:border-primary"
                />
              </div>
            </div>

            <div className="ml-auto">
              <button className="rounded-full bg-indigo-600 px-3.5 w-[160px] text-center py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 flex items-center gap-2 justify-center">
                Download CSV
              </button>
            </div>
          </div>

          <div className="mt-10">
            {isFetching ? (
              <TableLoader />
            ) : allResumes?.length === 0 ? (
              <>
                <Table show>
                  <Table.TableRow>
                    <Table.Row>Timestamp</Table.Row>
                    <Table.Row>User</Table.Row>
                    <Table.Row>Activity</Table.Row>
                  </Table.TableRow>

                  <Table.TableItems>
                    {sampleData?.map((item: any, index: number) => (
                      <Table.CellRows
                        useSelectOption={false}
                        onClick={() => setSelectedResume(item)}
                        key={item?.id + "-" + index}
                      >
                        <Table.Cell>
                          <p>
                            Last Access: {item.lastAccessDate} <span>|</span>{" "}
                            {item.lastAccessTime}
                          </p>
                        </Table.Cell>
                        <Table.Cell>
                          <div className=" text-black text-sm">
                            <p className="font-semibold">
                              {item?.job?.companyName}
                            </p>
                            <p className="text-xs">{item?.job?.email}</p>
                          </div>
                        </Table.Cell>
                        <Table.Cell>{item.desc}</Table.Cell>
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
                // onAdd={() => navigate(`/app/tutors/courses/courseupload`)}
                hideButton={true}
                show={
                  allResumes === undefined ||
                  allResumes === null ||
                  allResumes?.length === 0
                }
              >
                No Class found. Create one now by clicking on the Create Class
                button.
              </Table.NoData>
            )}
          </div>
        </section>
      </div>
    </DefaultLayout>
  );
};

export default ActivityReport;
