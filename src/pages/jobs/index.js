import React, { useContext, useEffect, useState } from 'react'
import JobsModal from '../../components/modals/jobsModal';
import { AdminContext } from '../../contexts/adminContext/AdminContext';

export default function Jobs() {
  const [tab, setTab] = useState(0)
  const [allJobs, setAlljobs] = useState([])
  const [approvedJobs, setApprovedJobs] = useState([])
  const [pendingJobs, setPendingJobs] = useState([])
  const { state } = useContext(AdminContext);
  useEffect(() => {
    setApprovedJobs(state?.approvedJobs?.data ?? [])
    setPendingJobs(state?.pendingJobs?.data ?? [])
    setAlljobs(state?.allJobs?.data ?? [])

  }, [state.allJobs, state.approvedJobs, state.pendingJobs])



  return (
    <div>
      <h6 className='text-lg font-bold  text-gray-500'> Admin / Jobs</h6>

      <div className='flex gap-2 mt-6' >
        <button className={`rounded-sm px-3 py-1  bg-[#BDCDD6] hover:bg-[#57C5B6] w-32 text-white`} onClick={() => setTab(0)}>All Jobs</button>
        <button className={`rounded-sm px-3 py-1  bg-[#BDCDD6] hover:bg-[#57C5B6] w-32 text-white`} onClick={() => setTab(1)}>Verified Jobs</button>
        <button className={`rounded-sm px-3 py-1  bg-[#BDCDD6] hover:bg-[#57C5B6] w-32 text-white`} onClick={() => setTab(2)}>Pending</button>
      </div>
      {
        tab === 1 ? (<JobTable jobList={approvedJobs} />) : tab === 2 ? (<JobTable jobList={pendingJobs} />) : (<JobTable jobList={allJobs} />)
      }
    </div>
  )
}


const JobTable = ({ jobList }) => {



  return (
    <div class="overflow-x-auto ">
      <div class="min-w-screen  flex items-center justify-center font-sans overflow-hidden">
        <div class="w-full">
          <div class="bg-white shadow-md rounded my-6">
            <table class="min-w-full w-full table-auto rounded-md">
              <thead>
                <tr class="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                  <th class="py-3 px-6 text-left">Job Title</th>
                  <th class="py-3 px-6 text-left">Posted by</th>
                  <th class="py-3 px-6 text-left">Company Name</th>
                  <th class="py-3 px-6 text-center">Status</th>
                  <th class="py-3 px-6 text-center">Actions</th>
                </tr>
              </thead>


              {jobList &&
                jobList.map((item, index) => {
                  return (
                    <tbody class="text-gray-600 text-sm font-light" key={index}>
                      <TableData item={item} />
                    </tbody>
                  )
                })
              }
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

const TableData = ({ item }) => {
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

console.log(item)
  return (
    <>
      <JobsModal item={item} isOpen={isOpen} closeModal={closeModal} openModal={openModal} />

      <tr class="border-b border-gray-200 hover:bg-gray-100">
        <td class="py-3 px-6 text-left whitespace-nowrap">
          <div class="flex items-center">
            <div class="mr-2">
             <img  className='w-6 h-6 rounded-full' src={item?.jobPhoto}></img>
            </div>
            <span class="font-medium">{item?.title}</span>
          </div>
        </td>
        <td class="py-3 px-6 text-left">
          <div class="flex items-center">
            <div class="mr-2">
              <img class="w-6 h-6 rounded-full" src={item?.employerID?.userPhoto}/>
            </div>
            <span>{item?.employerID?.name}</span>
          </div>
        </td>
        <td class="py-3 px-6 text-left">
          <div class="flex items-center">
            <div class="mr-2">
              <img class="w-6 h-6 rounded-full" src={item?.employerID?.companyPhoto}/>
            </div>
            <span>{item?.employerID?.companyName}</span>
          </div>
        </td>

        <td class="py-3 px-6 text-center">
          <span class="bg-purple-200 text-purple-600 py-1 px-3 rounded-full text-xs">{item?.isApproved === true ? "verified" : "pending"}</span>
        </td>
        <td class="py-3 px-6 text-center">
          <button onClick={openModal} className="p-1 w-20 font-medium text-white rounded-md bg-[#00C0A3]">Review</button>
        </td>
      </tr></>
  )
}