import { useEffect, useState, useRef, useContext, memo } from "react";
import { InputContainer, DropDown, DropDownListItem, Icon } from "./general";
import { Link } from "react-router-dom";
import "../styles/header.css";
import { MyContext } from "../App";

const popularPhotoQueries = [
  "Nature",
  "Travel",
  "Adventure",
  "Food",
  "Music",
  "Art",
  "Love",
  "Beauty",
  "Sports",
  "Fitness",
  "Technology",
  "Fashion",
  "Animals",
  "Architecture",
  "Landscape",
  "Nightlife",
  "Events",
  "Holidays",
  "Lifestyle",
  "Science",
  "History",
  "Family",
  "Culture",
  "People",
  "Urban",
];

function Header() {
  const { setIsLoading, handleSubmit, query } = useContext(MyContext);
  const [darkMode, setDarkMode] = useState(
    JSON.parse(localStorage.getItem("darkMode") || "true")
  );
  const [isOpen, setIsOpen] = useState(false);
  const [openNav, setOpenNav] = useState(false);
  const [input, setInput] = useState("");
  const inputRef = useRef(null);

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

    const handleKeydown = (event) => {
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
  const handleInputChange = (e) => {
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
          input={input}
          setInput={setInput}
          clearChange={clearInput}
          handleChange={handleInputChange}
          hasDropDown={false}
          id="search-bar"
        ></InputContainer>
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
              {
                icon: "fa-solid fa-globe",
                text: "Discover Photos",
                path: "/photos",

                onClick: () => {
                  const randomQuery = Math.floor(
                    Math.random() * popularPhotoQueries.length
                  );
                  setOpenNav(false);
                  handleSubmit(popularPhotoQueries[randomQuery]);
                },
              },
              {
                icon: "fa-regular fa-circle-play",
                text: "Free Videos",
                isTitle: "true",
                path: "/video",
                onClick: () => {
                  const randomQuery = Math.floor(
                    Math.random() * popularPhotoQueries.length
                  );
                  setOpenNav(false);
                  handleSubmit(popularPhotoQueries[randomQuery]);
                },
              },
              {
                icon: "fa-solid fa-window-restore",
                isTitle: "true",
                text: "Soundscape Blog",
                isTitle: "true",

                onClick: () => {
                  alert(
                    "This would take you to the Blog Page but it's still work in progress"
                  );
                },
              },
              {
                icon: "fa-solid fa-gear",
                text: "Settings",
                isTitle: "true",
                onClick: () => {
                  alert(
                    "This would take you to the Blog Page but it's still work in progress"
                  );
                },
              },
            ].map((item, index) => (
              <Link
                onClick={item.onClick}
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
              {
                icon: "fa-brands fa-facebook",
                link: "https://facebook.com",
                active: false,
                onClick: () =>
                  alert(
                    "This would bring you to My Facebook Page Which doesn't exist yet"
                  ),
              },
              {
                icon: "fa-brands fa-twitter",
                link: "https://twitter.com",
                active: false,
                onClick: () =>
                  alert(
                    "This would bring you to My Twitter Page Which doesn't exist yet"
                  ),
              },
              {
                icon: "fa-brands fa-linkedin",
                link: "https://instagram.com",
                active: false,
                onClick: () =>
                  alert(
                    "This would bring you to My Linkedin Page Which doesn't exist yet"
                  ),
              },
              {
                icon: "fa-brands fa-github",
                link: "https://github.com/AmbitiousCalvin",
                active: true,
              },
            ].map((social, index) => (
              <a
                onClick={social.onClick}
                key={index}
                href={social.active ? social.link : "/"}
                target={social.active ? "_blank" : "_parent"}
                rel="noopener noreferrer"
                className="icon social-link"
              >
                <Icon class={social.icon} />
              </a>
            ))}
          </div>

          <div className="copyright-text">
            &copy; {new Date().getFullYear()} Soundscape All rights reserved.
            Project Owwer: CalvinTaw
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
                    path: "/photos",
                    onClick: () => {
                      const randomQuery = Math.floor(
                        Math.random() * popularPhotoQueries.length
                      );
                      handleSubmit(popularPhotoQueries[randomQuery]);
                    },
                  },
                  {
                    icon: "fa-regular fa-circle-play",
                    text: "Free Videos",
                    path: "/video",
                    onClick: () => {
                      const randomQuery = Math.floor(
                        Math.random() * popularPhotoQueries.length
                      );
                      handleSubmit(popularPhotoQueries[randomQuery]);
                    },
                  },
                  {
                    icon: "fa-solid fa-window-restore",
                    text: "Soundscape Blog",
                    title: "Work in progress",
                    onClick: () => {
                      alert(
                        "This would take you to the Blog Page but it's still work in progress"
                      );
                    },
                  },
                ].map((item, index) => (
                  <DropDownListItem
                    title={item.title}
                    key={index}
                    path={item.path && item.path}
                    onClick={item.onClick}
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
            <li
              onClick={() => {
                alert(
                  "This would take you to the Settings Page but it's still work in progress"
                );
              }}
              title={"Work in progress"}
              className="icon btn dropdown-item"
            >
              <Icon class="fa-solid fa-gear" />
            </li>

            {/* Join Button */}
            <li
              onClick={() => {
                alert(
                  "This would take you to the Login/Sign up Page but it's still work in progress"
                );
              }}
              className="btn btn-white dropdown-item"
            >
              Join
            </li>
          </ul>
        </nav>
      </section>
    </header>
  );
}

const MemoizedHeader = memo(Header);

export { MemoizedHeader as Header };
