import React, { useState } from "react";
import { DropDown, DropDownListItem } from "./general";

function DropdownSelect(props) {
  const [selectedOption, setSelectedOption] = useState(props.options[0].text);

  const handleSelectChange = (value, text) => {
    console.log(text);
    setSelectedOption(text);
    props.handleSubmit(props.query, value);
  };

  return (
    <div className="dropdown-container">
      <input
        type={"checkbox"}
        id="checkbox"
        style={{ display: "none" }}
      ></input>

      <label
        id="trending-select"
        htmlFor="checkbox"
        className="btn dropdown-item btn-border btn-square"
      >
        {selectedOption}
        <DropDown default={true}>
          {props.options.map((item, index) => (
            <DropDownListItem
              onClick={() => handleSelectChange(item.value, item.text)}
              class={"btn-border btn-square"}
              key={index}
            >
              {item.text}
            </DropDownListItem>
          ))}
        </DropDown>
      </label>
    </div>
  );
}

export default DropdownSelect;
