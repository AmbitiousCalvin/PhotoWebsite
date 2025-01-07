import React, { useState } from "react";

function DropdownSelect(props: any) {
  const [selectedOption, setSelectedOption] = useState("");

  const handleSelectChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSelectedOption(event.target.value);
    props.handleSubmit(`${props.query} ${event.target.value}`);
  };

  return (
    <div className="dropdown-container">
      <select
        id="trending-select"
        className="btn dropdown-item btn-border btn-square"
        value={selectedOption}
        onChange={handleSelectChange}
      >
        {props.options?.map((option, index) => (
          <option value={option.value} key={index}>
            {option.text}
          </option>
        ))}
      </select>
    </div>
  );
}

export default DropdownSelect;
