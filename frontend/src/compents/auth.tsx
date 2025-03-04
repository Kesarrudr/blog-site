import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SignupInput } from "@kesarrudr/blogsite-common";
import axios from "axios";
import { BACKEND_URL } from "../config";
export const Auth = ({ type }: { type: "signin" | "signup" }) => {
  const [postInputsSignup, setpostInputsSignup] = useState<SignupInput>({
    name: "",
    email: "",
    password: "",
  });

  const Navigate = useNavigate();
  async function sendRequest() {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`,
        postInputsSignup,
      );
      const jwt = response.data.token;
      localStorage.setItem("token", jwt);
      Navigate("/blogs");
    } catch (error) {
      console.log(error);
      alert("not able to signup");
      //alert the user the request can't be send
    }
  }
  return (
    <div className="h-screen flex justify-center  flex-col">
      <div className="flex justify-center">
        <div>
          <div className="px-10">
            <div className="text-3xl font-extrabold">Create an account</div>
            <div className="text-slate-400">
              {type === "signin"
                ? "Don't have an account?"
                : "Already have a account?"}
              <Link
                className="pl-2 underline"
                to={type === "signin" ? "/signup" : "/signin"}
              >
                {type === "signin" ? "Sign Up" : "Sign In"}
              </Link>
            </div>
          </div>
          <div className="pt-5">
            <div>
              {type === "signup" ? (
                <LablledInput
                  label="Username"
                  placeholder="Bushan kumar"
                  onChange={(e) => {
                    setpostInputsSignup((c) => ({
                      ...c,
                      name: e.target.value,
                    }));
                  }}
                />
              ) : null}
            </div>
            <div className="pt-3">
              <LablledInput
                label="Email"
                placeholder="abc@gmail.com"
                onChange={(e) => {
                  setpostInputsSignup((c) => ({
                    ...c,
                    email: e.target.value,
                  }));
                }}
              />
            </div>
            <div className="pt-3">
              <LablledInput
                label="Password"
                placeholder="Enter you password"
                onChange={(e) => {
                  setpostInputsSignup((c) => ({
                    ...c,
                    password: e.target.value,
                  }));
                }}
                type={"password"}
              />
              <div className="pt-6">
                <button
                  onClick={sendRequest}
                  type="button"
                  className="w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                >
                  {type === "signup" ? "Sign Up" : "Sign In"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
interface LablledInputParam {
  label: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}
function LablledInput({
  label,
  placeholder,
  onChange,
  type,
}: LablledInputParam) {
  return (
    <div>
      <label className="block mb-2 text-sm  font-semibold text-black">
        {label}
      </label>
      <input
        onChange={onChange}
        type={type || "text"}
        id="first_name"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
        placeholder={placeholder}
        required
      />
    </div>
  );
}
