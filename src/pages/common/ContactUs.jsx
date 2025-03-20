import { useFormik } from "formik";
import * as Yup from "yup";
import useContactUs from "../../services/common/useContactUs";
import { ButtonLoader1 } from "../../components/shared/ButtonLoaders";

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
  query: Yup.string().required("Query is required").max(200, "Limit exceeded"),
});

function ContactUs() {
  const { ContactUs, loading } = useContactUs();

  const initialValues = {
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    state: "",
    city: "",
    address: "",
    query: "",
  };

  const { values, errors, handleChange, handleSubmit, touched } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      ContactUs({
        first_name: values.firstname,
        last_name: values.lastname,
        email: values.email,
        phone_no: values.phone,
        state: values.state,
        city: values.city,
        street_address: values.address,
        reason: values.query,
      });
    },
  });
  return (
    <>
      <div className="bg-white w-full h-auto md:pb-40 pb-28 relative">
        <div className="w-full md:h-[320px] h-[260px] flex justify-center items-center">
          <img
            src="/assets/images/Banner2.png"
            alt=""
            className="absolute top-0 left-0 w-full md:h-[320px] h-[260px]"
          />
          <h1 className="font-[700] md:text-[48px] text-[30px] text-secondary z-10 text-center">
            Contact Us
          </h1>
        </div>
        <div className="w-full flex justify-center px-5 py-8">
          <form onSubmit={handleSubmit} className="md:w-[80%] w-full">
            <h1 className="font-[600] md:text-[32px] text-[26px] text-secondary">
              Reach out to us
            </h1>
            <p className="font-[500] md:text-[16px] text-[12px] text-[#6F7487]">
              Have a question or need assistance? Fill out the form below and
              our dedicated support team will get back to you as soon as
              possible. We&apos;re here to help!
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
                    <p className="text-red-700 text-xs mt-1">
                      {errors.lastname}
                    </p>
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
                    <p className="text-red-700 text-xs mt-1">
                      {errors.address}
                    </p>
                  )}
                </div>
              </div>
              <div className="mt-3 grid grid-cols-1">
                <div>
                  <textarea
                    placeholder="Describe your query"
                    type="text"
                    name="query"
                    value={values.query}
                    onChange={handleChange}
                    className="w-full min-h-[150px] max-h-[150px] px-3 py-3 rounded-[4px] bg-transparent border border-[#02174C33] outline-none hover:border-secondary focus:border-secondary"
                  />
                  {errors.query && touched.query && (
                    <p className="text-red-700 text-xs mt-1">{errors.query}</p>
                  )}
                </div>
              </div>
              <div className="mt-3 w-full flex justify-end">
                <button
                  className="bg-secondary cursor-pointer hover:opacity-80 w-[150px] h-[40px] text-white rounded flex justify-center items-center"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? <ButtonLoader1 /> : "Send Message"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default ContactUs;
