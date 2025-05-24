import { useState, useContext } from "react";
import { ThemeContext } from "./Context/ThemeContext";
import { NoteContext } from "./Context/NoteContext";
import Note from "./Components/Note";
import ThemeSwitch from "./Components/ThemeSwitch"; 
import "./App.css";

function App() {
  const { theme } = useContext(ThemeContext); // akses value dari ThemeContext
  const [showCard, setShowCard] = useState(false); // state untuk menampilkan card
  const [newText, setNewText] = useState(""); // nilai default string kosong untuk catatan
  const { note, AddNote } = useContext(NoteContext); // akses value dari NoteContext
  const [sidebarOpen, setSidebarOpen] = useState(false); // State untuk mobile sidebar

  // Fungsi untuk merender/menampilkan semua note yg tersimpan dalam state note
  const renderNote = () => {
    return note.map((noteItem, index) => ( //mengubah array note jadi array komponen <Note/>
      <Note
        key={`note-${index}-${noteItem.date}`} // identifikasi perubahan item dgn key
        text={noteItem.text} // kirim text note ke komponen note
        date={noteItem.date} // kirim date note ke komponen note
        id={index} // kirim id ke komponen note (berdasarkan urutan dalam array)
      />
    ));
  };

  // Event Handler Menambah Catatan
  const handleAddNote = () => {
    
    // Validasi input tidak kosong
    if (!newText.trim()) {
      return;
    }

    try {
      const newCard = {
        text: newText.trim(),
        date: Date.now(),
        id: Math.random().toString(36)
      };
      
      AddNote(newCard);
      setNewText(""); // Mengosongkan input text setelah menambahkan note baru
      setShowCard(false); // Menutup card setelah menambahkan note baru
      setSidebarOpen(false); // Menutup sidebar setelah menambahkan note baru
  
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

return (
    <div className={`flex min-h-screen ${theme === "light" ? "light-theme" : "dark-theme"}`}>

      {/* Hamburger Button */}
      <button
        className={`fixed top-4 left-4 z-50 md:hidden p-2 rounded-lg ${theme === "light" ? "bg-[#7E76B5] text-white" : "bg-[#7E76B5] text-white"}`}
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <i className={`fa-solid ${sidebarOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
      </button>

      {/* Overlay untuk mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed md:relative top-0 left-0 z-40 flex flex-col items-center pt-16 md:pt-10 h-screen w-64 md:w-1/5 lg:w-1/8 transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 ${theme === "light" ? "bg-white" : "bg-[#292A2D]"}`}>
        <h1 className={`font-cinzel-decorative font-semibold text-2xl md:text-3xl mb-6 md:mb-10 px-4 text-center ${theme === "light" ? "text-[#7E76B5]" : "text-white"}`}>
          Tolist
        </h1>
        
        <button 
          className={`${theme === "light" ? "bg-[#7E76B5]" : "bg-[#7E76B5]"} text-white rounded-full w-12 h-12 text-xl flex items-center justify-center hover:opacity-80 transition-opacity mb-4`} 
          onClick={() => setShowCard(!showCard)}
        >
          <i className="fa-solid fa-plus"></i>
        </button>

        {/* Add Note Card di Sidebar (untuk Mobile) */}
        {showCard && (
          <div className={`block md:hidden mx-4 p-4 rounded-xl w-full max-w-[250px] ${theme === "light" ? "bg-[#efecfc]" : "bg-gray-600"}`}>
            <textarea 
              value={newText}
              onChange={(e) => setNewText(e.target.value)}
              className={`p-2 rounded-md w-full resize-none focus:outline-none border text-sm ${theme === "light" ? "border-gray-200 focus:border-[#7E76B5]" : "border-gray-500 focus:border-gray-400"}`}
              rows={4}
              placeholder="Write your note"
            />
            <div className="flex gap-2 mt-2">
              <button
                onClick={handleAddNote}
                className={`${theme === "light" ? "bg-[#7E76B5]" : "bg-gray-500"} text-white font-bold px-3 py-2 rounded-full hover:opacity-80 transition-opacity flex-1`}
              >
                <i className="fa-solid fa-check"></i>
              </button>
              <button
                onClick={() => setShowCard(false)}
                className={`${theme === "light" ? "bg-gray-400" : "bg-gray-600"} text-white font-bold px-3 py-2 rounded-full hover:opacity-80 transition-opacity`}
              >
                <i className="fa-solid fa-times"></i>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Konten Utama */}
      <div className={`flex-1 p-4 md:p-10 min-h-screen ${theme === "light" ? "bg-[#F6F5FA]" : "bg-[#212327]"} pt-16 md:pt-10`}>
        <h1 className={`text-2xl md:text-3xl font-semibold mb-2 ${theme === "light" ? "text-gray-700" : "text-white"}`}>
          Tasks
        </h1>
        <p className={`mb-6 text-sm md:text-base ${theme === "light" ? "text-gray-600" : "text-gray-300"}`}>
          Create your task here
        </p>
        
        {/* Add Note Card di Konten Utama (untuk Desktop) */}
        {showCard && (
          <div className={`hidden md:block mb-6 p-4 rounded-xl w-full max-w-[300px] ${theme === "light" ? "bg-white" : "bg-[#292A2D]"}`}>
            <textarea 
              value={newText}
              onChange={(e) => setNewText(e.target.value)}
              className={`p-2 rounded-md w-full resize-none focus:outline-none border ${theme === "light" ? "border-gray-200 focus:border-[#7E76B5]" : "border-gray-500 focus:border-gray-400"}`}
              cols={30}
              rows={5}
              placeholder="Write your note"
            />
            <div className="flex gap-2 mt-2">
              <button
                onClick={handleAddNote}
                className={`${theme === "light" ? "bg-[#7E76B5]" : "bg-gray-500"} text-white font-bold w-10 h-10 rounded-full hover:opacity-80 transition-opacity`}
              >
                <i className="fa-solid fa-check"></i>
              </button>
              <button
                onClick={() => setShowCard(false)}
                className={`${theme === "light" ? "bg-gray-400" : "bg-gray-600"} text-white font-bold w-10 h-10 rounded-full hover:opacity-80 transition-opacity`}
              >
                <i className="fa-solid fa-times"></i>
              </button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {renderNote()}
        </div>
      </div>

      {/* Tombol Theme Switch*/}
      <div className="fixed bottom-6 right-6 z-30">
        <ThemeSwitch />
      </div>
    </div>
  );
}

export default App;