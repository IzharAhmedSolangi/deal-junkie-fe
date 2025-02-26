/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { useFormik } from "formik";
import * as Yup from "yup";
import { ButtonLoader1 } from "../shared/ButtonLoaders";
import useForgotPassword from "../../services/useForgotPassword";

const validationSchema = Yup.object({
  email: Yup.string().required("Email is required").max(100, "Limit exceeded"),
});

function ForgotPassword(props) {
  const { setAuthModalType, setForgotEmail } = props;
  const { ForgotPassword, loading, errorMessage } = useForgotPassword();

  const initialValues = {
    email: "",
  };

  const { values, errors, handleChange, handleSubmit, touched } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      setForgotEmail(values.email);
      ForgotPassword(
        {
          email: values.email,
        },
        setAuthModalType
      );
    },
  });
  return (
    <>
      <div className="flex flex-col justify-center items-center w-full">
        <form onSubmit={handleSubmit} className="w-full">
          <h1 className="font-[600] text-[32px] text-secondary">
            Forgot password
          </h1>
          <p className="font-[500] text-[16px] text-[#6F7487]">
            Enter the email address associated with your account and we'll{" "}
            <br />
            send you 4-digit OTP code to reset your password.
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
            {loading ? <ButtonLoader1 /> : "Send Code"}
          </button>
        </form>
      </div>
    </>
  );
}

export default ForgotPassword;
