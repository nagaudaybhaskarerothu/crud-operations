import React, { useState } from "react";
import "./App.css";

function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editId, setEditId] = useState(null);

  const addNote = () => {
    if (title.trim() === "" || description.trim() === "") {
      alert("Please fill all fields");
      return;
    }

    const newNote = {
      id: Date.now(),
      title: title.trim(),
      description: description.trim(),
    };

    setNotes([...notes, newNote]);
    setTitle("");
    setDescription("");
  };

  const deleteNote = (id) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);

    if (editId === id) {
      cancelEdit();
    }
  };

  const editNote = (note) => {
    setTitle(note.title);
    setDescription(note.description);
    setEditId(note.id);
  };

  const updateNote = () => {
    if (title.trim() === "" || description.trim() === "") {
      alert("Please fill all fields");
      return;
    }

    const updatedNotes = notes.map((note) => {
      if (note.id === editId) {
        return {
          ...note,
          title: title.trim(),
          description: description.trim(),
        };
      }

      return note;
    });

    setNotes(updatedNotes);
    cancelEdit();
  };

  const cancelEdit = () => {
    setTitle("");
    setDescription("");
    setEditId(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editId === null) {
      addNote();
    } else {
      updateNote();
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="logo">📝</div>
        <h1>Notes App</h1>
        <p>Capture your thoughts, one note at a time.</p>
      </header>

      <main className="main-content">
        <section className="note-form-card">
          <h2>{editId === null ? "Create a Note" : "Edit Your Note"}</h2>

          <form onSubmit={handleSubmit}>
            <label htmlFor="title">Note Title</label>
            <input
              id="title"
              type="text"
              placeholder="Enter your note title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              placeholder="Write your thoughts here..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="5"
            />

            <div className="form-buttons">
              <button className="primary-btn" type="submit">
                {editId === null ? "+ Add Note" : "✓ Update Note"}
              </button>

              {editId !== null && (
                <button
                  className="cancel-btn"
                  type="button"
                  onClick={cancelEdit}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </section>

        <section className="notes-section">
          <div className="notes-heading">
            <h2>My Notes</h2>
            <span className="notes-count">{notes.length} notes</span>
          </div>

          {notes.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📒</div>
              <h3>No notes yet</h3>
              <p>Create your first note using the form above.</p>
            </div>
          ) : (
            <div className="notes-grid">
              {notes.map((note) => (
                <article className="note-card" key={note.id}>
                  <h3>{note.title}</h3>
                  <p className="note-description">{note.description}</p>

                  <div className="note-actions">
                    <button
                      className="edit-btn"
                      type="button"
                      onClick={() => editNote(note)}
                    >
                      ✏️ Edit
                    </button>

                    <button
                      className="delete-btn"
                      type="button"
                      onClick={() => deleteNote(note.id)}
                    >
                      🗑 Delete
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>

      <footer className="app-footer">
        Made with React ⚛️ -- Bhaskar
      </footer>
    </div>
  );
}

export default App;