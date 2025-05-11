/* eslint-disable react/prop-types */
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import useSignup from "../../services/auth/useSignup";
import { SocialLogin } from "../shared/SocialLogin";
import { ButtonLoader1 } from "../shared/ButtonLoaders";
import { Link } from "react-router-dom";
import Input from "../shared/Input";
import {
  MdLockOutline,
  MdOutlineEmail,
  MdOutlineLocationOn,
  MdOutlinePhoneIphone,
} from "react-icons/md";
import { FaCity, FaRegUser } from "react-icons/fa";

const validationSchema = Yup.object({
  role: Yup.string().required("Please select Junkie"),
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
  terms: Yup.boolean().oneOf([true], "Please accept terms & conditions"),
});

function Signup(props) {
  const { setAuthModalType, handleClose } = props;
  const [password, setPassword] = useState(false);
  const { Signup, loading, errorMessage } = useSignup();

  const initialValues = {
    role: "",
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    state: "",
    city: "",
    address: "",
    password: "",
    terms: false,
  };

  const { values, errors, handleChange, handleSubmit, touched } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      Signup(
        {
          role: values.role,
          first_name: values.firstname,
          last_name: values.lastname,
          email: values.email,
          phone_number: values.phone,
          state: values.state,
          city: values.city,
          street: values.address,
          password: values.password,
          is_verified: true,
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
            Become a Deal Junkie
          </h1>
          <p className="font-[500] text-[16px] text-[#6F7487]">
            Register to your account to manage your profile and take
            <br /> advantage of all the features.
          </p>
          <div className="w-full mt-4">
            <div className="mt-2">
              <label className="font-[500] text-[18px] text-secondary">
                What Kind of Junkie do you want to be?
              </label>
              <div className="mt-1 flex items-center gap-5">
                {[
                  { name: "Buyer", value: "buyer" },
                  { name: "Seller", value: "seller" },
                  { name: "Both", value: "both" },
                ].map((option, index) => (
                  <div key={index} className="flex items-center gap-1">
                    <input
                      type="radio"
                      name="role"
                      value={option.value}
                      checked={values.role === option.value}
                      onChange={handleChange}
                      id={index}
                    />
                    <label htmlFor={index}>{option.name}</label>
                  </div>
                ))}
              </div>
              {errors.role && touched.role && (
                <p className="text-red-700 text-xs mt-1">{errors.role}</p>
              )}
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <div>
                <Input
                  type="text"
                  placeholder="First name"
                  name="firstname"
                  value={values.firstname}
                  handleChange={handleChange}
                  icon={<FaRegUser />}
                />
                {errors.firstname && touched.firstname && (
                  <p className="text-red-700 text-xs mt-1">
                    {errors.firstname}
                  </p>
                )}
              </div>
              <div>
                <Input
                  type="text"
                  placeholder="Last name"
                  name="lastname"
                  value={values.lastname}
                  handleChange={handleChange}
                  icon={<FaRegUser />}
                />
                {errors.lastname && touched.lastname && (
                  <p className="text-red-700 text-xs mt-1">{errors.lastname}</p>
                )}
              </div>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <div>
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
              <div>
                <Input
                  type="number"
                  placeholder="Phone number"
                  name="phone"
                  value={values.phone}
                  handleChange={handleChange}
                  icon={<MdOutlinePhoneIphone />}
                />
                {errors.phone && touched.phone && (
                  <p className="text-red-700 text-xs mt-1">{errors.phone}</p>
                )}
              </div>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <div>
                <Input
                  type="text"
                  placeholder="State"
                  name="state"
                  value={values.state}
                  handleChange={handleChange}
                  icon={<FaCity />}
                />
                {errors.state && touched.state && (
                  <p className="text-red-700 text-xs mt-1">{errors.state}</p>
                )}
              </div>
              <div>
                <Input
                  type="text"
                  placeholder="City"
                  name="city"
                  value={values.city}
                  handleChange={handleChange}
                  icon={<FaCity />}
                />
                {errors.city && touched.city && (
                  <p className="text-red-700 text-xs mt-1">{errors.city}</p>
                )}
              </div>
            </div>
            <div className="mt-3 grid grid-cols-1">
              <div>
                <Input
                  type="text"
                  placeholder="Address"
                  name="address"
                  value={values.address}
                  handleChange={handleChange}
                  icon={<MdOutlineLocationOn />}
                />
                {errors.address && touched.address && (
                  <p className="text-red-700 text-xs mt-1">{errors.address}</p>
                )}
              </div>
            </div>
            <div className="mt-3  grid grid-cols-1">
              <div>
                <Input
                  type={password ? "text" : "password"}
                  placeholder="Password"
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
            </div>
            <div className="mt-3  grid grid-cols-1">
              <div className="flex items-center gap-1">
                <input
                  type="checkbox"
                  name="terms"
                  value={values.terms}
                  onChange={handleChange}
                />
                <div className="text-[#6F7487] text-[14px] font-normal">
                  Accept to{" "}
                  <Link
                    to="/privacy-policy"
                    onClick={handleClose}
                    className="text-primary"
                  >
                    Privacy Policy
                  </Link>{" "}
                  and{" "}
                  <Link
                    to="/terms-conditions"
                    onClick={handleClose}
                    className="text-primary"
                  >
                    Terms & conditions
                  </Link>
                </div>
              </div>
              {errors.terms && touched.terms && (
                <p className="text-red-700 text-xs mt-1">{errors.terms}</p>
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
