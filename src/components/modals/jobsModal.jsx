import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { toast } from "react-toastify";
import { httpApproveJob, httpRemoveJob } from "../../services/https";

export default function JobsModal({ closeModal, openModal, isOpen, item }) {
  console.log(item, "item");
  const handleApprove = async () => {
    const Response = await httpApproveJob(item._id);
    console.log(Response, "response");
    toast.success(Response?.data?.message);
  };

  const handledelete = async () => {
    const Response = await httpRemoveJob(item._id);
    toast.success(Response?.data?.message);
  };

  

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Job Details
                    <p class="mt-1 max-w-2xl text-sm text-gray-500">
                      Job details and employee.
                    </p>
                  </Dialog.Title>
                  <div className="mt-2">
                    <JobDetails item={item} />
                  </div>

                  <div className="mt-4">
                    {item.isApproved === true ? (
                      <div className="mt-4 gap-4  flex justify-end">
                        <button
                          onClick={handledelete}
                          className="p-2   text-sm font-normal text-white rounded-md bg-[#DA3C3F]"
                        >
                          Remove Job
                        </button>
                      </div>
                    ) : (
                      <div className="mt-4 gap-4  flex justify-end">
                        <button className="p-2 w-24   text-sm font-normal text-white rounded-md bg-[#DA3C3F]">
                          Deny
                        </button>
                        <button
                          onClick={handleApprove}
                          className="p-2 w-24  text-sm   font-normal text-white rounded-md bg-[#00C0A3]"
                        >
                          Approve
                        </button>
                      </div>
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

const JobDetails = ({ item }) => {
  return (
    <div class="overflow-hidden bg-white shadow sm:rounded-lg">
      <div class="border-t border-gray-200">
        <dl>
          <div class="bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500">Job name</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              {item.title} ({" "}
              {item.category === 0
                ? "Full-Time"
                : item.category === 1
                ? "Part-Time"
                : "Internship"}{" "}
              )
            </dd>
          </div>
          <div class="bg-white px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500">Posted By</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              {item?.employerID?.name}
            </dd>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500">Email address</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              {item?.contactEmail}
            </dd>
          </div>
          <div class="bg-white px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500">
              Salary expectation
            </dt>
            <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              {item?.salary} / month
            </dd>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500">About</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              {item?.description}
            </dd>
          </div>
          <div class="bg-white px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500">Experience</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              {item?.Experience}
            </dd>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500">Skills Required</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              {item?.skillsRequired}
            </dd>
          </div>
          <div class="bg-white px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500">Qualification</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              {item?.qualifications}
            </dd>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500">Benifits</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              {item?.benifits}
            </dd>
          </div>
          <div class="bg-white px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500">Responsibility</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              {item?.responsibility}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
};
