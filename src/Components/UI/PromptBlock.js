import React from "react";

const PromptBlock = ({ block, index, handleRemovePromptBlock, promptBlocks, setPromptBlocks, handleGenText, loading, setLoading }) => {
  const handleTextChange = (e) => {
    const updatedBlocks = [...promptBlocks];
    updatedBlocks[index].textValue = e.target.value;
    setPromptBlocks(updatedBlocks);
  };

  return (
    <div key={index} className="prompt-block">
      <div className="prompt-header">
        {block.label}
        <button className="remove-button" onClick={() => handleRemovePromptBlock(index)}>
          &#10006;
        </button>
      </div>
      <div className="prompt-item">
        <textarea value={block.textValue} onChange={handleTextChange} />
        <div className="green-button-container">
          <span className="green-button button-small">
            <button onClick={() => handleGenText(setLoading, setPromptBlocks, index)} disabled={loading}>
              {loading ? "Loading..." : "Generate"}
            </button>
          </span>
        </div>
      </div>
    </div>
  );
};

export default PromptBlock;
