import React from "react";

function formatDate(ts) {
  try {
    return new Date(ts).toLocaleString([], {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return "";
  }
}

function snippet(text, maxLen) {
  const cleaned = (text ?? "").replace(/\s+/g, " ").trim();
  if (cleaned.length <= maxLen) return cleaned;
  return `${cleaned.slice(0, maxLen)}…`;
}

// PUBLIC_INTERFACE
export default function NoteItem({ note, isActive, onSelect, onDelete }) {
  return (
    <div className={`NoteCard ${isActive ? "NoteCardActive" : ""}`}>
      <button
        type="button"
        className="NoteCardMain"
        onClick={onSelect}
        aria-current={isActive ? "true" : "false"}
        aria-label={`Open note: ${note.title}`}
      >
        <div className="NoteCardTitleRow">
          <div className="NoteCardTitle">{note.title}</div>
        </div>

        <div className="NoteCardBody">{snippet(note.body, 90) || "—"}</div>

        <div className="NoteCardMeta">
          <span className="NoteCardDate">{formatDate(note.updatedAt)}</span>
        </div>
      </button>

      <div className="NoteCardActions">
        <button
          type="button"
          className="Btn BtnDanger BtnSmall"
          onClick={onDelete}
          aria-label={`Delete note: ${note.title}`}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
