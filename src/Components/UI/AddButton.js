import React, { useState } from "react";
import Modal from "./Modal";
import "./AddButton.css";

const AddButton = ({ handleAddButtonClick, dropdownValues }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");

  const handleModalConfirm = () => {
    setIsModalOpen(false);
    handleAddButtonClick(selectedValue);
  };

  const handleModalCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="add-button-container">
      <button className="add-button" onClick={() => setIsModalOpen(true)}>
        Add
      </button>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleModalCancel}
        contentLabel="Add Button Modal"
      >
        <div className="modal-content">
          Prompt Types:
          <select className="modal-select" value={selectedValue} onChange={(e) => setSelectedValue(e.target.value)}>
            {dropdownValues.map((value, index) => (
              <option key={index} value={value.label}>
                {value.label}
              </option>
            ))}
          </select>
          <div><a href="">Add New...</a></div>
          
          <div className="modal-buttons">
            <button className="modal-confirm-button" onClick={handleModalConfirm}>Confirm</button>
            <button className="modal-cancel-button" onClick={handleModalCancel}>Cancel</button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AddButton;
