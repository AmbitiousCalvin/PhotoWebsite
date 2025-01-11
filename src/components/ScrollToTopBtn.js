import React, { useState, useEffect } from "react";
import { Icon } from "./general";
import "../styles/scrollBtn.css";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {isVisible && (
        <button
          className="icon scroll-top-btn"
          onClick={scrollToTop}
          aria-label="Scroll to top"
        >
          <Icon class={"fa-solid fa-arrow-up"} />
        </button>
      )}
    </>
  );
};

export { ScrollToTopButton };
