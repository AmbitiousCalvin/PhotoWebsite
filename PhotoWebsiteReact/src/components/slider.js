import { Icon } from "./general";
import "../styles/slider.css";
import { useContext, useState, useEffect, useRef } from "react";
import { MyContext } from "../App";

function Slider(props) {
  const { handleSubmit } = useContext(MyContext);

  const sliderRef = useRef();
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);
  const firstInputRef = useRef(null);

  // Automatically check the first input on render
  useEffect(() => {
    if (firstInputRef.current) {
      firstInputRef.current.checked = true;
    }
  }, []);

  const updateButtonVisibility = () => {
    const slider = sliderRef.current;
    if (!slider) return;

    const scrollableWidth = slider.scrollWidth - slider.clientWidth;
    setIsAtStart(slider.scrollLeft <= 0);
    setIsAtEnd(slider.scrollLeft >= scrollableWidth - 1);
  };

  const scrollLeft = () => {
    const slider = sliderRef.current;
    if (!slider) return;
    const scrollAmount = slider.clientWidth / 1.25;
    slider.scrollBy({ left: -scrollAmount, behavior: "smooth" });
  };

  const scrollRight = () => {
    const slider = sliderRef.current;
    if (!slider) return;
    const scrollAmount = slider.clientWidth / 1.25;
    slider.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  useEffect(() => {
    const handleResize = () => {
      updateButtonVisibility();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize); // Cleanup
  }, []);

  return (
    <div className="slider-container">
      {!isAtStart && (
        <button
          className="icon slider-button left"
          id="left"
          onClick={scrollLeft}
        >
          <Icon class="fa-solid fa-chevron-left" />
        </button>
      )}

      <div
        className="slider-content"
        ref={sliderRef}
        onScroll={updateButtonVisibility}
      >
        {props.slider_items.map((item, index) => (
          <label
            key={index}
            onClick={() => handleSubmit(item.text)}
            htmlFor={`slider-item-${index}`}
            className="btn btn-border btn-square slider-item"
          >
            {item.text}
            <input
              ref={index === 0 ? firstInputRef : null}
              id={`slider-item-${index}`}
              type="radio"
              name="same-raido-btn"
              className="slider-radio"
              style={{ display: "none" }}
            />
          </label>
        ))}
      </div>

      {!isAtEnd && (
        <button
          className="icon slider-button right"
          id="right"
          onClick={scrollRight}
        >
          <Icon class="fa-solid fa-chevron-right" />
        </button>
      )}
    </div>
  );
}

export { Slider };
