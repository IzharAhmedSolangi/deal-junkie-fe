/* eslint-disable react/prop-types */
import { useFormik } from "formik";
import * as Yup from "yup";
import { ButtonLoader1 } from "../shared/ButtonLoaders";
import useForgotPassword from "../../services/auth/useForgotPassword";
import Input from "../shared/Input";
import { MdOutlineEmail } from "react-icons/md";

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
            Enter the email address associated with your account and we&apos;ll{" "}
            <br />
            send you 4-digit OTP code to reset your password.
          </p>
          <div className="w-full mt-4">
            <div className="mt-2">
              <Input
                type="text"
                placeholder="Email"
                name="email"
                value={values.email}
                handleChange={handleChange}
                icon={<MdOutlineEmail />}
              />
              {errors.email && touched.email && (
                <p className="text-red-700 text-xs mt-1">{errors.email}</p>
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
            {loading ? <ButtonLoader1 /> : "Send Code"}
          </button>
          <p className="text-center text-gray-600 mt-4 text-[15px]">
            Back to login?{" "}
            <button
              className="text-secondary hover:text-primary font-semibold cursor-pointer"
              onClick={() => {
                setAuthModalType("login");
              }}
            >
              Login
            </button>
          </p>
        </form>
      </div>
    </>
  );
}

export default ForgotPassword;
