import React, { useState } from "react";
import "./BobitContentGenerator.css";
import tagValues from "./tagValues.json";
import Header from "./UI/Header";
import TagSelection from "./UI/TagSelection";
import GenButton from "./UI/GenerateButton";
import PromptTypes from "./Data/PromptTypes.json";
import PromptStyles from "./Data/PromptStyles.json";
import PromptBlock from "./UI/PromptBlock";
import Modal from "./UI/Modal";
import {
  handleAddTag,
  handleRandomTag,
  handleRemoveTag,
  handleCustomTagChange,
  handleCustomTagAdd,
  handleCopyAll,
  handleGenText,
} from "./BobitContentGeneratorHandlers";

const BobitContentGenerator = () => {
  const [loading, setLoading] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);
  const [promptBlocks, setPromptBlocks] = useState([  ]);
  const [customTag, setCustomTag] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalIndex, setModalIndex] = useState(null);
  const [selectedStyles, setSelectedStyles] = useState([]);
  const [additionalText, setAdditionalText] = useState("");
  const [finalPrompt, setFinalPrompt] = useState("");
  const [modalPage, setModalPage] = useState(1);
  const [newBlockName, setNewBlockName] = useState("");
  const [newBlockOutput, setNewBlockOutput] = useState("");
  const [newBlockInput, setNewBlockInput] = useState("");
  const [newBlockText, setNewBlockText] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedAddValue, setSelectedAddValue] = useState("");
  const [currentSection, setCurrentSection] = useState("New Document");
  
  const handleCheckboxChange = (index, isChecked) => {
    setPromptBlocks((prevBlocks) =>
      prevBlocks.map((block, idx) => (idx === index ? { ...block, isChecked } : block))
    );
  };

  const handleAddButtonClick = (selectedValue) => {
    const newItem = {
      textValue: "",
      label: selectedValue,
      promptData_tags: [],
      promptData_texts: [],
      promptConnector_output:
        PromptTypes.find((value) => value.label === selectedValue)?.promptConnector_output || "",
        promptConnector_input:
          PromptTypes.find((value) => value.label === selectedValue)?.promptConnector_input || "",
      promptConnector_styles: [],
    };
    setPromptBlocks((prevBlocks) => [...prevBlocks, newItem]);
    setIsAddModalOpen(false);
  };
  
  const handleAddModalCancel = () => {
    setIsAddModalOpen(false);
  };

  const handleAddModalOpen = () => {
    setModalPage(1);
    setIsAddModalOpen(true);
  };

  const handleAddModalClose = () => {
    setModalPage(1);
    setIsAddModalOpen(false);
  };

  const handleRemovePromptBlock = (index) => {
    setPromptBlocks((prevBlocks) => prevBlocks.filter((_, i) => i !== index));
  };

  const handleModalOpen = (index) => {
    setModalIsOpen(true);
    setModalIndex(index);
    setModalPage(1);
  };

  const handleModalClose = () => {
    setModalIsOpen(false);
    setModalIndex(null);
    setModalPage(1);
  };

  const handleAddNewBlock = () => {
    const newBlock = {
      textValue: newBlockText,
      label: newBlockName,
      promptData_tags: [],
      promptData_texts: [],
      promptConnector_output: newBlockOutput,
      promptConnector_input: newBlockInput,
      promptConnector_styles: [],
    };
    setPromptBlocks((prevBlocks) => [...prevBlocks, newBlock]);
    setNewBlockName("");
    setNewBlockOutput("");
    setNewBlockText("");
    setIsAddModalOpen(false);
  };

  return (
    <div className="bobit-content-generator">
    <Header onMenuItemClick={setCurrentSection} />


    {currentSection === "New Document" && (
        <>

      {promptBlocks.map((block, index) => (
        <div key={index} className="prompt-block">
          <div className="prompt-header">
            {block.label}
            <button className="remove-button" onClick={() => handleRemovePromptBlock(index)}>
              &#10006;
            </button>
          </div>
          <div className="prompt-item">
            <textarea
              value={block.textValue}
              onChange={(e) => {
                const updatedBlocks = [...promptBlocks];
                updatedBlocks[index].textValue = e.target.value;
                setPromptBlocks(updatedBlocks);
              }}
            />
            {block.promptConnector_output && (
              <div className="green-button-container">
                <span className="green-button button-small">
                  <button
                    onClick={() => handleModalOpen(index)}
                    disabled={loading}
                  >
                    {loading ? "Loading..." : "Generate"}
                  </button>
                </span>
              </div>
            )}
          </div>
        </div>
      ))}

<Modal isOpen={modalIsOpen} onRequestClose={handleModalClose}>
    {modalPage === 1 && modalIndex !== null ? (
        <div className="modal-content">
        <h4>Choose which prompts to send for {promptBlocks[modalIndex].label}:</h4>
        {promptBlocks.map((block, index) => (
          <div key={index}>
            <input
              type="checkbox"
              id={`checkbox-${index}`}
              name={`checkbox-${index}`}
              checked={block.isChecked}
              onChange={(e) => handleCheckboxChange(index, e.target.checked)}
            />
            <label htmlFor={`checkbox-${index}`}>{block.label}</label>
          </div>
        ))}
        <label htmlFor="styles">Choose styles (hold ctrl for multi):</label>
        <select
          id="styles"
          multiple
          onChange={(e) => {
            const selectedOptions = Array.from(e.target.options)
              .filter((option) => option.selected)
              .map((option) => option.value);
            setSelectedStyles(selectedOptions);
          }}
        >
          {PromptStyles.map((style, index) => (
            <option key={index} value={style.value}>
              {style.label}
            </option>
          ))}
        </select>
        <label htmlFor="additional-text">Additional Text:</label>
        <textarea
          id="additional-text"
          value={additionalText}
          onChange={(e) => setAdditionalText(e.target.value)}
        />
        <div>{finalPrompt}</div>
        
        <div>
        <button onClick={() => {
          const currentBlock = {...promptBlocks[modalIndex]};
          currentBlock.promptData_tags = selectedTags;
          currentBlock.promptConnector_inputs = promptBlocks
            .filter(block => block.isChecked)
            .map(block => block.promptConnector_input || "");
            currentBlock.promptData_texts = promptBlocks
              .filter(block => block.isChecked)
              .map(block => block.textValue);
          if (additionalText) {
            currentBlock.promptData_texts.push(additionalText);
          }
          currentBlock.promptConnector_styles = selectedStyles.map(style => ({label: style, value: style}));

          handleGenText(setLoading, setPromptBlocks, modalIndex, currentBlock);
          handleModalClose();
      }}>Generate</button>


          <button onClick={handleModalClose}>Cancel</button>
        </div>
      </div>
    ) : null}
  </Modal>


      <div className="controls">
        <button onClick={handleAddModalOpen}>Add</button>
        {/* <button onClick={handleCopyAll}>Copy All</button>
        <button onClick={() => handleGenText(setLoading, setPromptBlocks, modalIndex)}>Generate All</button> */}
      </div>

      <Modal isOpen={isAddModalOpen} onRequestClose={handleAddModalCancel}>
       
      {modalPage === 1 ? (
            <div className="modal-content">
              Prompt Types:
              <select className="modal-select" value={selectedAddValue} onChange={(e) => setSelectedAddValue(e.target.value)}>
                {PromptTypes.map((value, index) => (
                  <option key={index} value={value.label}>
                    {value.label}
                  </option>
                ))}
              </select>
              <div className="modal-buttons">
                <button className="modal-confirm-button" onClick={() => handleAddButtonClick(selectedAddValue)}>Confirm</button>
                <button className="modal-custom-button" onClick={() => setModalPage(2)}>Custom</button>
                <button className="modal-cancel-button" onClick={handleAddModalClose}>Cancel</button>
              </div>
            </div>
          ) : (
            <div className="modal-content">
              <label htmlFor="new-block-name">Name:</label>
              <input
                id="new-block-name"
                value={newBlockName}
                onChange={(e) => setNewBlockName(e.target.value)}
              />
              <label htmlFor="new-block-output">Prompt Connector Output:</label>
              <textarea
                id="new-block-output"
                value={newBlockOutput}
                onChange={(e) => setNewBlockOutput(e.target.value)}
              />
              <label htmlFor="new-block-input">Prompt Connector Input:</label>
              <textarea
                id="new-block-input"
                value={newBlockText}
                onChange={(e) => setNewBlockText(e.target.value)}
              />
              <div>
                <button onClick={handleAddNewBlock}>Add</button>
                <button onClick={() => setModalPage(1)}>Back</button>
              </div>
            </div>
          )}
      </Modal>
      </>
      )}
      {currentSection === "History" && (
        <div>History Section Placeholder</div>
      )}
      {currentSection === "Prompt Connectors" && (
        <div>Prompt Connectors Section Placeholder</div>
      )}
    </div>



  );
};

export default BobitContentGenerator;
