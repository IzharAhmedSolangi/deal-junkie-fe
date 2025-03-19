import React, { useState, useEffect } from "react";
import { BsChevronUp } from "react-icons/bs";

function ScrollToTopButton() {
  const [backToTop, setBackToTop] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 200) {
        setBackToTop(true);
      } else {
        setBackToTop(false);
      }
    });
  }, []);
  const scrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };
  return (
    <>
      {backToTop && (
        <div className="scrollBtn" onClick={scrollUp} data-aos="fade-up">
          <BsChevronUp className="icon" />
        </div>
      )}
    </>
  );
}

export default ScrollToTopButton;
