import React from "react";

type Props = {};

const Register = (props: Props) => {
  return (
    <div className="max-w-3xl">
      <div className="text-xl text-center py-5 text-bold">
        Register Your Account First!
      </div>
      <form>
        <div className="py-3">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-500">
            User Name
          </label>
          <input
            type="username"
            id="username"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="Alice"
            required={true}
          />
        </div>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-500">
          Avatar
        </label>
        <input
          className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          aria-describedby="user_avatar_help"
          id="user_avatar"
          type="file"
          required={true}
        />

        <div className="flex items-start py-5">
          <div className="flex items-center h-5">
            <input
              id="terms"
              type="checkbox"
              value=""
              className="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
              required={true}
            />
          </div>
          <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-400">
            I agree with the{" "}
            <a
              href="https://injoylabs.io"
              target="_blank"
              className="text-blue-600 hover:underline dark:text-blue-500"
            >
              terms and conditions
            </a>
          </label>
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Register new account
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
