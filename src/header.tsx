import { faClosedCaptioning } from "@fortawesome/free-solid-svg-icons";
import { SetStateAction, useEffect, useState, useRef } from "react";
import { InputContainer, DropDown, DropDownListItem, Icon } from "./general";
import "./styles/header.css";

interface HeaderProps {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

function Header({ onSubmit }) {
  // State management
  const [darkMode, setDarkMode] = useState<boolean>(
    JSON.parse(localStorage.getItem("darkMode") || "true")
  );
  const [showInput, setShowInput] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [openNav, setOpenNav] = useState(false);
  const [input, setInput] = useState("");
  const inputRef = useRef(null);

  // Effect for theme handling
  useEffect(() => {
    document.body.className = darkMode ? "dark-theme" : "light-theme";
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  useEffect(() => {
    inputRef.current?.focus();
  }, [isOpen]);

  // Effect for scroll and resize events
  useEffect(() => {
    const handleScroll = () => setShowInput(window.scrollY >= 10);
    const handleResize = () => {
      if (window.innerWidth > 580) setOpenNav(false);
      if (window.innerWidth > 800) setIsOpen(false);
    };

    const shortCuts = {
      k: () => {
        if (window.innerWidth < 800) setIsOpen(true);
      },
      ArrowLeft: () => setIsOpen(false),
      x: () => setInput(""),
    };

    const handleKeydown = (event: {
      ctrlKey: any;
      key: string;
      preventDefault: () => void;
    }) => {
      if (event.ctrlKey) {
        if (event.key in shortCuts) {
          event.preventDefault();
          shortCuts[event.key]();
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    document.addEventListener("keydown", handleKeydown);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("keydown", handleKeydown);
    };
  }, []);

  // Handlers
  const toggleSearchBar = () => setIsOpen((prev) => !prev);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };
  const clearInput = () => setInput("");

  return (
    <header data-show={showInput}>
      {/* Logo Section */}
      <div className="logo">
        <h1>Soundscape</h1>
      </div>

      {/* Search Bar Section */}
      <section
        className={
          isOpen ? "header-middle-section full-view" : "header-middle-section"
        }
      >
        {!openNav && (
          <label className="search-bar-icon" htmlFor="search-bar">
            <li className="icon" onClick={toggleSearchBar}>
              <Icon
                class={
                  isOpen
                    ? "fa-solid fa-angle-left"
                    : "fa-solid fa-magnifying-glass"
                }
              />
            </li>
          </label>
        )}

        <InputContainer
          inputRef={inputRef}
          onSubmit={onSubmit}
          input={input}
          setInput={setInput}
          clearChange={clearInput}
          handleChange={handleInputChange}
          hasDropDown={false}
          id="search-bar"
        >
          <DropDown hasSection={true} default={false}>
            <div className="title-container">
              <h2>Recent Searches</h2>
              <div className="btn">Clear</div>
            </div>

            <div className="flex-container">
              {[
                "Health And Wellness",
                "Photo",
                "Wallpaper",
                "USA",
                "Lorem",
              ].map((text, index) => (
                <div key={index} className="btn btn-border btn-square">
                  {text}
                  <i className="fa-solid fa-magnifying-glass"></i>
                </div>
              ))}
            </div>
          </DropDown>
        </InputContainer>
      </section>

      {/* Navigation Section */}
      <section className={`header-right-section ${openNav ? "showMenu" : ""}`}>
        <li onClick={() => setOpenNav(!openNav)} className="icon nav-menu-icon">
          <Icon class={!openNav ? "fas fa-bars" : "fa-solid fa-xmark"} />
        </li>

        <div className="sidebar-menu-container">
          <div className="flex-container">
            <li
              className="btn toggle-theme-btn"
              onClick={() => setDarkMode(!darkMode)}
            >
              <Icon
                class={
                  darkMode ? "fa-solid fa-sun" : "fa-solid fa-star-and-crescent"
                }
              />
              {darkMode ? "Light" : "Dark"}
            </li>

            {[
              { icon: "fa-solid fa-globe", text: "Discover Photos" },
              { icon: "fa-regular fa-circle-play", text: "Free Videos" },
              {
                icon: "fa-solid fa-window-restore",
                text: "Soundsplash Blog",
              },
              { icon: "fa-solid fa-circle-user", text: "Guest" },
              { icon: "fa-solid fa-gear", text: "Settings" },
            ].map((item, index) => (
              <div key={index} className="btn btn-square">
                <Icon class={item.icon} />
                {item.text}
              </div>
            ))}
          </div>

          <div className="social-container">
            {[
              { icon: "fa-brands fa-facebook", link: "https://facebook.com" },
              { icon: "fa-brands fa-twitter", link: "https://twitter.com" },
              { icon: "fa-brands fa-instagram", link: "https://instagram.com" },
              { icon: "fa-brands fa-linkedin", link: "https://linkedin.com" },
            ].map((social, index) => (
              <a
                key={index}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                className="icon social-link"
              >
                <Icon class={social.icon} />
              </a>
            ))}
          </div>

          <div className="copyright-text">
            &copy; {new Date().getFullYear()} Soundscape All rights reserved.
          </div>
        </div>

        <nav>
          <ul>
            {/* Explore Dropdown */}
            <li className="btn dropdown-item explore-btn">
              Explore
              <Icon class="fa-solid fa-angle-right" />
              <DropDown hasSection={false} default={true}>
                {[
                  { icon: "fa-solid fa-globe", text: "Discover Photos" },
                  { icon: "fa-regular fa-circle-play", text: "Free Videos" },
                  {
                    icon: "fa-solid fa-window-restore",
                    text: "Soundsplash Blog",
                  },
                ].map((item, index) => (
                  <DropDownListItem key={index}>
                    <Icon class={item.icon} />
                    {item.text}
                  </DropDownListItem>
                ))}
              </DropDown>
            </li>

            {/* Dark Mode Button */}
            <li
              className="btn toggle-theme-btn"
              onClick={() => setDarkMode(!darkMode)}
            >
              <Icon
                class={
                  darkMode ? "fa-solid fa-sun" : "fa-solid fa-star-and-crescent"
                }
              />
              {darkMode ? "Light" : "Dark"}
            </li>

            {/* More Options Dropdown */}
            <li className="icon btn dropdown-item">
              <Icon class="fa-solid fa-ellipsis" />
              <DropDown default={true} hasSection={false}>
                {[
                  { icon: "fa-solid fa-circle-user", text: "Guest" },
                  { icon: "fa-solid fa-gear", text: "Settings" },
                ].map((item, index) => (
                  <DropDownListItem key={index}>
                    <Icon class={item.icon} />
                    {item.text}
                  </DropDownListItem>
                ))}
              </DropDown>
            </li>

            {/* Join Button */}
            <li className="btn btn-white dropdown-item">Join</li>
          </ul>
        </nav>
      </section>
    </header>
  );
}

export { Header };
