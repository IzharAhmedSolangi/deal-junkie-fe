import { useFormik } from "formik";
import { useState } from "react";
import { PiEyeLight, PiEyeSlash } from "react-icons/pi";
import * as Yup from "yup";
import useChangePassword from "../../../../services/common/useChangePassword";
import { ButtonLoader1 } from "../../../../components/shared/ButtonLoaders";

const validationSchema = Yup.object({
  current_password: Yup.string()
    .required("Current password is required")
    .max(100, "Limit exceeded"),
  new_password: Yup.string()
    .required("New password is required")
    .max(100, "Limit exceeded"),
  confirm_new_password: Yup.string()
    .oneOf([Yup.ref("new_password"), null], "Passwords must match")
    .required("Confirm new password is required"),
});
function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState(false);
  const [newPassword, setNewPassword] = useState(false);
  const [confirmNewPassword, setConfirmNewPassword] = useState(false);
  const { ChangePassword, loading } = useChangePassword();

  const initialValues = {
    current_password: "",
    new_password: "",
    confirm_new_password: "",
  };

  const { values, errors, handleChange, handleSubmit, touched } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      ChangePassword({
        old_password: values.current_password,
        new_password: values.new_password,
      });
    },
  });
  return (
    <>
      <h1 className="font-semibold text-[30px] text-secondary">
        Change Password
      </h1>
      <form onSubmit={handleSubmit} className="w-full">
        <div className="w-full mt-3">
          <div className="mt-2 grid md:grid-cols-2 grid-cols-1 gap-2">
            <div>
              <div className="relative">
                <input
                  placeholder="Enter your current password"
                  name="current_password"
                  value={values.current_password}
                  onChange={handleChange}
                  type={currentPassword ? "text" : "password"}
                  className="w-full h-[40px] px-3 rounded-[4px] bg-transparent border border-[#02174C33] outline-none hover:border-secondary focus:border-secondary"
                />
                <div
                  className="h-full absolute top-0 right-2 cursor-pointer flex items-center justify-center text-center"
                  onClick={() => setCurrentPassword(!currentPassword)}
                >
                  {currentPassword ? <PiEyeSlash /> : <PiEyeLight />}
                </div>
              </div>
              {errors.current_password && touched.current_password && (
                <p className="text-red-700 text-xs mt-1">
                  {errors.current_password}
                </p>
              )}
            </div>
            <div>
              <div className="relative">
                <input
                  placeholder="Enter your new password"
                  name="new_password"
                  value={values.new_password}
                  onChange={handleChange}
                  type={newPassword ? "text" : "password"}
                  className="w-full h-[40px] px-3 rounded-[4px] bg-transparent border border-[#02174C33] outline-none hover:border-secondary focus:border-secondary"
                />
                <div
                  className="h-full absolute top-0 right-2 cursor-pointer flex items-center justify-center text-center"
                  onClick={() => setNewPassword(!newPassword)}
                >
                  {newPassword ? <PiEyeSlash /> : <PiEyeLight />}
                </div>
              </div>
              {errors.new_password && touched.new_password && (
                <p className="text-red-700 text-xs mt-1">
                  {errors.new_password}
                </p>
              )}
            </div>
          </div>
          <div className="mt-2 grid grid-cols-1">
            <div>
              <div className="relative">
                <input
                  placeholder="Confirm your new password"
                  name="confirm_new_password"
                  value={values.confirm_new_password}
                  onChange={handleChange}
                  type={confirmNewPassword ? "text" : "password"}
                  className="w-full h-[40px] px-3 rounded-[4px] bg-transparent border border-[#02174C33] outline-none hover:border-secondary focus:border-secondary"
                />
                <div
                  className="h-full absolute top-0 right-2 cursor-pointer flex items-center justify-center text-center"
                  onClick={() => setConfirmNewPassword(!confirmNewPassword)}
                >
                  {confirmNewPassword ? <PiEyeSlash /> : <PiEyeLight />}
                </div>
              </div>
              {errors.confirm_new_password && touched.confirm_new_password && (
                <p className="text-red-700 text-xs mt-1">
                  {errors.confirm_new_password}
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end gap-2 w-full mt-3">
          <button
            className="bg-[#02174C0F] border border-secondary cursor-pointer hover:opacity-80 w-[130px] h-[40px] text-secondary rounded flex justify-center items-center"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            className="bg-secondary border border-secondary cursor-pointer hover:opacity-80 w-[130px] h-[40px] text-white rounded flex justify-center items-center"
            type="submit"
            disabled={loading}
          >
            {loading ? <ButtonLoader1 /> : "Save Changes"}
          </button>
        </div>
      </form>
    </>
  );
}

export default ChangePassword;
