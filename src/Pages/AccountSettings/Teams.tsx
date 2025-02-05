// import { Icons } from "../../components/icons";
// import Popover from "../../components/Popover";
// import { IoMdInformationCircleOutline } from "react-icons/io";
// import paginate from "../../lib/utils/paginate";
// import Notification from "../../components/Notification";
// import { toast } from "react-toastify";
// import { useQuery } from "@tanstack/react-query";
// import { Link } from "react-router-dom";
// import { useState } from "react";
// import { TableLoader } from "../../components/Loader";
// import Table from "../../components/table";
// import TablePagination from "../../components/table/TablePagination";
// import Dropdown from "../../components/Dropdown2";
// import AlertDialog from "../../components/modal/AlertDialog";

// const sampleData = [
//   {
//     id: 1,
//     job: {
//       companyName: "Henry Peters",
//       email: "hellog@gmail.com",
//     },
//     AddedDate: "12/05/2024",
//     lastAccessDate: "12/05/2024",
//     lastAccessTime: "12:24 PM",
//   },
//   {
//     id: 2,
//     job: {
//       companyName: "John Doe",
//       email: "hellog@gmail.com",
//     },
//     AddedDate: "12/05/2024",
//     lastAccessDate: "12/05/2024",
//     lastAccessTime: "12:24 PM",
//   },
// ];

// const Teams = () => {
//   const [allResumes, setAllResumes] = useState<any>([]);
//   const [_selectedResume, setSelectedResume] = useState<any>(null);
//   const [search, setSearch] = useState<string>("");
//   const [page, setPage] = useState(1);
//   const [itemsPerPage, setItemsPerPage] = useState(10);
//   const [selectAll, setSelectAll] = useState(false);
//   const [selectedItems, setSelectedItems] = useState<number[]>([]);
//   const [deleteAlert, setDeleteAlert] = useState(false);
//   const [addTeamAlert, setAddTeamAlert] = useState(false);

//   const handleDelete = (id: string | string[]) => {
//     if (Array.isArray(id)) {
//       // Logic to delete multiple items
//       id.forEach((itemId) => {
//         console.log(`Deleting item with id: ${itemId}`);
//         // Add your delete logic here
//       });
//     } else {
//       // Logic to delete a single item
//       console.log(`Deleting item with id: ${id}`);
//       // Add your delete logic here
//     }

//     setDeleteAlert(false);
//   };

//   const { data, isFetching } = useQuery(
//     ["ALL CLASSROOMS", search, page, itemsPerPage],
//     () => {},
//     {
//       keepPreviousData: true,
//       refetchOnWindowFocus: false,
//       enabled: false,
//       onSuccess: (data: any) => {
//         setAllResumes(data?.resumes);
//       },
//       onError: (err: any) => {
//         toast(
//           <Notification variant="error" title="Request Failed!">
//             {err.message}
//           </Notification>,
//           {
//             type: "error",
//             hideProgressBar: true,
//             toastId: Date.now() + "@USER_FILTER_ERROR",
//           }
//         );
//       },
//     }
//   );

//   const pagination = paginate(
//     data?.meta.total_no_items,
//     Number(page),
//     Number(itemsPerPage)
//   );

//   const handleSelectAll = () => {
//     if (selectAll) {
//       setSelectedItems([]);
//     } else {
//       setSelectedItems(sampleData.map((item) => item.id));
//     }
//     setSelectAll(!selectAll);
//   };

//   const handleCheckboxClick = (id: number) => {
//     if (selectedItems.includes(id)) {
//       setSelectedItems(selectedItems.filter((itemId) => itemId !== id));
//     } else {
//       setSelectedItems([...selectedItems, id]);
//     }
//   };

