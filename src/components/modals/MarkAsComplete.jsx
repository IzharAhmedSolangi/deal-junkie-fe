/* eslint-disable react/prop-types */
import { Fragment, useRef } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { Dialog, Transition } from "@headlessui/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import useUpload from "../../services/common/useUpload";
import { ButtonLoader1, ButtonLoader2 } from "../shared/ButtonLoaders";
import useMarkAsCompleted from "../../services/seller/useMarkAsCompleted";
import { getFileNameFromMediaUrl } from "../../utils/Extract";

const validationSchema = Yup.object({
  project_id: Yup.string().required("Order ID is required"),
  attachment: Yup.string().required("Attachment is required"),
  description: Yup.string().required("Description is required"),
});

function MarkAsComplete(props) {
  const { isOpenModal, setIsOpenModal, selected } = props;
  const cancelButtonRef = useRef(null);
  const Navigate = useNavigate();
  const { Upload, upload } = useUpload();
  const { MarkAsCompleted, completed, setCompleted } = useMarkAsCompleted();

  const initialValues = {
    project_id: selected?.id,
    attachment: upload.url,
    description: "",
  };

  const { values, errors, handleChange, handleSubmit, touched } = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      MarkAsCompleted({
        project_id: values.project_id,
        file: values.attachment,
        description: values.description,
      });
    },
  });

  const handleClose = () => {
    setIsOpenModal(false);
    setCompleted((prevState) => ({
      ...prevState,
      loading: false,
      data: null,
      error: null,
      success: false,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      Upload({ image: file });
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      Upload({ image: file });
    }
  };
  const handleDragOver = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <Transition.Root show={isOpenModal} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-[99]"
          initialFocus={cancelButtonRef}
          onClose={handleClose}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-[#02174C33] transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-center justify-center md:px-[5%] md:py-[2%] p-2">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel
                  className={`relative transform overflow-hidden rounded-[16px] bg-white text-left shadow-xl transition-all  ${
                    completed.success
                      ? "w-[600px] h-auto md:py-12 md:px-6 px-5 py-8"
                      : "w-full h-auto md:py-12 md:px-6 px-5 py-8"
                  }`}
                >
                  <div
                    onClick={handleClose}
                    className="absolute top-[15px] right-[15px] cursor-pointer rounded border border-[#02174C33] hover:border-primary hover:text-primary w-[30px] h-[30px] flex justify-center items-center"
                  >
                    <AiOutlineClose className="text-[22px]" />
                  </div>
                  <div className="flex flex-col">
                    {!completed.success && (
                      <form onSubmit={handleSubmit} className="w-full">
                        <h1 className="font-[600] md:text-[30px] text-[24px] text-secondary">
                          Submit Task
                        </h1>
                        <div className="mt-2">
                          {upload.loading ? (
                            <div className="w-full h-[200px] rounded-lg border border-dotted border-[#02174C33] flex flex-col justify-center items-center cursor-pointer">
                              <ButtonLoader2 />
                            </div>
                          ) : (
                            <label
                              onDrop={handleDrop}
                              onDragOver={handleDragOver}
                              className="w-full h-[200px] rounded-lg border border-dotted border-[#02174C33] text-secondary hover:border-primary cursor-pointer flex flex-col justify-center items-center"
                            >
                              <input
                                type="file"
                                className="hidden"
                                onChange={handleFileChange}
                              />
                              <span className="text-primary">Upload or</span>
                              just drag & drop
                            </label>
                          )}
                          {upload.url && (
                            <p className="text-secondary text-xs mt-1">
                              {getFileNameFromMediaUrl(upload.url)}
                            </p>
                          )}
                          {errors.attachment && touched.attachment && (
                            <p className="text-red-700 text-xs mt-1">
                              {errors.attachment}
                            </p>
                          )}
                        </div>

                        <div className="md:mt-4 mt-2">
                          <label className="text-[16px] text-[#222222] font-[600]">
                            Description
                          </label>
                          <textarea
                            placeholder="Description"
                            rows="4"
                            className="mt-2 w-full min-h-[150px] max-h-[150px]  p-3 rounded-[4px] bg-transparent border border-[#02174C33] outline-none hover:border-secondary focus:border-secondary"
                            name="description"
                            value={values.description}
                            onChange={handleChange}
                          ></textarea>
                          {errors.description && touched.description && (
                            <p className="text-red-700 text-xs mt-1">
                              {errors.description}
                            </p>
                          )}
                        </div>

                        <div className="w-full flex justify-end">
                          <button
                            className="button-2 border border-secondary bg-secondary cursor-pointer w-[120px] h-[40px] text-white rounded flex justify-center items-center"
                            type="submit"
                            disabled={completed.loading}
                          >
                            {completed.loading ? <ButtonLoader1 /> : "Submit"}
                          </button>
                        </div>
                      </form>
                    )}
                    {completed.success && (
                      <div className="flex flex-col justify-center items-center w-full">
                        <img src="/assets/icons/icon-2.png" alt="" />
                        <h1 className="font-[600] text-[32px] text-secondary">
                          Your task successfully submitted!
                        </h1>
                        <p className="font-[500] text-[16px] text-[#6F7487] text-center">
                          Thank you for submitting your task.
                        </p>
                        <button
                          onClick={() => {
                            Navigate("/find-jobs");
                            setIsOpenModal(false);
                          }}
                          className="button-2 bg-primary cursor-pointer w-[150px] h-[40px] text-secondary rounded mt-6 flex justify-center items-center"
                        >
                          Go Other Jobs
                        </button>
                      </div>
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}

export default MarkAsComplete;
