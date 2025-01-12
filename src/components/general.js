import { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { MyContext } from "../App";

function DropDown(props) {
  return (
    <div className="dropdown-list" ref={props.ref}>
      {props.default && props.children}
      {props.hasSection && (
        <section className="dropdown-section">{props.children}</section>
      )}
    </div>
  );
}

function Icon(props) {
  return <i className={props.class}></i>;
}

function DropDownListItem(props) {
  return (
    <Link
      title={props.title}
      onClick={props.onClick}
      to={props.path}
      className={`list-item ${props.class}`}
    >
      {props.children}
    </Link>
  );
}

function InputContainer(props) {
  const { handleSubmit } = useContext(MyContext);

  useEffect(() => {
    const handleKeydown = (event) => {
      if (window.innerWidth < 800) return;
      if (event.ctrlKey && event.key === "k") {
        event.preventDefault();
        props.inputRef.current.focus();
      }
    };

    document.addEventListener("keydown", handleKeydown);

    return () => {
      document.removeEventListener("keydown", handleKeydown);
    };
  }, []);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(props.input);
        props.setInput("");
      }}
      className={
        props.hasDropDown ? `input-container dropdown-item` : `input-container`
      }
      data-show="false"
    >
      <Icon class="fa-solid fa-magnifying-glass search-icon" />
      <input
        ref={props.inputRef}
        value={props.input}
        onChange={(e) => props.setInput(e.target.value)}
        id={props.id}
        className="input-field"
        type="text"
        placeholder="Search photos and illustrations (Ctrl + K)"
      />
      {props.children}

      {(props.input || "").trim() && (
        <i onClick={props.clearChange} className="fa-solid fa-xmark" />
      )}
    </form>
  );
}

function General() {
  return (
    <header>
      <div className="logo">
        <h1>Soundscape</h1>
      </div>
    </header>
  );
}

// Export all as memoized components
export { InputContainer, DropDown, DropDownListItem, Icon };
