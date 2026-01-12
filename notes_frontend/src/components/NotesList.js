import React from "react";
import NoteItem from "./NoteItem";

// PUBLIC_INTERFACE
export default function NotesList({
  notes,
  activeNoteId,
  onSelectNote,
  onDeleteNote,
}) {
  if (!notes.length) {
    return (
      <div className="NotesEmpty" role="status" aria-live="polite">
        <p className="NotesEmptyTitle">No notes yet</p>
        <p className="NotesEmptyText">Create a new note to begin.</p>
      </div>
    );
  }

  return (
    <ul className="NotesList" aria-label="Notes">
      {notes.map((note) => (
        <li key={note.id} className="NotesListItem">
          <NoteItem
            note={note}
            isActive={note.id === activeNoteId}
            onSelect={() => onSelectNote(note.id)}
            onDelete={() => onDeleteNote(note.id)}
          />
        </li>
      ))}
    </ul>
  );
}
