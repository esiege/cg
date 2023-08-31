import React from "react";
import './Header.css';

const Header = ({ onMenuItemClick }) => {
  return (
    <div className="headerRow">
      <div className="logo">BCG</div>
      <div className="logoText">BobitContentGenerator</div>
      <div className="menuItem" onClick={() => onMenuItemClick("New Document")}>New Document</div>
      <div className="menuItem" onClick={() => onMenuItemClick("History")}>History</div>
      <div className="menuItem" onClick={() => onMenuItemClick("Prompt Connectors")}>Prompt Connectors</div>
    </div>
  );
};

export default Header;
