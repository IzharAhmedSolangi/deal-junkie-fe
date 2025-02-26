/* eslint-disable react/prop-types */
import { useFormik } from "formik";
import * as Yup from "yup";
import useLogin from "../../services/useLogin";
import { SocialLogin } from "../shared/SocialLogin";
import { PiEyeSlash, PiEyeLight } from "react-icons/pi";
import { ButtonLoader1 } from "../shared/ButtonLoaders";
import { useState } from "react";

const validationSchema = Yup.object({
  email: Yup.string().required("Email is required").max(100, "Limit exceeded"),
  password: Yup.string()
    .required("Password is required")
    .max(100, "Limit exceeded"),
});

function Login(props) {
  const { setAuthModalType } = props;
  const [password, setPassword] = useState(false);
  const { Login, loading, errorMessage } = useLogin();

  const initialValues = {
    email: "",
    password: "",
  };

  const { values, errors, handleChange, handleSubmit, touched } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      Login({
        email: values.email,
        password: values.password,
      });
    },
  });

  return (
    <>
      <div className="flex flex-col justify-center items-center w-full">
        <form onSubmit={handleSubmit} className="w-full">
          <h1 className="font-[600] text-[32px] text-secondary">
            Let’s get started
          </h1>
          <p className="font-[500] text-[16px] text-[#6F7487]">
            Sign in to your account and gain access to a wide
            <br />
            range of features available on Deal Junkie.
          </p>
          <div className="w-full mt-4">
            <div className="mt-2">
              <input
                type="text"
                placeholder="Enter email"
                name="email"
                value={values.email}
                onChange={handleChange}
                className="w-full h-[40px] px-3 rounded-[4px] bg-transparent border border-[#02174C33] outline-none hover:border-secondary focus:border-secondary"
              />
              {errors.email && touched.email && (
                <p className="text-red-700 text-xs mt-1">{errors.email}</p>
              )}
            </div>
            <div className="mt-3">
              <div className="relative">
                <input
                  placeholder="Password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  type={password ? "text" : "password"}
                  className="w-full h-[40px] px-3 rounded-[4px] bg-transparent border border-[#02174C33] outline-none hover:border-secondary focus:border-secondary"
                />
                <div
                  className="h-full absolute top-0 right-2 cursor-pointer flex items-center justify-center text-center"
                  onClick={() => setPassword(!password)}
                >
                  {password ? <PiEyeSlash /> : <PiEyeLight />}
                </div>
              </div>
              {errors.password && touched.password && (
                <p className="text-red-700 text-xs mt-1">{errors.password}</p>
              )}
            </div>
            <p
              className="text-primary font-bold w-full flex justify-end cursor-pointer"
              onClick={() => {
                setAuthModalType("forgot-password");
              }}
            >
              Forgot Password?
            </p>
          </div>
          {errorMessage && (
            <p className="text-red-500 font-normal text-[15px] leading-5 text-center my-3">
              {errorMessage}
            </p>
          )}
          <button
            className="bg-secondary cursor-pointer hover:opacity-80 w-full h-[40px] text-white rounded mt-6 flex justify-center items-center"
            type="submit"
            disabled={loading}
          >
            {loading ? <ButtonLoader1 /> : "Login"}
          </button>
        </form>

        <p className="font-[400] text-[15px] my-3 text-[#6F7487] text-center">
          OR
        </p>
        <SocialLogin />
        <p className="text-center text-gray-600 mt-4 text-[15px]">
          Don’t have an account?{" "}
          <button
            className="text-secondary hover:text-primary font-semibold cursor-pointer"
            onClick={() => {
              setAuthModalType("signup");
            }}
          >
            Create One!
          </button>
        </p>
      </div>
    </>
  );
}

export default Login;
