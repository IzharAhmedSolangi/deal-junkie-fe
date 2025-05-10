import { useFormik } from "formik";
import { useContext } from "react";
import * as Yup from "yup";
import GlobalContext from "../../../../context/GlobalContext";
import useEditProfile from "../../../../services/common/useEditProfile";
import { ButtonLoader1 } from "../../../../components/shared/ButtonLoaders";
import useBecomeSeller from "../../../../services/seller/useBecomeSeller";
import Input from "../../../../components/shared/Input";
import { FaCity, FaDollarSign, FaRegUser } from "react-icons/fa";
import {
  MdOutlineEmail,
  MdOutlineLocationOn,
  MdOutlinePhoneIphone,
} from "react-icons/md";
import { PiHandbagSimpleFill } from "react-icons/pi";

const validationSchema = Yup.object({
  firstname: Yup.string()
    .required("Firstname is required")
    .max(100, "Limit exceeded"),
  lastname: Yup.string()
    .required("Lastname is required")
    .max(100, "Limit exceeded"),
  profile_picture: Yup.string(),
  email: Yup.string()
    .email("Invalid email")
    .required("Email is required")
    .max(100, "Limit exceeded"),
  phone: Yup.string()
    .required("Phone number is required")
    .max(100, "Limit exceeded"),
  state: Yup.string().required("State is required").max(100, "Limit exceeded"),
  city: Yup.string().required("City is required").max(100, "Limit exceeded"),
  address: Yup.string()
    .required("Address is required")
    .max(100, "Limit exceeded"),

  experience: Yup.string()
    .required("Please enter your experience")
    .max(2, "Limit exceeded"),
  rate_per_hour: Yup.string()
    .required("Please enter Rate per hour")
    .max(10, "Limit exceeded"),

  describe_yourself: Yup.string()
    .required("Please describe yourself")
    .max(300, "Limit exceeded"),
  describe_skills_experience: Yup.string()
    .required("Please describe your skills and experience")
    .max(300, "Limit exceeded"),
  achievements: Yup.string()
    .required("Please describe your achievements")
    .max(300, "Limit exceeded"),
  work_preferences: Yup.string()
    .required("Please describe your work preferences")
    .max(300, "Limit exceeded"),
});

