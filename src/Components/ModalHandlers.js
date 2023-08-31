import PromptTypes from "./Data/PromptTypes.json";

export const handleAddButtonClick = (selectedValue, setPromptBlocks, setIsAddModalOpen, promptBlocks) => {
  const newItem = {
    textValue: "",
    label: selectedValue,
    promptData_tags: [],
    promptData_texts: [],
    promptConnector_output:
      PromptTypes.find((value) => value.label === selectedValue)?.promptConnector_output || "",
    promptConnector_styles: [],
  };
  setPromptBlocks((prevBlocks) => [...prevBlocks, newItem]);
  setIsAddModalOpen(false);
};

export const handleAddModalCancel = (setIsAddModalOpen, setModalPage) => {
  setIsAddModalOpen(false);
  setModalPage(1);
};

export const handleAddModalOpen = (setModalPage, setIsAddModalOpen) => {
  setModalPage(1);
  setIsAddModalOpen(true);
};

export const handleAddModalClose = (setModalPage, setIsAddModalOpen) => {
  setModalPage(1);
  setIsAddModalOpen(false);
};

export const handleRemovePromptBlock = (index, setPromptBlocks, promptBlocks) => {
  setPromptBlocks((prevBlocks) => prevBlocks.filter((_, i) => i !== index));
};

export const handleModalOpen = (index, setModalIsOpen, setModalIndex, setModalPage) => {
  setModalIsOpen(true);
  setModalIndex(index);
  setModalPage(1);
};

export const handleModalClose = (setModalIsOpen, setModalIndex, setModalPage) => {
  setModalIsOpen(false);
  setModalIndex(null);
  setModalPage(1);
};

export const handleAddNewBlock = (
  setPromptBlocks,
  setIsAddModalOpen,
  promptBlocks,
  newBlockName,
  newBlockOutput,
  newBlockInput,
  setNewBlockName,
  setNewBlockOutput,
  setNewBlockInput,
  setModalPage
) => {
  const newBlock = {
    textValue: newBlockInput,
    label: newBlockName,
    promptData_tags: [],
    promptData_texts: [],
    promptConnector_output: newBlockOutput,
    promptConnector_styles: [],
  };
  setPromptBlocks((prevBlocks) => [...prevBlocks, newBlock]);
  setNewBlockName("");
  setNewBlockOutput("");
  setNewBlockInput("");
  setIsAddModalOpen(false);
  setModalPage(1);
};
