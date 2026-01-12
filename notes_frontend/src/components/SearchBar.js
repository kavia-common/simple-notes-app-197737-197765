import React from "react";

// PUBLIC_INTERFACE
export default function SearchBar({ query, onChangeQuery, count }) {
  return (
    <div className="SearchBar">
      <label className="SrOnly" htmlFor="notes-search">
        Search notes
      </label>
      <input
        id="notes-search"
        className="Input"
        type="search"
        value={query}
        onChange={(e) => onChangeQuery(e.target.value)}
        placeholder="Search notes…"
        autoComplete="off"
      />
      <div className="SearchMeta" aria-label="Filtered notes count">
        {count} {count === 1 ? "note" : "notes"}
      </div>
    </div>
  );
}
