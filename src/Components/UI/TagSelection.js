import React from "react";

const TagSelection = ({ tagValues, customTag, selectedTags, handleAddTag, handleCustomTagChange, handleCustomTagAdd, handleRemoveTag, handleRandomTag }) => {
  return (
    <div className="tag-selection">
      <select value={""} onChange={handleAddTag}>
        <option value="">Select a tag</option>
        {tagValues.map((tagValue, index) => (
          <option key={index} value={tagValue}>
            {tagValue}
          </option>
        ))}
      </select>
<br></br>
<br></br>
      <div className="custom-tag-input">
        <input type="text" value={customTag} onChange={handleCustomTagChange} placeholder="Enter a tag" />
        <span className="green-button button-small">
          <button onClick={handleCustomTagAdd}>Add</button>
        </span>
      </div>

      <span className="green-button button-small">
        <button onClick={handleRandomTag}>Add Random Tag</button>
      </span>

      <div className="selected-tags">
        <h4>Selected Tags:</h4>
        {selectedTags.map((tag, index) => (
          <div key={index} className="tag">
            {tag}
            <span className="remove-tag" onClick={() => handleRemoveTag(tag)}>
              X
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TagSelection;