//   return (
//     <section>
//       <div className="py-6 px-4 md:px-6">
//         <div className="mb-5">
//           <div className="flex gap-2 items-center pt-4">
//             <h1 className="text-xl lg:text-2xl font-semibold dark:text-slate-200">
//               Team Management
//             </h1>
//             <div className="mt-2">
//               <Popover
//                 icon={<IoMdInformationCircleOutline size={24} className="" />}
//                 title="Job Hub"
//                 position="bottom"
//                 onClick={() => {}}
//               >
//                 Lorem ipsum dolor sit amet
//               </Popover>
//             </div>
//           </div>
//           <p className="text-sm font-semibold">
//             This Feature is only for a Subscribed Recruiter who wants to add a
//             team member for easy work flow
//           </p>
//         </div>
//         <section className="sm:block py-8">
//           <div className="flex xl:gap-5 gap-3 items-center relative mb-3 flex-wrap ">
//             <div className="mt-2 flex gap-5 items-center">
//               <div className="relative">
//                 <button className="absolute top-1/2 left-0 -translate-y-1/2 pl-3">
//                   <Icons.search />
//                 </button>

//                 <input
//                   type="text"
//                   placeholder="Search Persona"
//                   value={search}
//                   onChange={(e) => setSearch(e.target.value)}
//                   className="w-full lg:w-80 border  border-stroke py-2.5 rounded-full bg-white text-sm pr-3 pl-8 focus:outline-none focus:border-1 focus:border-primary"
//                 />
//               </div>
//               <div className="relative">
//                 <button className="absolute top-1/2 left-0 -translate-y-1/2 pl-3">
//                   <Icons.filter />
//                 </button>

//                 <input
//                   type="text"
//                   placeholder="Filter By"
//                   value={search}
//                   onChange={(e) => setSearch(e.target.value)}
//                   className="w-full lg:w-80 border  border-stroke py-2.5 rounded-full bg-white text-sm pr-3 pl-8 focus:outline-none focus:border-1 focus:border-primary"
//                 />
//               </div>
//               <div className="">
//                 <Link
//                   to="/app/settings/teams/activity-report"
//                   className="underline text-primary"
//                 >
//                   Activities Report
//                 </Link>
//               </div>
//             </div>

//             <div className="ml-auto">
//               {selectedItems.length >= 1 ? (
//                 <button
//                   className="rounded-full text-indigo-600 px-3.5 w-[160px] text-center py-2.5 text-sm font-semibold border border-primary shadow-sm flex items-center justify-center gap-2"
//                   onClick={() => setDeleteAlert(true)}
//                 >
//                   Delete User
//                 </button>
//               ) : (
//                 <button
//                   className="rounded-full bg-indigo-600 px-3.5 w-[160px] text-center py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 flex items-center gap-2 justify-center"
//                   onClick={() => setAddTeamAlert(true)}
//                 >
//                   <Icons.add /> Add Team
//                 </button>
//               )}
//             </div>
//           </div>

//           <div className="mt-10">
//             {isFetching ? (
//               <TableLoader />
//             ) : allResumes?.length === 0 ? (
//               <>
//                 <Table show>
//                   <Table.TableRow>
//                     <Table.Row>
//                       <label htmlFor="selectAll" className="">
//                         <input
//                           type="checkbox"
//                           id="selectAll"
//                           checked={selectAll}
//                           onChange={handleSelectAll}
//                           className="border-primary border h-5 w-5"
//                         />
//                       </label>
//                     </Table.Row>
//                     <Table.Row>Name</Table.Row>
//                     <Table.Row>Date</Table.Row>
//                     <Table.Row>Actions</Table.Row>
//                   </Table.TableRow>

//                   <Table.TableItems>
//                     {sampleData?.map((item: any, index: number) => (
//                       <Table.CellRows
//                         useSelectOption={false}
//                         onClick={() => setSelectedResume(item)}
//                         key={item?.id + "-" + index}
//                       >
//                         <Table.Cell isAction>
//                           <label htmlFor={`${item.id}`} className="">
//                             <input
//                               type="checkbox"
//                               id={`cbx-${item.id}`}
//                               checked={selectedItems.includes(item.id)}
//                               onChange={() => handleCheckboxClick(item.id)}
//                               className="h-5 w-5"
//                             />
//                           </label>
//                         </Table.Cell>

