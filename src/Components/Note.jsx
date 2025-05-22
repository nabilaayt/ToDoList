import { useContext } from "react";
import { NoteContext } from "../Context/NoteContext";

const Note = ({text, date, id}) => {
    const { DeleteNote } = useContext(NoteContext);

    const getData = () => {
        const Date = new Date(date);
        return `${Date.getDate()}-${Date.getMonth()+1}-${Date.getFullYear()}`;
    };

    return(
        <div className="bg-[#DCD7FB] p-3 rounded-xl relative shadow-sm w-full max-w-[300px] min-h-[120px] flex flex-col justify-between">
            <div className="text-gray-800 mb-3 whitespace-pre-wrap">
                {text}
            </div>

            <div className="flex justify-between items-end text-sm text-gray-700">
                <div className="">{getData()}</div>
                    <button 
                        className="bg-[#6168AD] text-white border mt-2 px-4 py-2 rounded-full hover:opacity-80" 
                        onClick={() => DeleteNote(id)}>
                        🗑️
                    </button>
            </div>
        </div>
    );
}

export default Note;