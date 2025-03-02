import { useFormik } from "formik";
import { useContext } from "react";
import * as Yup from "yup";
import GlobalContext from "../../../../context/GlobalContext";
import useEditProfile from "../../../../services/common/useEditProfle";
import { ButtonLoader1 } from "../../../../components/shared/ButtonLoaders";

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
});
function EditProfile() {
  const { userInfo } = useContext(GlobalContext);
  const { EditProfile, loading, setShowMessage } = useEditProfile();

  const initialValues = {
    firstname: userInfo?.first_name || "",
    lastname: userInfo?.last_name || "",
    email: userInfo?.email || "",
    phone: userInfo?.phone_number || "",
    state: userInfo?.state || "",
    city: userInfo?.city || "",
    address: userInfo?.street || "",
  };

  const { values, errors, handleChange, handleSubmit, touched } = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      setShowMessage(true);
      EditProfile({
        first_name: values.firstname,
        last_name: values.lastname,
        email: values.email,
        phone_number: values.phone,
        state: values.state,
        city: values.city,
        street: values.address,
      });
    },
  });
  return (
    <>
      <h1 className="font-semibold text-[30px] text-secondary">Edit Profile</h1>
      <form onSubmit={handleSubmit} className="w-full">
        <div className="w-full mt-3">
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
                <p className="text-red-700 text-xs mt-1">{errors.firstname}</p>
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

export default EditProfile;
