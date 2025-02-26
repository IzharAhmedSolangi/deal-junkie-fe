/* eslint-disable react/prop-types */
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import useSignup from "../../services/useSignup";
import { SocialLogin } from "../shared/SocialLogin";
import { PiEyeSlash, PiEyeLight } from "react-icons/pi";
import { ButtonLoader1 } from "../shared/ButtonLoaders";
import { Link } from "react-router-dom";

const validationSchema = Yup.object({
  firstname: Yup.string()
    .required("Firstname is required")
    .max(100, "Limit exceeded"),
  lastname: Yup.string()
    .required("Lastname is required")
    .max(100, "Limit exceeded"),
  email: Yup.string().required("Email is required").max(100, "Limit exceeded"),
  phone: Yup.string()
    .required("Phone number is required")
    .max(100, "Limit exceeded"),
  state: Yup.string().required("State is required").max(100, "Limit exceeded"),
  city: Yup.string().required("City is required").max(100, "Limit exceeded"),
  address: Yup.string()
    .required("Address is required")
    .max(100, "Limit exceeded"),
  password: Yup.string()
    .required("Password is required")
    .max(100, "Limit exceeded"),
});

function Signup(props) {
  const { setAuthModalType } = props;
  const [password, setPassword] = useState(false);
  const { Signup, loading, errorMessage } = useSignup();

  const initialValues = {
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    state: "",
    city: "",
    address: "",
    password: "",
  };

  const { values, errors, handleChange, handleSubmit, touched } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      Signup({
        firstname: values.firstname,
        lastname: values.lastname,
        email: values.email,
        phone: values.phone,
        state: values.state,
        city: values.city,
        address: values.address,
        password: values.password,
      });
    },
  });

  return (
    <>
      <div className="flex flex-col justify-center items-center w-full">
        <form onSubmit={handleSubmit} className="w-full">
          <h1 className="font-[600] text-[32px] text-secondary">
            Create your account
          </h1>
          <p className="font-[500] text-[16px] text-[#6F7487]">
            Register to your account to manage your profile and take
            <br /> advantage of all the features.
          </p>
          <div className="w-full mt-4">
            <div className="mt-2 grid grid-cols-2 gap-2">
              <div>
                <input
                  type="text"
                  placeholder="First name"
                  name="firstname"
                  value={values.firstname}
                  onChange={handleChange}
                  className="w-full h-[40px] px-3 rounded-[4px] bg-transparent border border-[#02174C33] outline-none hover:border-secondary focus:border-secondary"
                />
                {errors.firstname && touched.firstname && (
                  <p className="text-red-700 text-xs mt-1">
                    {errors.firstname}
                  </p>
                )}
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Last name"
                  name="lastname"
                  value={values.lastname}
                  onChange={handleChange}
                  className="w-full h-[40px] px-3 rounded-[4px] bg-transparent border border-[#02174C33] outline-none hover:border-secondary focus:border-secondary"
                />
                {errors.lastname && touched.lastname && (
                  <p className="text-red-700 text-xs mt-1">{errors.lastname}</p>
                )}
              </div>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <div>
                <input
                  type="text"
                  placeholder="Email address"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  className="w-full h-[40px] px-3 rounded-[4px] bg-transparent border border-[#02174C33] outline-none hover:border-secondary focus:border-secondary"
                />
                {errors.email && touched.email && (
                  <p className="text-red-700 text-xs mt-1">{errors.email}</p>
                )}
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Enter phone number"
                  name="phone"
                  value={values.phone}
                  onChange={handleChange}
                  className="w-full h-[40px] px-3 rounded-[4px] bg-transparent border border-[#02174C33] outline-none hover:border-secondary focus:border-secondary"
                />
                {errors.phone && touched.phone && (
                  <p className="text-red-700 text-xs mt-1">{errors.phone}</p>
                )}
              </div>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <div>
                <input
                  type="text"
                  placeholder="State"
                  name="state"
                  value={values.state}
                  onChange={handleChange}
                  className="w-full h-[40px] px-3 rounded-[4px] bg-transparent border border-[#02174C33] outline-none hover:border-secondary focus:border-secondary"
                />
                {errors.state && touched.state && (
                  <p className="text-red-700 text-xs mt-1">{errors.state}</p>
                )}
              </div>
              <div>
                <input
                  type="text"
                  placeholder="City"
                  name="city"
                  value={values.city}
                  onChange={handleChange}
                  className="w-full h-[40px] px-3 rounded-[4px] bg-transparent border border-[#02174C33] outline-none hover:border-secondary focus:border-secondary"
                />
                {errors.city && touched.city && (
                  <p className="text-red-700 text-xs mt-1">{errors.city}</p>
                )}
              </div>
            </div>
            <div className="mt-3 grid grid-cols-1">
              <div>
                <input
                  type="text"
                  placeholder="Address"
                  name="address"
                  value={values.address}
                  onChange={handleChange}
                  className="w-full h-[40px] px-3 rounded-[4px] bg-transparent border border-[#02174C33] outline-none hover:border-secondary focus:border-secondary"
                />
                {errors.address && touched.address && (
                  <p className="text-red-700 text-xs mt-1">{errors.address}</p>
                )}
              </div>
            </div>
            <div className="mt-3  grid grid-cols-1">
              <div>
                <div className="relative">
                  <input
                    placeholder="Enter your password"
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
            </div>
            <div className="mt-3  grid grid-cols-1">
              <div className="flex items-center gap-1">
                <input type="checkbox" />
                <div className="text-[#6F7487] text-[14px] font-normal">
                  Accept to{" "}
                  <Link to="#" className="text-primary">
                    Privacy Policy
                  </Link>{" "}
                  and{" "}
                  <Link to="#" className="text-primary">
                    Terms & conditions
                  </Link>
                </div>
              </div>
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
            {loading ? <ButtonLoader1 /> : "Signup"}
          </button>
        </form>

        <p className="font-[400] text-[15px] my-3 text-[#6F7487] text-center">
          OR
        </p>
        <SocialLogin />
        <p className="text-center text-gray-600 mt-4 text-[15px]">
          Already have an account?{" "}
          <button
            className="text-secondary hover:text-primary font-semibold cursor-pointer"
            onClick={() => {
              setAuthModalType("login");
            }}
          >
            Login
          </button>
        </p>
      </div>
    </>
  );
}

export default Signup;
