export const ButtonPrimary = ({ title, type, onClick }) => {
  return (
    <button
      onClick={onClick}
      type={type ?? "button"}
      className="bg-[#00C0A3] h-10 w-32 uppercase text-white hover:text-[#00C0A3] hover:border-2 w-36  hover:border-[#00C0A3]       font-medium hover:bg-white px-5 py-2  shadow  hover:shadow-lg rounded-md  transition transform hover:-translate-y-0.5"
    >
      {title}
    </button>
  );
};
export const ButtonWarning = ({ title, type, onClick }) => {
  return (
    <button
      onClick={onClick}
      type={type ?? "button"}
      className="bg-[#DA3C3F]  h-10 w-32 uppercase text-white hover:text-[#00C0A3] hover:border-2 w-36  hover:border-[#00C0A3]       font-medium hover:bg-white px-5 py-2  shadow  hover:shadow-lg rounded-md  transition transform hover:-translate-y-0.5"
    >
      {title}
    </button>
  );
};

export const ButtonSecondary = ({ title, type, onClick }) => {
  return (
    <button
      onClick={onClick}
      type={type ?? "button"}
      className="  py-2 px-4 uppercase h-10 rounded border border-2 border-[#00C0A3] text-[#00C0A3] w-36    hover:bg-[#00C0A3] hover:text-white shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
    >
      {title}
    </button>
  );
};

export const VerifiedButton = () => {
  return (
    <button className="bg-[#00C0A3] text-xs p-1  uppercase text-white      rounded-sm     font-medium  shadow  transition transform ">
      Verified
    </button>
  );
};
export const NotVerifiedButton = ({}) => {
  return (
    <button className="bg-[#DA3C3F] text-xs p-1  uppercase text-white     font-medium  px-1   shadow rounded-sm transition transform">
      Not Verified
    </button>
  );
};

export const AddButtons = ({ title, openModal }) => {
  return (
    <button
      onClick={openModal}
      className="bg-[#00C0A3]  uppercase text-white hover:text-[#00C0A3]  w-36  hover:border-[#00C0A3]  text-xs     font-medium hover:bg-white px-5 py-2  shadow  hover:shadow-lg rounded-md  transition transform h"
    >
      {title}
    </button>
  );
};
