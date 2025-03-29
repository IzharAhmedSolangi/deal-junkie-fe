function HowItWorks() {
  return (
    <>
      <div className="w-full grid grid-cols-2 md:pt-10 pt-5 overflow-hidden">
        <div className="w-full h-full" data-aos="fade-right">
          <img
            src="/assets/images/image-1.png"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="bg-secondary w-full h-full" data-aos="fade-left"></div>
      </div>
    </>
  );
}

export default HowItWorks;
