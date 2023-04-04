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
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                width="24" height="24"
                viewBox="0 0 48 48"
                style={{ fill: "#000000" }}>
                <path fill="#80deea" d="M24,34C11.1,34,1,29.6,1,24c0-5.6,10.1-10,23-10c12.9,0,23,4.4,23,10C47,29.6,36.9,34,24,34z M24,16	c-12.6,0-21,4.1-21,8c0,3.9,8.4,8,21,8s21-4.1,21-8C45,20.1,36.6,16,24,16z"></path><path fill="#80deea" d="M15.1,44.6c-1,0-1.8-0.2-2.6-0.7C7.6,41.1,8.9,30.2,15.3,19l0,0c3-5.2,6.7-9.6,10.3-12.4c3.9-3,7.4-3.9,9.8-2.5	c2.5,1.4,3.4,4.9,2.8,9.8c-0.6,4.6-2.6,10-5.6,15.2c-3,5.2-6.7,9.6-10.3,12.4C19.7,43.5,17.2,44.6,15.1,44.6z M32.9,5.4	c-1.6,0-3.7,0.9-6,2.7c-3.4,2.7-6.9,6.9-9.8,11.9l0,0c-6.3,10.9-6.9,20.3-3.6,22.2c1.7,1,4.5,0.1,7.6-2.3c3.4-2.7,6.9-6.9,9.8-11.9	c2.9-5,4.8-10.1,5.4-14.4c0.5-4-0.1-6.8-1.8-7.8C34,5.6,33.5,5.4,32.9,5.4z"></path><path fill="#80deea" d="M33,44.6c-5,0-12.2-6.1-17.6-15.6C8.9,17.8,7.6,6.9,12.5,4.1l0,0C17.4,1.3,26.2,7.8,32.7,19	c3,5.2,5,10.6,5.6,15.2c0.7,4.9-0.3,8.3-2.8,9.8C34.7,44.4,33.9,44.6,33,44.6z M13.5,5.8c-3.3,1.9-2.7,11.3,3.6,22.2	c6.3,10.9,14.1,16.1,17.4,14.2c1.7-1,2.3-3.8,1.8-7.8c-0.6-4.3-2.5-9.4-5.4-14.4C24.6,9.1,16.8,3.9,13.5,5.8L13.5,5.8z"></path><circle cx="24" cy="24" r="4" fill="#80deea"></circle>
              </svg>
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