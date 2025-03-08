import { useFormik } from "formik";
import { useContext } from "react";
import * as Yup from "yup";
import GlobalContext from "../../../../context/GlobalContext";
import useEditProfile from "../../../../services/common/useEditProfile";
import { ButtonLoader1 } from "../../../../components/shared/ButtonLoaders";
import ToggleButton from "../../../../components/shared/ToggleButton";
import useBecomeSeller from "../../../../services/seller/useBecomeSeller";

const validationSchema = Yup.object({
  firstname: Yup.string()
    .required("Firstname is required")
    .max(100, "Limit exceeded"),
  lastname: Yup.string()
    .required("Lastname is required")
    .max(100, "Limit exceeded"),
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

  monday_start: Yup.string().required("Starting time is required"),
  monday_close: Yup.string().required("Closing time is required"),
  monday_available: Yup.boolean(),

  tuesday_start: Yup.string().required("Starting time is required"),
  tuesday_close: Yup.string().required("Closing time is required"),
  tuesday_available: Yup.boolean(),

  wednesday_start: Yup.string().required("Starting time is required"),
  wednesday_close: Yup.string().required("Closing time is required"),
  wednesday_available: Yup.boolean(),

  thursday_start: Yup.string().required("Starting time is required"),
  thursday_close: Yup.string().required("Closing time is required"),
  thursday_available: Yup.boolean(),

  friday_start: Yup.string().required("Starting time is required"),
  friday_close: Yup.string().required("Closing time is required"),
  friday_available: Yup.boolean(),

  saturday_start: Yup.string().required("Starting time is required"),
  saturday_close: Yup.string().required("Closing time is required"),
  saturday_available: Yup.boolean(),

  sunday_start: Yup.string().required("Starting time is required"),
  sunday_close: Yup.string().required("Closing time is required"),
  sunday_available: Yup.boolean(),
});

