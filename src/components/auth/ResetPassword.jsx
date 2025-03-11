/* eslint-disable react/prop-types */
import { useFormik } from "formik";
import * as Yup from "yup";
import { PiEyeSlash, PiEyeLight } from "react-icons/pi";
import { ButtonLoader1 } from "../shared/ButtonLoaders";
import { useState } from "react";
import useResetPassword from "../../services/auth/useResetPassword";

const validationSchema = Yup.object({
  password: Yup.string()
    .required("Password is required")
    .max(100, "Limit exceeded"),
  confirm_password: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
});

function ResetPassword(props) {
  const { forgotEmail, setAuthModalType, resetPasswordDetails } = props;
  const [password, setPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState(false);
  const { ResetPassword, loading, errorMessage } = useResetPassword();

  const initialValues = {
    password: "",
    confirm_password: "",
  };

  const { values, errors, handleChange, handleSubmit, touched } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      ResetPassword(
        {
          email: forgotEmail,
          password: values.password,
          token: resetPasswordDetails?.token,
          uid: resetPasswordDetails?.uid,
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
            Set new password
          </h1>
          <p className="font-[500] text-[16px] text-[#6F7487]">
            Your new password must be different from previously used passwords.
          </p>
          <div className="w-full mt-4">
            <div className="mt-2">
              <div className="relative">
                <input
                  placeholder="New password"
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
            <div className="mt-3">
              <div className="relative">
                <input
                  placeholder="Confirm password"
                  name="confirm_password"
                  value={values.confirm_password}
                  onChange={handleChange}
                  type={confirmPassword ? "text" : "password"}
                  className="w-full h-[40px] px-3 rounded-[4px] bg-transparent border border-[#02174C33] outline-none hover:border-secondary focus:border-secondary"
                />
                <div
                  className="h-full absolute top-0 right-2 cursor-pointer flex items-center justify-center text-center"
                  onClick={() => setConfirmPassword(!confirmPassword)}
                >
                  {confirmPassword ? <PiEyeSlash /> : <PiEyeLight />}
                </div>
              </div>
              {errors.confirm_password && touched.confirm_password && (
                <p className="text-red-700 text-xs mt-1">
                  {errors.confirm_password}
                </p>
              )}
            </div>
          </div>
          {errorMessage && (
            <p className="text-red-500 font-normal text-[15px] text-center my-3">
              {errorMessage}
            </p>
          )}
          <button
            className="bg-secondary cursor-pointer hover:opacity-80 w-full h-[40px] text-white rounded mt-6 flex justify-center items-center"
            type="submit"
            disabled={loading}
          >
            {loading ? <ButtonLoader1 /> : "Change Password"}
          </button>
        </form>
      </div>
    </>
  );
}

export default ResetPassword;
