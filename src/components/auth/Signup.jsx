/* eslint-disable react/prop-types */
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import useSignup from "../../services/auth/useSignup";
import { LinkedInVerification } from "../shared/SocialLogin";
import { ButtonLoader1 } from "../shared/ButtonLoaders";
import { Link, useLocation } from "react-router-dom";
import Input from "../shared/Input";
import {
  MdLockOutline,
  MdOutlineEmail,
  MdOutlineLocationOn,
  MdOutlinePhoneIphone,
  MdVerified,
} from "react-icons/md";
import { FaCity, FaLink, FaRegUser } from "react-icons/fa";

const validationSchema = Yup.object({
  role: Yup.string().required("Please select Junkie"),
  username: Yup.string()
    .required("username is required")
    .max(100, "Limit exceeded")
    .matches(/^\S*$/, "Username cannot contain spaces"),
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
    .max(100, "Limit exceeded")
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      "Password must include uppercase, lowercase, number, and special character"
    ),
  linkedin_link: Yup.string()
    .required("LinkedIn link is required")
    .max(100, "Limit exceeded"),
  profile_picture: Yup.string(),
  referred_by: Yup.string().max(30, "Limit exceeded"),
  terms: Yup.boolean().oneOf([true], "Please accept terms & conditions"),
});

const useQuery = () => new URLSearchParams(useLocation().search);

function Signup(props) {
  const { setAuthModalType, handleClose } = props;
  const [password, setPassword] = useState(false);
  const { Signup, loading, errorMessage, setErrorMessage } = useSignup();
  const [isLinkedInVerified, setIsLinkedInVerified] = useState(false);
  const query = useQuery();
  const referral = query.get("referral");

  const initialValues = {
    role: "",
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    state: "",
    city: "",
    address: "",
    password: "",
    linkedin_link: "",
    profile_picture: "",
    terms: false,
    referred_by: referral || "",
  };

  const { values, errors, handleChange, handleSubmit, touched, setFieldValue } =
    useFormik({
      initialValues,
      validationSchema,
      onSubmit: async (values) => {
        if (isLinkedInVerified) {
          Signup(
            {
              role: values.role,
              username: values.username,
              first_name: values.firstname,
              last_name: values.lastname,
              email: values.email,
              phone_number: values.phone,
              state: values.state,
              city: values.city,
              street: values.address,
              password: values.password,
              linkedin_link: values.linkedin_link,
              profile_picture: values.profile_picture,
              referred_by: values.referred_by ? values.referred_by : null,
              is_verified: true,
            },
            setAuthModalType
          );
        } else {
          setErrorMessage("Please verify your linkedIn before signup");
        }
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
              <div className="mt-1 flex items-center flex-wrap md:gap-5 gap-2">
                {[
                  { name: "A Service Seeker", value: "buyer" },
                  { name: "A Service Provider", value: "seller" },
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
            <div className="mt-3 grid grid-cols-1">
              <div>
                <Input
                  type="text"
                  placeholder="Referral Code"
                  name="referred_by"
                  value={values.referred_by}
                  handleChange={handleChange}
                  icon={<FaLink />}
                />
                {errors.referred_by && touched.referred_by && (
                  <p className="text-red-700 text-xs mt-1">
                    {errors.referred_by}
                  </p>
                )}
              </div>
            </div>
            <div className="mt-3 grid grid-cols-1">
              <div>
                <Input
                  type="text"
                  placeholder="Username"
                  name="username"
                  value={values.username}
                  handleChange={handleChange}
                  icon={<FaRegUser />}
                />
                {errors.username && touched.username && (
                  <p className="text-red-700 text-xs mt-1">{errors.username}</p>
                )}
              </div>
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
            <div className="mt-3 grid grid-cols-2 gap-2">
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
            </div>
            <div className="mt-3 grid grid-cols-1">
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
            <div className="mt-3 grid grid-cols-1">
              <div>
                <Input
                  type="text"
                  placeholder="LinkedIn Link"
                  name="linkedin_link"
                  value={values.linkedin_link}
                  handleChange={handleChange}
                  icon={<FaLink />}
                />
                {errors.linkedin_link && touched.linkedin_link && (
                  <p className="text-red-700 text-xs mt-1">
                    {errors.linkedin_link}
                  </p>
                )}
              </div>
            </div>
            <div className="mt-3">
              {isLinkedInVerified ? (
                <div className="flex justify-center items-center gap-1 text-green-600">
                  <MdVerified />
                  LinkedIn Verified
                </div>
              ) : (
                <LinkedInVerification
                  setIsLinkedInVerified={setIsLinkedInVerified}
                  setFieldValue={setFieldValue}
                />
              )}
            </div>
            <div className="mt-3 grid grid-cols-1">
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
                    className="text-primary hover:underline"
                  >
                    Privacy Policy
                  </Link>{" "}
                  and{" "}
                  <Link
                    to="/terms-conditions"
                    onClick={handleClose}
                    className="text-primary hover:underline"
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

        {/* <p className="font-[400] text-[15px] my-3 text-[#6F7487] text-center">
          OR
        </p>
        <GoogleLogin handleClose={handleClose} /> */}
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
