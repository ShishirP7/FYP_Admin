import PropTypes from "prop-types";

export default function TextField(props) {
  let value =
    props.type === "date"
      ? props.value && props.value.includes("T")
        ? props.value.split("T")[0]
        : props.value
      : props.value;

  return (
    <div className="w-full">
      <div className="relative z-0">
        {props.type === "file" ? (
          <>
            <input
              type="file"
              id="file"
              onChange={props.onChange}
              name={props.name}
              className="sr-only  outline-none"
            />
            <label
              for="file"
              className="flex  flex-col items-center justify-center w-full h-32 border border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50  dark:border-gray-600 dark:hover:border-gray-200"
            >
              <div className="flex flex-col items-center justify-center">
                <svg
                  aria-hidden="true"
                  className="w-10 h-10 mb-3 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    stroke-width="2"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  ></path>
                </svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-500">
                  <span className="font-semibold">Click to upload</span>
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  SVG, PNG, JPG or GIF (MAX. 800x400px)
                </p>
              </div>
            </label>
          </>
        ) : (
          <input
            on="true"
            id={props.name}
            value={value}
            type={props.type ?? "text"}
            onChange={props.onChange}
            name={props.name}
            disabled={props.disabled}
            required={props.required}
            placeholder={props.placeholder}
            className="w-full h-10 text-gray-900 placeholder-transparent border  outline-none border-gray-300  peer rounded-md px-2 focus:outline-none"
          />
        )}
        {props.label && (
          <TextFieldLabel label={props.label} name={props.name} />
        )}
      </div>
    </div>
  );
}

const TextFieldLabel = ({ label, name }) => {
  return (
    <label
      htmlFor={name}
      className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-3 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-black peer-focus:dark:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:pt-1 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-75 peer-focus:-translate-y-3 left-1"
    >
      {" "}
      {label}
    </label>
  );
};

export function TextFieldError({ error }) {
  return <span className="text-red-500 text-xs ">{error}</span>;
}

TextField.prototype = {
  placeholder: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func,
  type: PropTypes.string,
  required: PropTypes.bool,
  className: PropTypes.string,
  errors: PropTypes.string,
};
