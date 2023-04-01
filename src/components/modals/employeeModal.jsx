import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { toast } from "react-toastify";
import { httpApproveEmployer, httpDeleteEmployer } from "../../services/https";

export default function EmployeeModal({ isOpen, closeModal, openModal, item }) {
  const handleApprove = async () => {
    const Response = await httpApproveEmployer(item._id);
    if (Response) {
      toast.success(Response?.data?.message);
    }
  };

  const handleDelete = async () => {
    const Response = await httpDeleteEmployer(item._id);
    if (Response) {
      toast.info(Response?.data?.message);
    }
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
                <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-xl font-medium leading-6 text-gray-900"
                  >
                    Profile
                  </Dialog.Title>
                  <div className="my-4">
                    <EmployerDetails item={item} />
                  </div>
                  {item.verified === true ? (
                    <div className="mt-4 gap-4  flex justify-end">
                      <button
                        onClick={handleDelete}
                        className="p-2   text-sm font-normal text-white rounded-md bg-[#DA3C3F]"
                      >
                        Remove Employer
                      </button>
                    </div>
                  ) : (
                    <div className="mt-4 gap-4  flex justify-end">
                      <button
                        onClick={openModal}
                        className="p-2 w-24   text-sm font-normal text-white rounded-md bg-[#DA3C3F]"
                      >
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
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

const EmployerDetails = ({ item }) => {
  return (
    <div>
      <div className="flex  ">
        <div className="w-1/2 ">
          <div className="text-lg font-medium leading-6 text-gray-800 text-center border-b pb-2 mb-4">
            Employer
          </div>

          <div className="flex items-center gap-4">
            <img
              className="w-28 h-28 rounded-full shadow-md"
              src="https://www.indiewire.com/wp-content/uploads/2022/01/AP21190389554952-e1643225561835.jpg"
            ></img>
            <div>
              <div className="text-sm font-medium leading-6 text-gray-500">
                Name: {item.name}
              </div>
              <div className="text-sm font-medium leading-6 text-gray-500">
                Designation: {item.designation}
              </div>
              <div className="text-sm font-medium leading-6 text-gray-500">
                Email: {item.email}
              </div>
              <div className="text-sm font-medium leading-6 text-gray-500">
                Phone Number: {item.phoneNumber}
              </div>
            </div>
          </div>
        </div>
        <div className="w-1/2 ">
          <div className="text-lg font-medium leading-6 text-gray-800 text-center border-b pb-2 mb-4">
            Company
          </div>

          <div className="flex items-center gap-4">
            <img
              className="w-28 h-28 rounded-full shadow-md"
              src="data:image/png;base64,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"
            ></img>
            <div>
              <div className="text-sm font-medium leading-6 text-gray-500">
                Name: {item.companyName}
              </div>
              <div className="text-sm font-medium leading-6 text-gray-500">
                Address: {item.companyLocation}
              </div>
              <div className="text-sm font-medium leading-6 text-gray-500">
                Email: {item?.companyEmail ?? "N/A"}
              </div>
            </div>
          </div>
          <div className="mt-5">
            <div className="text-sm font-medium leading-6 text-gray-500">
              Description : {item.companyDescription}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
