import React from "react";

export default function Select({
    options,
    onChange,
    name,
    label,
    value,
    errors,
    defaultValue,
    disabled = false,
}) {
    return (
        <div className="relative flex flex-col">
            <select
                name={name}
                onChange={onChange}
                disabled={disabled}
                className="w-full h-10 text-[#8d8d8d] bg-white border border-gray-300 font-normal text-sm placeholder-transparent  focus:border-gray-500 peer rounded-md px-2 focus:outline-none"
            >
                <option value={""} selected={value === ""}>
                    Select {label}
                </option>
                {options &&
                    options.map((item, index) => {
                        return (
                            <option
                                key={index}
                                value={item.id ?? item.value ?? item._id}
                                selected={
                                    (item.id || item.value || item._id || "").toString() ===
                                    (value || "").toString()
                                }
                            >
                                {item.nameEng || item.name || item.title}
                            </option>
                        );
                    })}
            </select>
            <label className="absolute text-sm text-gray-300 dark:text-gray-400 duration-300 transform -translate-y-5 scale-75 top-3 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:pt-1 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
                {label}
            </label>
            {/* <TextFieldError error={errors} /> */}
        </div>
    );
}

export const InputFile = ({ name, value, onChange }) => {
    return (
        <div class="flex items-center justify-center w-full">
            <label
                for="dropzone-file"
                class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            >
                <div class="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                        aria-hidden="true"
                        class="w-10 h-10 mb-3 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        ></path>
                    </svg>
                    <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span class="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p class="text-xs text-gray-500 dark:text-gray-400">
                        SVG, PNG, JPG or GIF (MAX. 800x400px)
                    </p>
                </div>
                <input
                    id="dropzone-file"
                    type="file"
                    class="hidden"
                    name={name}
                    onChange={onChange}
                />
            </label>
        </div>
    );
};
