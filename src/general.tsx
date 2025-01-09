import {
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
  useEffect,
  useRef,
} from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

function DropDown(props: {
  default: any;
  children:
    | string
    | number
    | boolean
    | ReactElement<any, string | JSXElementConstructor<any>>
    | Iterable<ReactNode>
    | ReactPortal
    | null
    | undefined;
  hasSection: any;
}) {
  return (
    <div className="dropdown-list">
      {props.default && props.children}
      {props.hasSection && (
        <section className="dropdown-section">{props.children}</section>
      )}
    </div>
  );
}

function Icon(props: { class: string | undefined }) {
  return <i className={props.class}></i>;
}

function DropDownListItem(props: {
  children:
    | string
    | number
    | boolean
    | ReactElement<any, string | JSXElementConstructor<any>>
    | Iterable<ReactNode>
    | ReactPortal
    | null
    | undefined;
}) {
  return (
    <Link
      onClick={props.onClick}
      to={props.path}
      className={`list-item ${props.class}`}
    >
      {props.children}
    </Link>
  );
}

function InputContainer(props: {
  id: string | undefined;
  hasDropDown: any;
  handleChange: any;
  clearChange: any;
  input: any;
  onSubmit: any;
  setInput: any;
  inputRef: any;
  children:
    | string
    | number
    | boolean
    | ReactElement<any, string | JSXElementConstructor<any>>
    | Iterable<ReactNode>
    | ReactPortal
    | null
    | undefined;
}) {
  useEffect(() => {
    const handleKeydown = (event: {
      ctrlKey: any;
      key: string;
      preventDefault: () => void;
    }) => {
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
        props.onSubmit(props.input);
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
        onChange={props.handleChange}
        id={props.id}
        className="input-field"
        type="text"
        placeholder="Search photos and illustrations (Ctrl + K)"
      />
      {props.children}

      {props.input.trim() && (
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

export { InputContainer, DropDown, DropDownListItem, Icon };
