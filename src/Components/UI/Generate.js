import React, { useState } from "react";
import "./Generate.css";

const Generate = ({ show, options, handleConfirm, handleCancel }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleCheckboxChange = (event) => {
    const option = event.target.value;
    if (event.target.checked) {
      setSelectedOptions((prevOptions) => [...prevOptions, option]);
    } else {
      setSelectedOptions((prevOptions) => prevOptions.filter((selectedOption) => selectedOption !== option));
    }
  };

  const handleConfirmClick = () => {
    handleConfirm(selectedOptions);
  };

  const handleCancelClick = () => {
    handleCancel();
  };

  return (
    <div className={`generate-modal ${show ? "show" : ""}`}>
      <div className="generate-modal-content">
        <h2>Select options:</h2>
        <div className="checkbox-list">
          {options.map((option, index) => (
            <label key={index}>
              <input
                type="checkbox"
                value={option.label}
                checked={selectedOptions.includes(option.label)}
                onChange={handleCheckboxChange}
              />
              {option.label}
            </label>
          ))}
        </div>
        <div className="generate-modal-buttons">
          <button onClick={handleConfirmClick}>Confirm</button>
          <button onClick={handleCancelClick}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default Generate;