function EditProfile() {
  const { userInfo } = useContext(GlobalContext);
  const { EditProfile, loading, setShowMessage } = useEditProfile();
  const { BecomeSeller, sellerLoading } = useBecomeSeller();

  const initialValues = {
    firstname: userInfo?.user?.first_name || "",
    lastname: userInfo?.user?.last_name || "",
    email: userInfo?.user?.email || "",
    phone: userInfo?.user?.phone_number || "",
    state: userInfo?.user?.state || "",
    city: userInfo?.user?.city || "",
    address: userInfo?.user?.street || "",
    monday_start: userInfo?.seller_profile?.working_hours?.monday_start || "",
    tuesday_start: userInfo?.seller_profile?.working_hours?.tuesday_start || "",
    wednesday_start:
      userInfo?.seller_profile?.working_hours?.wednesday_start || "",
    thursday_start:
      userInfo?.seller_profile?.working_hours?.thursday_start || "",
    friday_start: userInfo?.seller_profile?.working_hours?.friday_start || "",
    monday_close: userInfo?.seller_profile?.working_hours?.monday_close || "",
    tuesday_close: userInfo?.seller_profile?.working_hours?.tuesday_close || "",
    wednesday_close:
      userInfo?.seller_profile?.working_hours?.wednesday_close || "",
    thursday_close:
      userInfo?.seller_profile?.working_hours?.thursday_close || "",
    friday_close: userInfo?.seller_profile?.working_hours?.friday_close || "",
    monday_available:
      userInfo?.seller_profile?.working_hours?.monday_available || false,
    tuesday_available:
      userInfo?.seller_profile?.working_hours?.tuesday_available || false,
    wednesday_available:
      userInfo?.seller_profile?.working_hours?.wednesday_available || false,
    thursday_available:
      userInfo?.seller_profile?.working_hours?.thursday_available || false,
    friday_available:
      userInfo?.seller_profile?.working_hours?.friday_available || false,
  };

  const {
    values,
    errors,
    handleChange,
    handleSubmit,
    touched,
    setFieldValue,
    resetForm,
  } = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      console.log({ values });
      if (userInfo?.seller_profile !== null) {
        setShowMessage(true);
        EditProfile({
          user: {
            first_name: values.firstname,
            last_name: values.lastname,
            phone_number: values.phone,
            state: values.state,
            city: values.city,
            street: values.address,
          },
          seller_profile: {
            working_hours: {
              monday_start: values.monday_start,
              tuesday_start: values.tuesday_start,
              wednesday_start: values.wednesday_start,
              thursday_start: values.thursday_start,
              friday_start: values.friday_start,
              monday_close: values.monday_close,
              tuesday_close: values.tuesday_close,
              wednesday_close: values.wednesday_close,
              thursday_close: values.thursday_close,
              friday_close: values.friday_close,
              monday_available: values.monday_available,
              tuesday_available: values.tuesday_available,
              wednesday_available: values.wednesday_available,
              thursday_available: values.thursday_available,
              friday_available: values.friday_available,
            },
          },
        });
      }
      if (userInfo?.seller_profile === null) {
        BecomeSeller({
          user: userInfo?.user?.id,
          working_hours: {
            monday_start: values.monday_start,
            tuesday_start: values.tuesday_start,
            wednesday_start: values.wednesday_start,
            thursday_start: values.thursday_start,
            friday_start: values.friday_start,
            monday_close: values.monday_close,
            tuesday_close: values.tuesday_close,
            wednesday_close: values.wednesday_close,
            thursday_close: values.thursday_close,
            friday_close: values.friday_close,
            monday_available: values.monday_available,
            tuesday_available: values.tuesday_available,
            wednesday_available: values.wednesday_available,
            thursday_available: values.thursday_available,
            friday_available: values.friday_available,
          },
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
                readOnly
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
        {/* Work Information */}
        <div className="w-full mt-3">
          <h1 className="font-semibold text-[30px] text-secondary">
            Work Information
          </h1>
        </div>
        {/* Add Description */}
        <div className="w-full mt-3">
          <h1 className="font-semibold text-[30px] text-secondary">
            Add Description
          </h1>
        </div>
        {/* Working Hours */}
        <div className="w-full mt-3">
          <h1 className="font-semibold text-[30px] text-secondary">
            Your working hours
          </h1>
          <p className="font-[500] text-[16px] text-[#6F7487]">
            Set your working hours so that customers can hire you accordingly.
          </p>
          <div className="w-full mt-2">
            <div className="w-full flex items-center justify-between">
              <h2 className="font-[500] text-[20px] text-secondary">Monday</h2>
              <ToggleButton
                label={values.monday_available ? "Opened" : "Closed"}
                isOn={values.monday_available}
                handleToggle={() =>
                  setFieldValue("monday_available", !values.monday_available)
                }
              />
            </div>
            <div className="mt-2 grid grid-cols-2 gap-2">
              <div>
                <label className="font-[600] text-[16px] text-[#222222]">
                  Starting time
                </label>
                <input
                  type="time"
                  name="monday_start"
                  value={values.monday_start}
                  onChange={handleChange}
                  className="w-full h-[40px] px-3 mt-1 rounded-[4px] bg-transparent border border-[#02174C33] outline-none hover:border-secondary focus:border-secondary"
                />
                {errors.monday_start && touched.monday_start && (
                  <p className="text-red-700 text-xs mt-1">
                    {errors.monday_start}
                  </p>
                )}
              </div>
              <div>
                <label className="font-[600] text-[16px] text-[#222222]">
                  Closing time
                </label>
                <input
                  type="time"
                  name="monday_close"
                  value={values.monday_close}
                  onChange={handleChange}
                  className="w-full h-[40px] px-3 mt-1 rounded-[4px] bg-transparent border border-[#02174C33] outline-none hover:border-secondary focus:border-secondary"
                />
                {errors.monday_close && touched.monday_close && (
                  <p className="text-red-700 text-xs mt-1">
                    {errors.monday_close}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="w-full mt-2">
            <div className="w-full flex items-center justify-between">
              <h2 className="font-[500] text-[20px] text-secondary">Monday</h2>
              <ToggleButton
                label={values.tuesday_available ? "Opened" : "Closed"}
                isOn={values.tuesday_available}
                handleToggle={() =>
                  setFieldValue("tuesday_available", !values.tuesday_available)
                }
              />
            </div>
            <div className="mt-2 grid grid-cols-2 gap-2">
              <div>
                <label className="font-[600] text-[16px] text-[#222222]">
                  Starting time
                </label>
                <input
                  type="time"
                  name="tuesday_start"
                  value={values.tuesday_start}
                  onChange={handleChange}
                  className="w-full h-[40px] px-3 mt-1 rounded-[4px] bg-transparent border border-[#02174C33] outline-none hover:border-secondary focus:border-secondary"
                />
                {errors.tuesday_start && touched.tuesday_start && (
                  <p className="text-red-700 text-xs mt-1">
                    {errors.tuesday_start}
                  </p>
                )}
              </div>
              <div>
                <label className="font-[600] text-[16px] text-[#222222]">
                  Closing time
                </label>
                <input
                  type="time"
                  name="tuesday_close"
                  value={values.tuesday_close}
                  onChange={handleChange}
                  className="w-full h-[40px] px-3 mt-1 rounded-[4px] bg-transparent border border-[#02174C33] outline-none hover:border-secondary focus:border-secondary"
                />
                {errors.tuesday_close && touched.tuesday_close && (
                  <p className="text-red-700 text-xs mt-1">
                    {errors.tuesday_close}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="w-full mt-2">
            <div className="w-full flex items-center justify-between">
              <h2 className="font-[500] text-[20px] text-secondary">Monday</h2>
              <ToggleButton
                label={values.wednesday_available ? "Opened" : "Closed"}
                isOn={values.wednesday_available}
                handleToggle={() =>
                  setFieldValue(
                    "wednesday_available",
                    !values.wednesday_available
                  )
                }
              />
            </div>
            <div className="mt-2 grid grid-cols-2 gap-2">
              <div>
                <label className="font-[600] text-[16px] text-[#222222]">
                  Starting time
                </label>
                <input
                  type="time"
                  name="wednesday_start"
                  value={values.wednesday_start}
                  onChange={handleChange}
                  className="w-full h-[40px] px-3 mt-1 rounded-[4px] bg-transparent border border-[#02174C33] outline-none hover:border-secondary focus:border-secondary"
                />
                {errors.wednesday_start && touched.wednesday_start && (
                  <p className="text-red-700 text-xs mt-1">
                    {errors.wednesday_start}
                  </p>
                )}
              </div>
              <div>
                <label className="font-[600] text-[16px] text-[#222222]">
                  Closing time
                </label>
                <input
                  type="time"
                  name="wednesday_close"
                  value={values.wednesday_close}
                  onChange={handleChange}
                  className="w-full h-[40px] px-3 mt-1 rounded-[4px] bg-transparent border border-[#02174C33] outline-none hover:border-secondary focus:border-secondary"
                />
                {errors.wednesday_close && touched.wednesday_close && (
                  <p className="text-red-700 text-xs mt-1">
                    {errors.wednesday_close}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="w-full mt-2">
            <div className="w-full flex items-center justify-between">
              <h2 className="font-[500] text-[20px] text-secondary">Monday</h2>
              <ToggleButton
                label={values.thursday_available ? "Opened" : "Closed"}
                isOn={values.thursday_available}
                handleToggle={() =>
                  setFieldValue(
                    "thursday_available",
                    !values.thursday_available
                  )
                }
              />
            </div>
            <div className="mt-2 grid grid-cols-2 gap-2">
              <div>
                <label className="font-[600] text-[16px] text-[#222222]">
                  Starting time
                </label>
                <input
                  type="time"
                  name="thursday_start"
                  value={values.thursday_start}
                  onChange={handleChange}
                  className="w-full h-[40px] px-3 mt-1 rounded-[4px] bg-transparent border border-[#02174C33] outline-none hover:border-secondary focus:border-secondary"
                />
                {errors.thursday_start && touched.thursday_start && (
                  <p className="text-red-700 text-xs mt-1">
                    {errors.thursday_start}
                  </p>
                )}
              </div>
              <div>
                <label className="font-[600] text-[16px] text-[#222222]">
                  Closing time
                </label>
                <input
                  type="time"
                  name="thursday_close"
                  value={values.thursday_close}
                  onChange={handleChange}
                  className="w-full h-[40px] px-3 mt-1 rounded-[4px] bg-transparent border border-[#02174C33] outline-none hover:border-secondary focus:border-secondary"
                />
                {errors.thursday_close && touched.thursday_close && (
                  <p className="text-red-700 text-xs mt-1">
                    {errors.thursday_close}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="w-full mt-2">
            <div className="w-full flex items-center justify-between">
              <h2 className="font-[500] text-[20px] text-secondary">Monday</h2>
              <ToggleButton
                label={values.friday_available ? "Opened" : "Closed"}
                isOn={values.friday_available}
                handleToggle={() =>
                  setFieldValue("friday_available", !values.friday_available)
                }
              />
            </div>
            <div className="mt-2 grid grid-cols-2 gap-2">
              <div>
                <label className="font-[600] text-[16px] text-[#222222]">
                  Starting time
                </label>
                <input
                  type="time"
                  name="friday_start"
                  value={values.friday_start}
                  onChange={handleChange}
                  className="w-full h-[40px] px-3 mt-1 rounded-[4px] bg-transparent border border-[#02174C33] outline-none hover:border-secondary focus:border-secondary"
                />
                {errors.friday_start && touched.friday_start && (
                  <p className="text-red-700 text-xs mt-1">
                    {errors.friday_start}
                  </p>
                )}
              </div>
              <div>
                <label className="font-[600] text-[16px] text-[#222222]">
                  Closing time
                </label>
                <input
                  type="time"
                  name="friday_close"
                  value={values.friday_close}
                  onChange={handleChange}
                  className="w-full h-[40px] px-3 mt-1 rounded-[4px] bg-transparent border border-[#02174C33] outline-none hover:border-secondary focus:border-secondary"
                />
                {errors.friday_close && touched.friday_close && (
                  <p className="text-red-700 text-xs mt-1">
                    {errors.friday_close}
                  </p>
                )}
              </div>
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
