import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { addTOPaste, updateTOPaste } from '../redux/pasteSlice';
import { Copy, PlusCircle } from "lucide-react";
import toast from 'react-hot-toast';

const Home = () => {
    const [title, setTitle] = useState('');
    const [value, setvalue] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();
    const dispatch = useDispatch();
    const pasteId = searchParams.get("pasteId");
    const allPastes = useSelector((state) => state.paste.pastes)

    function createPaste() {
        const paste = {
            title: title,
            content: value,
            _id: pasteId || Date.now().toString(36)+Math.random().toString(36).substring(2),
            createdAt: new Date().toISOString(),
        }
        if (pasteId) {
            dispatch(updateTOPaste(paste));
        } else {
            dispatch(addTOPaste(paste));
        }
        setTitle('');
        setvalue('');
        setSearchParams({});
    }

    const resetPaste = () => {
        setTitle("");
        setvalue("");
        setSearchParams({});
    };

    useEffect(() => {
        if (pasteId) {
            const paste = allPastes.find((item) =>
                item._id === pasteId
            );
            setTitle(paste.title);
            setvalue(paste.content);
        }
    }, [pasteId, allPastes]);

    return (
        <div className='w-full h-full py-10 max-w-[1200px] mx-auto px-5 md:px-8 lg:px-24'>
            <div className='flex flex-col gap-y-5 items-start px-2 md:px-[8vw]'>
                <div className='w-full flex flex-col md:flex-row gap-y-4 md:gap-x-4 justify-between items-center'>
                    <input 
                        className={`${pasteId ? "w-[100%] md:w-[80%]" : "w-[100%] md:w-[85%]"} text-black border border-input rounded-md p-2 focus:outline-slate-400`}
                        type="text"
                        value={title}
                        placeholder='Enter the title here' 
                        onChange={(e) => setTitle(e.target.value)} 
                    />
                    <div className="flex gap-x-2 items-center">
                        <button 
                            onClick={createPaste} 
                            className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-1 dark:bg-blue-600 dark:hover:bg-blue-700'>
                            {pasteId ? "Update Paste" : "Create Paste"}
                        </button>
                        {pasteId && 
                            <button 
                                className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-1 dark:bg-blue-600 dark:hover:bg-blue-700' 
                                onClick={resetPaste}>
                                <PlusCircle size={20} />
                            </button>
                        }
                    </div>
                </div>

                <div className='w-full flex flex-col items-start relative rounded bg-opacity-10 border border-[rgba(128,121,121,0.3)] backdrop-blur-2xl'>
                    <div className='w-full rounded-t flex items-center justify-between gap-x-4 px-4 py-2 border-b border-[rgba(128,121,121,0.3)]'>
                        <div className='flex gap-x-[6px] items-center select-none'>
                            <div className='w-[13px] h-[13px] rounded-full bg-[rgb(255,95,87)]'></div>
                            <div className='w-[13px] h-[13px] rounded-full bg-[rgb(254,188,46)]'></div>
                            <div className='w-[13px] h-[13px] rounded-full bg-[rgb(45,200,66)]'></div>
                        </div>
                        <button 
                            className="flex justify-center items-center transition-all duration-300 ease-in-out group" 
                            onClick={() => {
                                navigator.clipboard.writeText(value);
                                toast.success("Copied to Clipboard", {
                                    position: "top-right"
                                });
                            }}>
                            <Copy className="group-hover:text-success-500" size={20} />
                        </button>
                    </div>

                    <textarea 
                        className="focus:outline-slate-400 w-full p-3 focus-visible:right-0 h-64 text-sm md:text-base" 
                        value={value} 
                        placeholder='Write Your Content Here' 
                        onChange={(e) => setvalue(e.target.value)}
                        style={{
                            caretColor: "#000",
                        }}
                        // rows={200}
                    />
                </div>
            </div>
        </div>
    );
}

export default Home;
