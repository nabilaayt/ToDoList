import { useState, useContext } from "react";
import { ThemeContext } from "./Context/ThemeContext";
import { NoteContext } from "./Context/NoteContext";
import Note from "./Components/Note";
import ThemeSwitch from "./Components/ThemeSwitch"; 
import "./App.css";

function App() {
  const { theme } = useContext(ThemeContext); // akses value dari ThemeContext
  const themeClass = theme === "light" ? "☀️" : "🌙";

  const [showCard, setShowCard] = useState(false); // state untuk menampilkan card
  const [newText, setNewText] = useState(""); // nilai default string kosong untuk catatan
  const { note, setNote } = useContext(NoteContext); // akses value dari NoteContext

  const renderNote = () => {
    return note?.map((note, index) => <Note text={note.text} date={note.date} id={index}/>);
  };

  // Event Handler Menambah Catatan
  const handleAddNote = () => {
    const newCard = { 
      text: newText,
      date: Date.now() // waktu saat catatan ditambahkan
    };

    setNewText(""); // kosongkan input text, agar bisa menambah catatan baru
    setShowCard(false); // menyembunyikan card input text
    setNote(newCard); // menambah catatan baru ke state note
  };

  return (
    <div className="flex">
      <div className="flex flex-col w-1/6 items-center pt-10 bg-[#F6F5FA] h-screen shadow-md">
        <h1 className="font-cinzel font-semibold text-3xl text-[#6168AD] mb-10">ToList!</h1>

        <div className="">
          <button 
            className="bg-[#6168AD] text-white font-medium rounded-full w-12 h-12 text-2xl flex items-center justify-center hover:opacity-80" 
            onClick={() => setShowCard(!showCard)}>
            +
          </button>
        </div>
      </div>

      <div className="flex-1 p-10 bg-white min-h-screen">
        <h1 className="text-3xl font-semibold mb-2">Tasks</h1>
        <p className="text-gray-600 mb-6">Create your task here</p>
        <div className="">
          {showCard && (
            <div className="mb-6 bg-[#efecfc] p-4 rounded-xl w-full max-w-[300px]">
              <textarea 
                value={newText}
                onChange={(event) => setNewText(event.target.value)}
                cols={30}
                rows={5}
                placeholder="Write your note"
                className="p-2 rounded-md w-full resize-none focus:outline-none"
              />
              <button
                onClick={handleAddNote}
                className="bg-[#6168AD] text-white mt-2 px-4 py-2 rounded-full hover:opacity-80">
                  ✓
              </button>
            </div>
          )}

          <div className="flex flex-wrap gap-4">
            {renderNote()}
          </div>
        </div>
      </div>
      <ThemeSwitch />
    </div>
  );
}

export default App;
