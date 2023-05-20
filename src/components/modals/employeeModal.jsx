import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { toast } from "react-toastify";
import { httpApproveEmployer, httpDeleteEmployer } from "../../services/https";
import Select from "../commons/Fields/SelectField";
import TextField from "../commons/TextField";
import { TextFieldError } from "../commons/TextField";



export default function EmployeeModal({
  settings,
  isOpen,
  closeModal,
  openModal,
  item,
  formik,
}) {
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
                    {settings === "View" ? (
                      <> {settings} Employer</>
                    ) : settings === "Edit" ? (
                      <> {settings} Employer</>
                    ) : (
                      <>{settings} Employer</>
                    )}
                  </Dialog.Title>
                  <div className="my-4">
                    <EmployerDetails
                      item={item}
                      openModal={openModal}
                      closeModal={closeModal}
                      handleDelete={handleDelete}
                      handleApprove={handleApprove}
                      settings={settings}
                      formik={formik}
                    />
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

const EmployerDetails = ({
  item,
  openModal,
  handleDelete,
  handleApprove,
  settings,
  formik,
}) => {
  if (settings === "Edit") {
    return (
      <form onSubmit={formik.handleSubmit} className="w-full">
        <div className="w-full flex  gap-2 py-4">
          <input
            className="w-1/2"
            type={"file"}
            name={"userPhoto"}
            onChange={async (event) => {
              formik.setFieldValue(
                "userPhoto",
                await convertBase64(event.target.files[0])
              );
            }}
          ></input>
          <input
            className="w-1/2"
            type={"file"}
            name={"companyPhoto"}
            onChange={async (event) => {
              formik.setFieldValue(
                "companyPhoto",
                await convertBase64(event.target.files[0])
              );
            }}
          ></input>
        </div>

        <div className="lg:flex gap-4 w-full">
          <div className="mb-6 w-1/2">
            <TextField
              label="Name"
              name="name"
              placeholder="Name"
              value={formik.values.name}
              onChange={formik.handleChange}
            />
            <TextFieldError error={formik?.errors?.name} />
          </div>
          <div className="mb-6 w-1/2">
            <TextField
              type="email"
              label="Email"
              name="email"
              placeholder="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
            />
            <TextFieldError error={formik?.errors?.email} />
          </div>
        </div>
        <div className="lg:flex gap-4 w-full">
          <div className="mb-6 w-1/2">
            <TextField
              label="Company Name"
              name="companyName"
              placeholder="companyName"
              value={formik.values.companyName}
              onChange={formik.handleChange}
            />
            <TextFieldError error={formik?.errors?.companyName} />
          </div>
          <div className="mb-6  w-1/2">
            <TextField
              label="Company Website"
              name="website"
              placeholder="CompanyWebsite"
              value={formik.values.website}
              onChange={formik.handleChange}
            />
            <TextFieldError error={formik?.errors?.website} />
          </div>
        </div>
        <div className="flex gap-4 w-full">
          <div className="mb-6 w-1/2">
            <TextField
              label="Company Location"
              name="companyLocation"
              placeholder="CompanyLocation"
              value={formik.values.companyLocation}
              onChange={formik.handleChange}
            />
            <TextFieldError error={formik?.errors?.companyLocation} />
          </div>
          <div className="mb-6 w-1/2">
            <TextField
              label="Contact Number"
              name="phoneNumber"
              placeholder="ContactNumber"
              value={formik.values.phoneNumber}
              onChange={formik.handleChange}
            />
            <TextFieldError error={formik?.errors?.phoneNumber} />
          </div>
        </div>
        <div className="flex gap-4 w-full">
          <div className="mb-6 w-1/2">
            <TextField
              label="Designation"
              name="companyLocation"
              placeholder="Designation"
              // value={formik.values.companyLocation}
              // onChange={formik.handleChange}
            />
            <TextFieldError error={formik?.errors?.companyLocation} />
          </div>
          <div className="mb-6 w-1/2">
            <Select
              label="Verified"
              onChange={formik.handleChange}
              name="verified"
              options={
                (item = [
                  { name: "Verified", id: true },
                  { name: "NotVerified", id: false },
                ])
              }
            />
            <TextFieldError error={formik?.errors?.phoneNumber} />
          </div>
        </div>
        <div className="mb-6 w-full">
          <TextField
            label="Company Description"
            name="companyDescription"
            placeholder="CompanyDescription"
            value={formik.values.companyDescription}
            onChange={formik.handleChange}
          />
          <TextFieldError error={formik?.errors?.companyDescription} />
        </div>
        <button
          onClick={formik.handlSubmit}
          className="p-2 w-24  text-sm   font-normal text-white rounded-md bg-[#00C0A3]"
        >
          Update
        </button>
      </form>
    );
  }
  return (
    <>
      <div>
        <div className="flex  ">
          <div className="w-1/2 ">
            <div className="text-lg font-medium leading-6 text-gray-800 text-center border-b pb-2 mb-4">
              Employer
            </div>

            <div className="flex items-center gap-4">
              <img
                className="w-28 h-28 rounded-full shadow-md"
                src={item?.userPhoto}
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
                src={item?.companyPhoto}
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
      </div>
    </>
  );
};
export const convertBase64 = (file) => {
  return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => { resolve(fileReader.result); };
      fileReader.onerror = (error) => { reject(error); };
  });
};
