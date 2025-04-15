/* eslint-disable react/prop-types */
import { useFormik } from "formik";
import * as Yup from "yup";
import { ButtonLoader1 } from "../shared/ButtonLoaders";
import { useState } from "react";
import useResetPassword from "../../services/auth/useResetPassword";
import Input from "../shared/Input";
import { MdLockOutline } from "react-icons/md";

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
          uidb64: resetPasswordDetails?.uid,
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
              <Input
                type={password ? "text" : "password"}
                placeholder="New password"
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
            <div className="mt-3">
              <Input
                type={password ? "text" : "password"}
                placeholder="Confirm new password"
                name="confirm_password"
                value={values.confirm_password}
                handleChange={handleChange}
                icon={<MdLockOutline />}
                field="password"
                password={confirmPassword}
                setPassword={setConfirmPassword}
              />
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
            className="hover-slide-button bg-secondary cursor-pointer w-full h-[40px] text-white rounded mt-6 flex justify-center items-center"
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
