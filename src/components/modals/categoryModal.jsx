import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { toast } from "react-toastify";
import { httpApproveJob, httpRemoveJob } from "../../services/https";
import { FcRight } from "react-icons/fc";
import ImageModal from "./imageModal";
export default function CategoryModal({
  closeModal,
  openModal,
  isOpen,
  item,
  handleApprove,
  handleReject,
  tab,
}) {
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
                  {tab == 0 ? (
                    <div className="mt-4 flex justify-end gap-6">
                      <button
                        onClick={handleReject}
                        className="p-2   text-sm font-normal text-white rounded-md bg-[#DA3C3F]"
                      >
                        Remove Job
                      </button>
                      <button
                        onClick={handleApprove}
                        className="p-2 w-24  text-sm   font-normal text-white rounded-md bg-[#00C0A3]"
                      >
                        Approve
                      </button>
                    </div>
                  ) : (
                    <div className="mt-4 flex justify-end gap-6">
                      <button
                        onClick={closeModal}
                        className="p-2   text-sm font-normal text-white rounded-md bg-[#DA3C3F]"
                      >
                        Close
                      </button>
                    </div>
                  )}
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
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }
  function openModal() {
    setIsOpen(true);
  }

  return (
    <div class="overflow-hidden bg-white shadow sm:rounded-lg">
      <ImageModal item={item} isOpen={isOpen} closeModal={closeModal} />
      <div class="border-t border-gray-200">
        <dl>
          <div class="bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500">Job name</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              {item?.jobID?.title}
            </dd>
          </div>
          <div class="bg-white px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500">Posted By</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              {item?.employerID?.name}
            </dd>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500">Payment Method</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              {item?.paymentMethod}
            </dd>
          </div>
          <div class="bg-white px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500">
              Requested Category
            </dt>
            <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 flex gap-3 items-center">
              {item?.oldCategory} <FcRight /> {item?.newCategory}
            </dd>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500">
              Payment ScreenShot
            </dt>
            <img
              onClick={openModal}
              className="w-24 rounded-md hover:opacity-30 object-contain  transition-all   "
              src={item?.paymentScreenshot}
            ></img>
          </div>
          <div class="bg-white px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500">Payment Method</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              {item?.paymentMethod == 0
                ? "Esewa"
                : item?.paymentMethod == 1
                ? "Phone-Pay"
                : "Mobile Banking"}{" "}
              /<span>Account Number : {item?.accountNumber}</span>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
};
