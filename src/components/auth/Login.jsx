/* eslint-disable react/prop-types */
import { useFormik } from "formik";
import * as Yup from "yup";
import useLogin from "../../services/auth/useLogin";
import { SocialLogin } from "../shared/SocialLogin";
import { ButtonLoader1 } from "../shared/ButtonLoaders";
import { useState } from "react";
import Input from "../shared/Input";
import { MdLockOutline, MdOutlineEmail } from "react-icons/md";

const validationSchema = Yup.object({
  email: Yup.string().required("Email is required").max(100, "Limit exceeded"),
  password: Yup.string()
    .required("Password is required")
    .max(100, "Limit exceeded"),
});

function Login(props) {
  const { setAuthModalType, handleClose } = props;
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
      Login(
        {
          email: values.email,
          password: values.password,
        },
        handleClose
      );
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
              <Input
                type="text"
                placeholder="Enter email"
                name="email"
                value={values.email}
                handleChange={handleChange}
                icon={<MdOutlineEmail />}
              />
              {errors.email && touched.email && (
                <p className="text-red-700 text-xs mt-1">{errors.email}</p>
              )}
            </div>
            <div className="mt-3">
              <Input
                type={password ? "text" : "password"}
                placeholder="Enter password"
                name="password"
                value={values.password}
                handleChange={handleChange}
                icon={<MdLockOutline />}
                field="password"
                password={password}
                setPassword={setPassword}
              />
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
            <p className="text-red-500 font-normal text-[15px] text-center my-3">
              {errorMessage}
            </p>
          )}
          <button
            className="hover-slide-button bg-secondary cursor-pointer w-full h-[40px] text-white rounded mt-6 flex justify-center items-center"
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
