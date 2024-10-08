import { useFormik } from 'formik';
import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { httpSignup } from '../../services/https';
import TextFieldError from '../../utils/textfieldError/TextFieldError';

export default function SignUp() {
    const navigate = useNavigate();

    const initialValues = {
        email: "",
        password: "",
        role: "2",
        name: "",
        phoneNumber: ""
    };
    const loginValidationSchema = yup.object().shape({
        email: yup.string().required("Email is required"),
        password: yup.string().required("Password is required"),
        name: yup.string().required("Name is required"),
        phoneNumber: yup.string().required("PhoneNumber is required")
    });
    const formik = useFormik({
        initialValues,
        validationSchema: loginValidationSchema,
        enableReinitialize: true,
        validateOnChange: false,
        validateOnBlur: false,
        initialTouched: false,

        onSubmit: async (values, { setSubmitting }) => {
            const Response = await httpSignup(values)
            if (Response.success) {
                toast.success(Response.message)
            }
            else if (!Response.success) {
                toast.error(Response.message)
            }

        },
    });

    return (
        <>
            <div class="bg-gray-200 h-screen overflow-hidden flex items-center justify-center">
                <div class="bg-white lg:w-5/12 md:6/12 w-8/12 shadow-3xl rounded-md">
                    <div class="bg-gradient-to-b from-[#57C5B6] to-[#49bfad] absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full p-4 md:p-8">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="#FFF">
                            <path d="M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.929h19.035l-9.517 7.713-9.518-7.713zm5.694 7.188l3.824 3.099 3.83-3.104 5.612 6.817h-18.779l5.513-6.812zm9.208-1.264l4.616-3.741v9.348l-4.616-5.607z" />
                        </svg>

                    </div>
                    <form class="p-8 md:p-24" onSubmit={formik.handleSubmit}>
                        <div className=''>
                            <div class="flex  items-center text-lg  md:mb-4">

                                <span class="text-[#49bfad] items-center flex">
                                    <svg class=" absolute ml-3 " fill="#49bfad " stroke="currentColor" width="24" viewBox="0 0 24 24">
                                        <path d="M20.822 18.096c-3.439-.794-6.64-1.49-5.09-4.418 4.72-8.912 1.251-13.678-3.732-13.678-5.082 0-8.464 4.949-3.732 13.678 1.597 2.945-1.725 3.641-5.09 4.418-3.073.71-3.188 2.236-3.178 4.904l.004 1h23.99l.004-.969c.012-2.688-.092-4.222-3.176-4.935z" />
                                    </svg>
                                </span>
                                <div className='w-full'>

                                    <input name="email" onChange={formik.handleChange} type="text" id="username" class="bg-gray-200 pl-12 py-2 md:py-4 focus:outline-none w-full" placeholder="Email" />
                                    <TextFieldError error={formik?.errors?.email} />
                                </div>
                            </div>

                        </div>
                        <div className=''>

                            <div class="flex items-center text-lg  md:mb-4">
                                <span class="text-[#49bfad] items-center flex">

                                    <svg class=" absolute ml-3 " fill="#49bfad " stroke="currentColor" width="24" viewBox="0 0 24 24">
                                        <path d="m18.75 9h-.75v-3c0-3.309-2.691-6-6-6s-6 2.691-6 6v3h-.75c-1.24 0-2.25 1.009-2.25 2.25v10.5c0 1.241 1.01 2.25 2.25 2.25h13.5c1.24 0 2.25-1.009 2.25-2.25v-10.5c0-1.241-1.01-2.25-2.25-2.25zm-10.75-3c0-2.206 1.794-4 4-4s4 1.794 4 4v3h-8zm5 10.722v2.278c0 .552-.447 1-1 1s-1-.448-1-1v-2.278c-.595-.347-1-.985-1-1.722 0-1.103.897-2 2-2s2 .897 2 2c0 .737-.405 1.375-1 1.722z" />
                                    </svg>
                                </span>
                                <div className='w-full'>
                                    <input name="password" onChange={formik.handleChange} type="password" id="password" class="bg-gray-200 pl-12 py-2 md:py-4 focus:outline-none w-full" placeholder="Password" />
                                    <TextFieldError error={formik?.errors?.password} />

                                </div>
                            </div>
                        </div>


                        <div className='md:flex gap-4 col mb-5' >
                            <div>

                                <div class="flex items-center text-lg  md:mb-4">
                                    <span class="text-[#49bfad] items-center flex">

                                        <svg class=" absolute ml-3 " fill="#49bfad " stroke="currentColor" width="24" viewBox="0 0 24 24">
                                            <path d="m18.75 9h-.75v-3c0-3.309-2.691-6-6-6s-6 2.691-6 6v3h-.75c-1.24 0-2.25 1.009-2.25 2.25v10.5c0 1.241 1.01 2.25 2.25 2.25h13.5c1.24 0 2.25-1.009 2.25-2.25v-10.5c0-1.241-1.01-2.25-2.25-2.25zm-10.75-3c0-2.206 1.794-4 4-4s4 1.794 4 4v3h-8zm5 10.722v2.278c0 .552-.447 1-1 1s-1-.448-1-1v-2.278c-.595-.347-1-.985-1-1.722 0-1.103.897-2 2-2s2 .897 2 2c0 .737-.405 1.375-1 1.722z" />
                                        </svg>
                                    </span>
                                    <div className=''>
                                        <input name="name" onChange={formik.handleChange} type="text" id="text" class="bg-gray-200 pl-12 py-2 md:py-4 focus:outline-none w-full" placeholder="Full Name" />
                                        <TextFieldError error={formik?.errors?.name} />

                                    </div>
                                </div>
                            </div>
                            <div >
                                <div class="flex items-center text-lg  md:mb-4">
                                    <span class="text-[#49bfad] items-center flex">
                                        <svg class=" absolute ml-3 " fill="#49bfad " stroke="currentColor" width="24" viewBox="0 0 24 24">
                                            <path d="m18.75 9h-.75v-3c0-3.309-2.691-6-6-6s-6 2.691-6 6v3h-.75c-1.24 0-2.25 1.009-2.25 2.25v10.5c0 1.241 1.01 2.25 2.25 2.25h13.5c1.24 0 2.25-1.009 2.25-2.25v-10.5c0-1.241-1.01-2.25-2.25-2.25zm-10.75-3c0-2.206 1.794-4 4-4s4 1.794 4 4v3h-8zm5 10.722v2.278c0 .552-.447 1-1 1s-1-.448-1-1v-2.278c-.595-.347-1-.985-1-1.722 0-1.103.897-2 2-2s2 .897 2 2c0 .737-.405 1.375-1 1.722z" />
                                        </svg>
                                    </span>
                                    <div >
                                        <input name="phoneNumber" onChange={formik.handleChange} type="number" id="text" class="bg-gray-200 pl-12 py-2 md:py-4 focus:outline-none w-full" placeholder="Phone Number" />
                                        <TextFieldError error={formik?.errors?.phoneNumber} />

                                    </div>
                                </div>

                            </div>


                        </div>

                        <div className="text-sm font-bold text-gray-500 my-2">
                            Already have an account?{" "}
                            <span
                                className="text-green-500 cursor-pointer hover:text-blue-600"
                                onClick={() => navigate("/login")}
                            >
                                Login
                            </span>
                        </div>
                        <button type='submit' onSubmit={formik.handleSubmit} onClick={formik.handleSubmit} class="bg-gradient-to-b from-[#57C5B6] to-[#49bfad] font-medium p-2 md:p-4 text-white uppercase w-full">Login</button>
                    </form>
                </div>
            </div>
        </>
    )
}
