import React, { useContext, useEffect, useState } from 'react'
import Modal from '../../components/modals/employeeModal';
import { AdminContext } from '../../contexts/adminContext/AdminContext';
import { RiEyeFill, RiSettings2Fill } from 'react-icons/ri'
import { GrFormAdd } from 'react-icons/gr'
import { useFormik } from 'formik';
import { httpupdateProfile } from '../../services/https';
import * as yup from "yup";
import { toast } from 'react-toastify';
import { ButtonPrimary } from '../../components/commons/buttons';

export default function Employers() {
  const { state } = useContext(AdminContext);
  const [tab, setTab] = useState(0)
  const [employers, setEmployers] = useState([])
  const [verifiedData, setverifiedData] = useState([])
  const [nonverifiedData, setNonverifiedData] = useState([])
  useEffect(() => {
    setEmployers(state.allEmployers?.data)
    setverifiedData(state.verifiedEmployers?.data)
    setNonverifiedData(state.nonVerifiedEmployers?.data)
  }, [state.allEmployers, state.nonVerifiedEmployers, state.verifiedEmployers])

  return (
    <div>
      <h6 className='text-lg font-bold  text-gray-500'> Admin / Employers</h6>
      <div className='my-6 md:flex  justify-between'>
        <div className='flex gap-2'>
          <button className={`rounded-sm px-3 py-1  bg-[#BDCDD6] hover:bg-[#57C5B6] w-32 text-white`} onClick={() => setTab(0)}>All Employers</button>
          <button className={`rounded-sm px-3 py-1  bg-[#BDCDD6] hover:bg-[#57C5B6] w-32 text-white`} onClick={() => setTab(1)}>Verified</button>
          <button className={`rounded-sm px-3 py-1  bg-[#BDCDD6] hover:bg-[#57C5B6] w-32 text-white`} onClick={() => setTab(2)}>Pending</button>
        </div>
        {/* <button
          className="bg-[#00C0A3] h-10 w-32 uppercase text-white  hover:text-[#00C0A3] hover:border-2 w-36  hover:border-[#00C0A3]      text-xs font-medium hover:bg-white px-5 py-2  shadow  hover:shadow-lg rounded-md  transition transform hover:-translate-y-0.5"
        >
          Add Employer
        </button> */}
      </div>
      {
        tab === 1 ? (<EmployerTable employerList={verifiedData ?? []} />) : tab === 2 ? (<EmployerTable employerList={nonverifiedData ?? []} />) : (<EmployerTable employerList={employers ?? []} />)
      }
    </div>
  )
}

const EmployerTable = ({ employerList }) => {
  return (
    <div class="overflow-x-auto ">
      <div class="min-w-screen  flex items-center justify-center font-sans overflow-hidden">
        <div class="w-full">
          <div class="bg-white shadow-md rounded">
            <table class="min-w-full w-full table-auto rounded-md">
              <thead>
                <tr class="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                  <th class="py-3 px-6 text-left">Employer Name</th>
                  <th class="py-3 px-6 text-left">Company</th>
                  <th class="py-3 px-6 text-center">Status</th>
                  <th class="py-3 px-6 text-center">Actions</th>
                </tr>
              </thead>


              {employerList && employerList.map((item, index) => {
                return (
                  <tbody class="text-gray-600 text-sm font-light" key={item._id}>
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
  const [settings, setSettings] = useState("")

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }


  const initialValues = {
    name: item?.name,
    companyLocation: item?.companyLocation,
    companyDescription: item?.companyDescription,
    companyName: item?.companyName,
    email: item?.email,
    phoneNumber: item?.phoneNumber,
    website: item?.website,
    userPhoto: item?.userPhoto ?? "",
    companyPhoto: item?.companyPhoto ?? "",
    verified: item?.verified
  };

  const editProfileValidationSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    companyLocation: yup.string().required("address is required"),
    companyDescription: yup.string().required("companyDescription is Required"),
    companyName: yup.string().required("companyName is Required"),
    email: yup.string().required("email is Required"),
    phoneNumber: yup.string().required("phoneNumber is Required"),
    website: yup.string().required("website is Required"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema: editProfileValidationSchema,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
    initialTouched: false,
    onSubmit: async (values, { setSubmitting }) => {
      const Data = { ...values, id: item?._id, role: item?.role };

      const Response = await httpupdateProfile(Data)
      if (Response?.data?.success === true) {
        toast.success("Success")
        closeModal()
      } else {
        toast.error(Response.data.message)
        closeModal()
      }


    },
  });

  return (
    <>
      <Modal formik={formik} settings={settings} item={item} isOpen={isOpen} closeModal={closeModal} openModal={openModal} />

      <tr class="border-b border-gray-200 hover:bg-gray-100">
        <td class="py-3 px-6 text-left whitespace-nowrap">
          <div class="flex items-center">
            <div class="mr-2">
              <img className='w-10 h-10 rounded-full' src={item?.userPhoto}></img>
            </div>
            <span class="font-medium">{item.name}</span>
          </div>
        </td>
        <td class="py-3 px-6 text-left">
          <div class="flex items-center">
            <div class="mr-2">
              <img className='w-10 h-10 rounded-full' src={item?.companyPhoto}></img>

            </div>
            <span>{item.companyName ?? "N/A"}</span>
          </div>
        </td>

        <td class="py-3 px-6 text-center">
          <span class="bg-purple-200 text-purple-600 py-1 px-3 rounded-full text-xs">{item.verified === true ? "verified" : "Pending"}</span>
        </td>
        <td class="py-3 px-6 text-center flex gap-4 justify-center">
          <button onClick={(e) => openModal(setSettings("Edit"))} className='p-1  flex items-center justify-center gap-2 font-medium text-white rounded-md  bg-[#00C0A3]'><RiSettings2Fill size={14} /></button>
          <button onClick={(e) => openModal(setSettings("View"))} className="p-1  font-medium text-white rounded-md bg-blue-700"><RiEyeFill size={14} /></button>
        </td>
      </tr>
    </>
  )
}