function EditProfile() {
  const { userInfo } = useContext(GlobalContext);
  const { EditProfile, loading } = useEditProfile();
  const { BecomeSeller, sellerLoading } = useBecomeSeller();

  const initialValues = {
    firstname: userInfo?.user?.first_name || "",
    lastname: userInfo?.user?.last_name || "",
    email: userInfo?.user?.email || "",
    phone: userInfo?.user?.phone_number || "",
    profile_picture: userInfo?.user?.profile_picture || "",
    state: userInfo?.user?.state || "",
    city: userInfo?.user?.city || "",
    address: userInfo?.user?.street || "",

    experience: userInfo?.seller_profile?.experience || "",
    rate_per_hour: userInfo?.seller_profile?.rate_per_hour || "",

    describe_yourself: userInfo?.seller_profile?.describe_yourself || "",
    describe_skills_experience:
      userInfo?.seller_profile?.skill_expperience || "",
    achievements: userInfo?.seller_profile?.achievements || "",
    work_preferences: userInfo?.seller_profile?.work_preferences || "",
  };

  const { values, errors, handleChange, handleSubmit, touched, resetForm } =
    useFormik({
      initialValues,
      validationSchema,
      enableReinitialize: true,
      onSubmit: async (values) => {
        if (userInfo?.seller_profile !== null) {
          const showMessage = true;

          EditProfile(
            {
              user: {
                first_name: values.firstname,
                last_name: values.lastname,
                phone_number: values.phone,
                state: values.state,
                city: values.city,
                street: values.address,
                email: userInfo?.user?.email,
                role: userInfo?.user?.role,
                profile_picture: values.profile_picture,
                bio: userInfo?.user?.bio,
              },
              seller_profile: {
                experience: values.experience,
                rate_per_hour: values.rate_per_hour,

                describe_yourself: values.describe_yourself,
                skill_expperience: values.describe_skills_experience,
                achievements: values.achievements,
                work_preferences: values.work_preferences,
              },
            },
            showMessage
          );
        }
        if (userInfo?.seller_profile === null) {
          BecomeSeller({
            experience: values.experience,
            rate_per_hour: values.rate_per_hour,

            describe_yourself: values.describe_yourself,
            skill_expperience: values.describe_skills_experience,
            achievements: values.achievements,
            work_preferences: values.work_preferences,
          });
        }
      },
    });

  const handleCancel = () => {
    resetForm();
  };
  return (
    <>
      {/* Personal Information */}
      <form onSubmit={handleSubmit} className="w-full">
        <h1 className="font-semibold text-[30px] text-secondary">
          Personal Information
        </h1>
        <div className="w-full mt-3">
          <div className="mt-2 grid grid-cols-2 gap-2">
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
                <p className="text-red-700 text-xs mt-1">{errors.firstname}</p>
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
        </div>
        {/* Work Information */}
        {/* <div className="w-full mt-3">
          <h1 className="font-semibold text-[30px] text-secondary">
            Work Information
          </h1>
        </div> */}
        {/* Additional Information */}
        <div className="w-full mt-3">
          <h1 className="font-semibold text-[30px] text-secondary">
            Additional Information
          </h1>
          <div className="mt-2 grid grid-cols-2 gap-2">
            <div>
              <Input
                type="number"
                placeholder="Years of experience"
                name="experience"
                value={values.experience}
                handleChange={handleChange}
                icon={<PiHandbagSimpleFill />}
              />
              {errors.experience && touched.experience && (
                <p className="text-red-700 text-xs mt-1">{errors.experience}</p>
              )}
            </div>
            <div>
              <Input
                type="number"
                placeholder="Rate per hour"
                name="rate_per_hour"
                value={values.rate_per_hour}
                handleChange={handleChange}
                icon={<FaDollarSign />}
              />
              {errors.rate_per_hour && touched.rate_per_hour && (
                <p className="text-red-700 text-xs mt-1">
                  {errors.rate_per_hour}
                </p>
              )}
            </div>
          </div>
        </div>
        {/* Add Description */}
        <div className="w-full mt-3">
          <h1 className="font-semibold text-[30px] text-secondary">
            Add Description
          </h1>
          <div className="mt-2 grid grid-cols-1 gap-2">
            <div>
              <textarea
                name="describe_yourself"
                value={values.describe_yourself}
                onChange={handleChange}
                placeholder="Describe yourself"
                className="w-full min-h-[120px] max-h-[120px] p-3 rounded-[4px] bg-transparent border border-[#02174C33] outline-none hover:border-secondary focus:border-secondary"
              />
              {errors.describe_yourself && touched.describe_yourself && (
                <p className="text-red-700 text-xs">
                  {errors.describe_yourself}
                </p>
              )}
            </div>
            <div>
              <textarea
                name="describe_skills_experience"
                value={values.describe_skills_experience}
                onChange={handleChange}
                placeholder="Describe your skills and experience"
                className="w-full min-h-[120px] max-h-[120px] p-3 rounded-[4px] bg-transparent border border-[#02174C33] outline-none hover:border-secondary focus:border-secondary"
              />
              {errors.describe_skills_experience &&
                touched.describe_skills_experience && (
                  <p className="text-red-700 text-xs">
                    {errors.describe_skills_experience}
                  </p>
                )}
            </div>
            <div>
              <textarea
                name="achievements"
                value={values.achievements}
                onChange={handleChange}
                placeholder="Describe your achievements"
                className="w-full min-h-[120px] max-h-[120px] p-3 rounded-[4px] bg-transparent border border-[#02174C33] outline-none hover:border-secondary focus:border-secondary"
              />
              {errors.achievements && touched.achievements && (
                <p className="text-red-700 text-xs">{errors.achievements}</p>
              )}
            </div>
            <div>
              <textarea
                name="work_preferences"
                value={values.work_preferences}
                onChange={handleChange}
                placeholder="Describe your work preferences"
                className="w-full min-h-[120px] max-h-[120px] p-3 rounded-[4px] bg-transparent border border-[#02174C33] outline-none hover:border-secondary focus:border-secondary"
              />
              {errors.work_preferences && touched.work_preferences && (
                <p className="text-red-700 text-xs">
                  {errors.work_preferences}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-end gap-2 w-full mt-5">
          <button
            className="bg-[#02174C0F] border border-secondary cursor-pointer hover:opacity-80 w-[130px] h-[40px] text-secondary rounded flex justify-center items-center"
            disabled={loading || sellerLoading}
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            className="bg-secondary border border-secondary cursor-pointer hover:opacity-80 w-[130px] h-[40px] text-white rounded flex justify-center items-center"
            type="submit"
            disabled={loading || sellerLoading}
          >
            {loading || sellerLoading ? <ButtonLoader1 /> : "Save Changes"}
          </button>
        </div>
      </form>
    </>
  );
}

export default EditProfile;
