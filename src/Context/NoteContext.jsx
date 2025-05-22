import React, { createContext, useEffect, useState } from "react";

// Membuat Context
export const NoteContext = createContext();

export const NoteProvider = ({ children }) => {
    const [note, setNote] = useState([]);

    useEffect(() => {
        const fetchedData = fetchFromLocal();
        if (fetchedData) {
            setNote(fetchedData);
        }
    }, []);

    useEffect(() => {
        if (note && note.length > 0) {
            saveToLocal();
        }
    }, [note]);

    // Fungsi Tambah Catatan
    const AddNote = (newNote) => {
        setNote((prev) => { // menggunakan callback function
            if(prev){
                return [newNote, ...prev]; // Jika prev ada isinya(note sebelumnya bukan undifined/null), tambahkan newNote di awal array
            }
            return [newNote]; // Jika prev kosong/null, tambahkan array baru untuk newNote (artinya ini catatan pertama)
        });
    };

    // Fungsi Hapus Catatan
    const DeleteNote = (index) => {
        setNote((prev) => { // menggunakan callback function
            const newListNote = [...prev]; // buat salinan array listNote
            newListNote.splice(index, 1); // menghapus 1 item note di index tertentu dari array
            return newListNote; // return array baru tanpa item yang dihapus
        });
    };

    const saveToLocal = () => {
        localStorage.setItem("notes", JSON.stringify(note));
    }

    const fetchFromLocal = () => {
        return JSON.parse(localStorage.getItem("notes"));
    }


    return <NoteContext.Provider value={{note, AddNote, DeleteNote}}>{children}</NoteContext.Provider>
}