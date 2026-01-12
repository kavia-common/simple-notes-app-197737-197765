import React, { useEffect, useMemo, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import NoteForm from "./components/NoteForm";
import NotesList from "./components/NotesList";
import SearchBar from "./components/SearchBar";

/**
 * LocalStorage key used for persisting notes.
 * Kept constant to avoid breaking existing user data.
 */
const STORAGE_KEY = "notes_frontend.notes.v1";

/**
 * @typedef {Object} Note
 * @property {string} id
 * @property {string} title
 * @property {string} body
 * @property {number} createdAt
 * @property {number} updatedAt
 */

function safeParseJson(value, fallback) {
  try {
    const parsed = JSON.parse(value);
    return parsed ?? fallback;
  } catch {
    return fallback;
  }
}

function generateId() {
  // Simple stable ID suitable for local-only apps (no backend collision concerns).
  return `${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

// PUBLIC_INTERFACE
function App() {
  /** @type {[Note[], Function]} */
  const [notes, setNotes] = useState([]);
  const [activeNoteId, setActiveNoteId] = useState(null);
  const [query, setQuery] = useState("");

  // Load notes from localStorage on initial app start.
  useEffect(() => {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const loaded = raw ? safeParseJson(raw, []) : [];
    if (Array.isArray(loaded)) {
      setNotes(loaded);
      if (loaded.length > 0) setActiveNoteId(loaded[0].id);
    }
  }, []);

  // Save notes to localStorage on every notes change.
  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  }, [notes]);

  const activeNote = useMemo(
    () => notes.find((n) => n.id === activeNoteId) ?? null,
    [notes, activeNoteId]
  );

  const filteredNotes = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = [...notes].sort((a, b) => b.updatedAt - a.updatedAt);

    if (!q) return list;

    return list.filter((n) => {
      return (
        n.title.toLowerCase().includes(q) ||
        n.body.toLowerCase().includes(q)
      );
    });
  }, [notes, query]);

  const handleCreateNew = () => {
    const now = Date.now();
    const newNote = {
      id: generateId(),
      title: "Untitled note",
      body: "",
      createdAt: now,
      updatedAt: now,
    };

    setNotes((prev) => [newNote, ...prev]);
    setActiveNoteId(newNote.id);
  };

  const handleSaveNote = (values) => {
    if (!activeNote) return;

    const now = Date.now();
    setNotes((prev) =>
      prev.map((n) =>
        n.id === activeNote.id
          ? {
              ...n,
              title: values.title.trim() || "Untitled note",
              body: values.body,
              updatedAt: now,
            }
          : n
      )
    );
  };

  const handleSelectNote = (noteId) => {
    setActiveNoteId(noteId);
  };

  const handleDeleteNote = (noteId) => {
    const noteToDelete = notes.find((n) => n.id === noteId);
    const title = noteToDelete?.title ?? "this note";
    const ok = window.confirm(`Delete "${title}"? This cannot be undone.`);
    if (!ok) return;

    setNotes((prev) => prev.filter((n) => n.id !== noteId));

    // Ensure we select another note if the active note was deleted.
    if (noteId === activeNoteId) {
      const remaining = notes.filter((n) => n.id !== noteId);
      setActiveNoteId(remaining[0]?.id ?? null);
    }
  };

  return (
    <div className="App">
      <Header onCreateNew={handleCreateNew} />

      <main className="Main" aria-label="Notes application">
        <section className="Sidebar" aria-label="Notes list">
          <SearchBar
            query={query}
            onChangeQuery={setQuery}
            count={filteredNotes.length}
          />

          <NotesList
            notes={filteredNotes}
            activeNoteId={activeNoteId}
            onSelectNote={handleSelectNote}
            onDeleteNote={handleDeleteNote}
          />
        </section>

        <section className="Editor" aria-label="Note editor">
          {activeNote ? (
            <NoteForm note={activeNote} onChange={handleSaveNote} />
          ) : (
            <div className="EmptyState" role="status" aria-live="polite">
              <h2 className="EmptyStateTitle">No note selected</h2>
              <p className="EmptyStateText">
                Create a new note to get started.
              </p>
              <button className="Btn BtnPrimary" onClick={handleCreateNew}>
                New note
              </button>
            </div>
          )}
        </section>
      </main>

      <footer className="Footer">
        <span className="FooterText">
          Stored locally in your browser (localStorage). No backend.
        </span>
      </footer>
    </div>
  );
}

export default App;
