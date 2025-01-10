
import { SetStateAction, useEffect, useState, useRef } from "react";
import { InputContainer, DropDown, DropDownListItem, Icon } from "./general";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "../styles/header.css";

interface HeaderProps {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

function Header({ onSubmit }) {
  const [darkMode, setDarkMode] = useState<boolean>(
    JSON.parse(localStorage.getItem("darkMode") || "true")
  );
  const [isOpen, setIsOpen] = useState(false);
  const [openNav, setOpenNav] = useState(false);
  const [input, setInput] = useState("");
  const inputRef = useRef(null);

  // Effect for theme handling

  useEffect(() => {
    const timeout = setTimeout(() => {
      localStorage.setItem("darkMode", JSON.stringify(darkMode));
    }, 100);

    const themeClass = darkMode ? "dark-theme" : "light-theme";
    if (document.body.className !== themeClass) {
      document.body.className = themeClass;
    }

    return () => clearTimeout(timeout);
  }, [darkMode]);

  useEffect(() => {
    inputRef.current?.focus();
  }, [isOpen]);

  // Effect for scroll and resize events
  useEffect(() => {
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

    window.addEventListener("resize", handleResize);
    document.addEventListener("keydown", handleKeydown);

    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("keydown", handleKeydown);
    };
  }, []);

  const toggleSearchBar = () => setIsOpen((prev) => !prev);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };
  const clearInput = () => setInput("");

  return (
    <header>
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
          <label
            title={
              !isOpen ? "Ctrl + K (Shortcut)" : "Ctrl + ArrowLeft (Go Back)"
            }
            className="search-bar-icon"
            htmlFor="search-bar"
          >
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
          {/* <DropDown hasSection={true} default={false}>
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
       */}
        </InputContainer>
      </section>

      {/* Navigation Section */}
      <section className={`header-right-section ${openNav ? "showMenu" : ""}`}>
        <li onClick={() => setOpenNav(!openNav)} className="icon nav-menu-icon">
          <Icon class={!openNav ? "fas fa-bars" : "fa-solid fa-xmark"} />
        </li>

        <div className={`sidebar-menu-container ${openNav ? "showMenu" : ""}`}>
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
              { icon: "fa-solid fa-globe", text: "Discover Photos", path: "/" },
              {
                icon: "fa-regular fa-circle-play",
                text: "Free Videos",
                isTitle: "true",
              },
              {
                icon: "fa-solid fa-window-restore",
                isTitle: "true",
                text: "Soundscape Blog",
                isTitle: "true",
              },
              { icon: "fa-solid fa-gear", text: "Settings", isTitle: "true" },
            ].map((item, index) => (
              <Link
                to={item.path}
                title={item.isTitle && "Work in progress"}
                key={index}
                className="btn btn-square"
              >
                <Icon class={item.icon} />
                {item.text}
              </Link>
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
                  {
                    icon: "fa-solid fa-globe",
                    text: "Discover Photos",
                    path: "/",
                    title: "Work in progress",
                  },
                  {
                    icon: "fa-regular fa-circle-play",
                    text: "Free Videos",
                    title: "Work in progress",
                  },
                  {
                    icon: "fa-solid fa-window-restore",
                    text: "Soundscape Blog",
                    title: "Work in progress",
                  },
                ].map((item, index) => (
                  <DropDownListItem
                    title={item.title}
                    key={index}
                    path={item.path && item.path}
                  >
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
            <li title={"Work in progress"} className="icon btn dropdown-item">
              {/* <Icon class="fa-solid fa-ellipsis" /> */}
              <Icon class="fa-solid fa-gear" />
              {/* <DropDown default={true} hasSection={false}>
                {[{ icon: "fa-solid fa-gear", text: "Settings" }].map(
                  (item, index) => (
                    <DropDownListItem key={index}>
                      <Icon class={item.icon} />
                      {item.text}
                    </DropDownListItem>
                  )
                )}
              </DropDown>
            */}
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
