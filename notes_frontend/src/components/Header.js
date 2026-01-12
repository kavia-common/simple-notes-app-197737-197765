import React from "react";

/**
 * Header bar with application title and primary action.
 */
// PUBLIC_INTERFACE
export default function Header({ onCreateNew }) {
  return (
    <header className="Header">
      <div className="HeaderInner">
        <div className="HeaderBrand" aria-label="App title">
          <div className="HeaderMark" aria-hidden="true">
            N
          </div>
          <div className="HeaderTitles">
            <h1 className="HeaderTitle">Notes</h1>
            <p className="HeaderSubtitle">Fast, local, and private</p>
          </div>
        </div>

        <div className="HeaderActions">
          <button className="Btn BtnPrimary" onClick={onCreateNew}>
            New note
          </button>
        </div>
      </div>
    </header>
  );
}
