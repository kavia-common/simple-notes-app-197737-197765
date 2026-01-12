import React, { useEffect, useState } from "react";

/**
 * Note editor form. Uses internal state to allow responsive input typing while
 * syncing changes upward.
 */
// PUBLIC_INTERFACE
export default function NoteForm({ note, onChange }) {
  const [title, setTitle] = useState(note.title ?? "");
  const [body, setBody] = useState(note.body ?? "");

  // When switching notes, update editor fields.
  useEffect(() => {
    setTitle(note.title ?? "");
    setBody(note.body ?? "");
  }, [note.id]); // eslint-disable-line react-hooks/exhaustive-deps

  // Push changes upward whenever local state changes.
  useEffect(() => {
    onChange({ title, body });
  }, [title, body, onChange]);

  return (
    <div className="NoteForm">
      <div className="NoteFormRow">
        <label className="Label" htmlFor="note-title">
          Title
        </label>
        <input
          id="note-title"
          className="Input"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Note title"
        />
      </div>

      <div className="NoteFormRow NoteFormRowGrow">
        <label className="Label" htmlFor="note-body">
          Note
        </label>
        <textarea
          id="note-body"
          className="Textarea"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Write something…"
          rows={12}
        />
      </div>
    </div>
  );
}
