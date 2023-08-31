import React from "react";

const GenerateButton = ({ loading, handleGenerateAll }) => {
  return (
    <div className="green-button">
      <button onClick={handleGenerateAll} disabled={loading}>
        {loading ? "Loading..." : "Generate"}
      </button>
    </div>
  );
};

export default GenerateButton;