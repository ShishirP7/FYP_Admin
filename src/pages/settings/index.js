import { useFormik } from 'formik';
import React from 'react'
import { toast } from 'react-toastify';
import * as yup from "yup";
import { TextFieldError } from '../../components/commons/TextField';
import { httpEmpchangepw } from '../../services/https';
import Cookies from "universal-cookie";
import { useState } from 'react';
import jwtDecode from 'jwt-decode';



export default function Settings() {


  const cookie = new Cookies();
  const cookieData = cookie.get("isLoggedin");



  const decodedToken = jwtDecode(cookieData);
  console.log(decodedToken, "decoded")


  const initialValues = {
    id: decodedToken?.id,
    password: "",
    newpassword: "",
    confirmpassword: "",
  };

  const changePasswordValidation = yup.object().shape({
    password: yup.string().required("This field is required"),
    newpassword: yup
      .string()
      .required("This field is required.")
      .min(8, "Password must be at least 8 characters long.")
      .max(50, "Password must be no more than 50 characters long.")
    ,
    confirmpassword: yup
      .string()
      .required("This field is required.")
      .oneOf([yup.ref("newpassword"), null], "Passwords must match")
      .min(8, "Password must be at least 8 characters long.")
      .max(50, "Password must be no more than 50 characters long.")
    ,
  });


  const formik = useFormik({
    initialValues,
    validationSchema: changePasswordValidation,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
    initialTouched: false,
    onSubmit: async (values, { setSubmitting }) => {
      try {

        const Response = await httpEmpchangepw(values)
        console.log(Response)
        if (Response?.data?.success) {
          toast.success("Password Updated")
          formik.resetForm()
        } else {
          toast.error(Response.data.message)
          formik.resetForm()
        }
      } catch (error) {
        console.log(error)
        formik.resetForm()
      }
    },
  });
  console.log(formik, "formik")
  return (
    <div className='md:flex justify-center relative'>
      <div className='md:w-1/2 bg-white p-8 rounded-md shadow-md '>
        <h3 className='font-semibold text-lg flex justify-between items-center'><div>Change Password</div ></h3>
        <form onSubmit={formik.handleSubmit}>
          <div className="relative mt-5">
            <input
              className="appearance-none border  border-2 pl-3 lg:border-slate-300 hover:lg:border-[#00C0A3] focus:lg:border-[#00C0A3] shadow-sm focus:shadow-md focus:placeholder-gray-600  transition  rounded-md w-full py-3 text-gray-600 leading-tight focus:outline-none focus:ring-gray-600 focus:shadow-outline"
              id="password"
              // type="password"
              value={formik.values.password}
              placeholder="Old Password"
              name={"password"}
              onChange={formik.handleChange}
            />
            <TextFieldError error={formik?.errors?.password} />

          </div>

          <div className="relative mt-5">
            <input
              className="appearance-none border  border-2  pl-3 lg:border-slate-300 hover:lg:border-[#00C0A3] focus:lg:border-[#00C0A3] shadow-sm focus:shadow-md focus:placeholder-gray-600  transition  rounded-md w-full py-3 text-gray-600 leading-tight focus:outline-none focus:ring-gray-600 focus:shadow-outline"
              id="password"
              // type="password"
              placeholder="New Password"
              name={"newpassword"}
              value={formik.values.newpassword}

              onChange={formik.handleChange}

            />
            <TextFieldError error={formik?.errors?.password} />

          </div>
          <div className="relative mt-5">
            <input
              className="appearance-none border  border-2 pl-3 lg:border-slate-300 hover:lg:border-[#00C0A3] focus:lg:border-[#00C0A3] shadow-sm focus:shadow-md focus:placeholder-gray-600  transition  rounded-md w-full py-3 text-gray-600 leading-tight focus:outline-none focus:ring-gray-600 focus:shadow-outline"
              id="confirmPassword"
              // type="password"
              placeholder="Confirm Password"
              name={"confirmpassword"}
              value={formik.values.confirmpassword}
              onChange={formik.handleChange}

            />
            <TextFieldError error={formik?.errors?.confirmpassword} />

          </div>


          <div></div>
          <div className="flex items-center justify-center  my-5 ">
            <button
              className="w-full text-white py-2 px-4 uppercase  rounded bg-[#00C0A3] hover:bg-indigo-600 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
            >
              Change password
            </button>
          </div>
       
        </form>
      </div>
    </div>

  )
}
