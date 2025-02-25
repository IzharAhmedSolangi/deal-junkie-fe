/* eslint-disable react/prop-types */
function ShowMessage(props) {
  const { image, title, description } = props;
  return (
    <div className="w-full h-full  flex flex-col justify-center items-center">
      <img src={image} alt="" className="mb-3" />
      <h1 className="font-[600] text-[16px] text-[#101828] md:w-[50%] w-full text-center">
        {title}
      </h1>
      <p className="font-[400] text-[15px] text-[#475467] md:w-[70%] w-full text-center">
        {description}
      </p>
    </div>
  );
}

export default ShowMessage;
