import { useFormik } from "formik";
import { useContext } from "react";
import * as Yup from "yup";
import GlobalContext from "../../../../context/GlobalContext";
import useEditProfile from "../../../../services/common/useEditProfile";
import { ButtonLoader1 } from "../../../../components/shared/ButtonLoaders";
import Input from "../../../../components/shared/Input";
import { FaCity, FaLink, FaRegUser } from "react-icons/fa";
import {
  MdOutlineEmail,
  MdOutlineLocationOn,
  MdOutlinePhoneIphone,
} from "react-icons/md";

const validationSchema = Yup.object({
  firstname: Yup.string()
    .required("Firstname is required")
    .max(100, "Limit exceeded"),
  lastname: Yup.string()
    .required("Lastname is required")
    .max(100, "Limit exceeded"),
  profile_picture: Yup.string(),
  email: Yup.string().required("Email is required").max(100, "Limit exceeded"),
  phone: Yup.string()
    .required("Phone number is required")
    .max(100, "Limit exceeded"),
  state: Yup.string().required("State is required").max(100, "Limit exceeded"),
  city: Yup.string().required("City is required").max(100, "Limit exceeded"),
  address: Yup.string()
    .required("Address is required")
    .max(100, "Limit exceeded"),
  linkedin_link: Yup.string()
    .required("LinkedIn link is required")
    .max(100, "Limit exceeded"),
});
function EditProfile() {
  const { userInfo } = useContext(GlobalContext);
  const { EditProfile, loading } = useEditProfile();

  const initialValues = {
    firstname: userInfo?.user?.first_name || "",
    lastname: userInfo?.user?.last_name || "",
    email: userInfo?.user?.email || "",
    profile_picture: userInfo?.user?.profile_picture || "",
    phone: userInfo?.user?.phone_number || "",
    state: userInfo?.user?.state || "",
    city: userInfo?.user?.city || "",
    address: userInfo?.user?.street || "",
    linkedin_link: userInfo?.user?.linkedin_link || "",
  };

  const { values, errors, handleChange, handleSubmit, touched, resetForm } =
    useFormik({
      initialValues,
      validationSchema,
      enableReinitialize: true,
      onSubmit: async (values) => {
        const isNavigate = false;
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
              linkedin_link: values.linkedin_link,
              profile_picture: values.profile_picture,
            },
          },
          isNavigate,
          showMessage
        );
      },
    });

  const handleCancel = () => {
    resetForm();
  };
  return (
    <>
      <h1 className="font-semibold text-[30px] text-secondary">Edit Profile</h1>
      <form onSubmit={handleSubmit} className="w-full">
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
                readyOnly={true}
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
        </div>
        <div className="flex items-center justify-end gap-2 w-full mt-3">
          <button
            className="bg-[#02174C0F] border border-secondary cursor-pointer hover:opacity-80 w-[130px] h-[40px] text-secondary rounded flex justify-center items-center"
            type="reset"
            onClick={handleCancel}
            disabled={loading}
          >
            Cancel
          </button>
          <button
            className="button-2 bg-secondary border border-secondary cursor-pointer w-[130px] h-[40px] text-white rounded flex justify-center items-center"
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

export default EditProfile;
