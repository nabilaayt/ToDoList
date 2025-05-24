import { useContext } from "react";
import { NoteContext } from "../Context/NoteContext";
import { ThemeContext } from "../Context/ThemeContext";

const Note = ({text, date, id}) => {
    const { DeleteNote } = useContext(NoteContext);
    const { theme } = useContext(ThemeContext);

    // Fungsi untuk mengubah timestamp menjadi format tanggal
    const getData = () => {
        const noteDate  = new Date(date);
        return `${noteDate .getDate()}-${noteDate .getMonth()+1}-${noteDate .getFullYear()}`;
    };

    return (
        <div className={`${theme === "light" ? "bg-white" : "bg-[#292A2D]"} p-4 rounded-xl relative w-full max-w-[300px] min-h-[120px] flex flex-col justify-between overflow-visible transition-colors duration-300 hover:shadow-md`}>
            <div className="mb-3 overflow-hidden">
                <p className="whitespace-pre-wrap break-words overflow-y-auto max-h-[100px]">
                    {text}
                </p>
            </div>

            <div className="flex justify-between items-end text-sm text-gray-700">
                <div className={`${theme === "light" ? "text-gray-700" : "text-white"}`}>{getData()}</div>
                <button
                    className={`${theme === "light" ? "bg-[#7E76B5]" : "bg-[#7E76B5]"} text-white mt-2 w-10 h-10 rounded-full hover:opacity-80 transition-opacity`}
                    onClick={() => DeleteNote(id)}
                    aria-label="Delete note"
                >
                    <i className="fa-solid fa-trash"></i>
                </button>
            </div>
        </div>
    );
}

export default Note;