//                         <Table.Cell>
//                           <div className=" text-black text-sm">
//                             <p className="font-semibold">
//                               {item?.job?.companyName}
//                             </p>

//                             <p className="text-xs">{item?.job?.email}</p>
//                           </div>
//                         </Table.Cell>
//                         <Table.Cell>
//                           <p className="text-sm text-black font-semibold">
//                             Added: {item.AddedDate}
//                           </p>
//                           <p className="text-xs">
//                             Last Access: {item.lastAccessDate} <span>|</span>{" "}
//                             {item.lastAccessTime}
//                           </p>
//                         </Table.Cell>
//                         <Table.Cell>
//                           <Dropdown
//                             icon={<Icons.elipsis className="text-black" />}
//                             bg={false}
//                           >
//                             <div className="flex flex-col py-2 text-start px-4">
//                               <p className="text-xs hover:bg-[#f1ebf7] p-2 rounded-md cursor-pointer">
//                                 Edit Tag
//                               </p>
//                             </div>
//                           </Dropdown>
//                         </Table.Cell>
//                       </Table.CellRows>
//                     ))}
//                   </Table.TableItems>
//                 </Table>

//                 <TablePagination
//                   data={allResumes}
//                   page={page}
//                   pagination={pagination}
//                   setPage={setPage}
//                   setPageLimit={setItemsPerPage}
//                   pageLimit={itemsPerPage}
//                 />
//               </>
//             ) : (
//               <Table.NoData
//                 // onAdd={() => navigate(`/app/tutors/courses/courseupload`)}
//                 hideButton={true}
//                 show={
//                   allResumes === undefined ||
//                   allResumes === null ||
//                   allResumes?.length === 0
//                 }
//               >
//                 No Class found. Create one now by clicking on the Create Class
//                 button.
//               </Table.NoData>
//             )}
//           </div>
//         </section>
//       </div>

//       {deleteAlert && (
//         <AlertDialog
//           show={deleteAlert}
//           onHide={() => setDeleteAlert(false)}
//           title=""
//         >
//           <h3 className="text-base mb-3">Delete User</h3>
//           <p className="text-xs mb-5">
//             Are you sure you want to remove this user?
//           </p>
//           <div className="flex gap-5 justify-center items-center flex-col mt-10">
//             <button className="border-red-500 border text-red-500 text-sm px-5 rounded-full py-1 font-normal w-[60%]">
//               Yes, Delete
//             </button>
//             <button className="border-[#D4D4D4] border text-[#928f8f] text-sm px-5 rounded-full py-1 font-normal w-[60%]">
//               No, Cancel
//             </button>
//           </div>
//         </AlertDialog>
//       )}

//       {addTeamAlert && (
//         <AlertDialog
//           show={addTeamAlert}
//           onHide={() => setAddTeamAlert(false)}
//           title=""
//         >
//           <h3 className="text-base mb-3">Add Team</h3>
//           <p className="text-xs mb-5 text-[#5B5B5B]">
//             Invite users to join your team
//           </p>{" "}
//           <form className="mt-10">
//             <div className="col-span-full text-start">
//               <label
//                 htmlFor="email"
//                 className="block text-sm font-medium leading-6"
//               >
//                 Email Address
//               </label>
//               <div className="mt-2">
//                 <input
//                   id="email"
//                   name="email"
//                   type="email"
//                   placeholder="invite by email address"
//                   className="block w-full rounded-md border border-[#D4D4D4] px-2 py-1.5 sm:text-sm sm:leading-6 font-normal"
//                 />
//               </div>
//             </div>
//           </form>
//           <div className="flex gap-5 justify-center items-center flex-col mt-10">
//             <button className="bg-primary text-white text-sm px-5 rounded-full py-1 font-normal w-[60%]">
//               Add and invite
//             </button>
//           </div>
//         </AlertDialog>
//       )}
//     </section>
//   );
// };

// export default Teams;
