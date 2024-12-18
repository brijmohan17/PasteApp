import React from 'react'

import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Copy } from "lucide-react";
import toast from "react-hot-toast";

const ViewPaste = () => {
  
      
      const {id}=useParams();
      const allPaste=useSelector((state)=>state.paste.pastes);
      const paste=allPaste.filter((p)=>p?._id===id)[0];
      
  return (
    <div className='w-full h-full py-10 max-w-[1200px] mx-auto px-5 md:px-8 lg:px-24'>
            <div className='flex flex-col gap-y-5 items-start px-2 md:px-[8vw]'>
               
              <input className="w-[100%] md:w-[80%] text-black border border-input rounded-md p-2 focus:outline-slate-400"
                        type="text"
                        value={paste.title}
                        placeholder='Enter the title here'  disabled />
                   
                <div className='w-full flex flex-col items-start relative rounded bg-opacity-10 border border-[rgba(128,121,121,0.3)] backdrop-blur-2xl'>


                    <div className='w-full rounded-t flex items-center justify-between gap-x-4 px-4 py-2 border-b border-[rgba(128,121,121,0.3)]'>
                        <div className='flex gap-x-[6px] items-center select-none '>
                        <div className='w-[13px] h-[13px] rounded-full bg-[rgb(255,95,87)]'></div>
                            <div className='w-[13px] h-[13px] rounded-full bg-[rgb(254,188,46)]'></div>
                            <div className='w-[13px] h-[13px] rounded-full bg-[rgb(45,200,66)]'></div>
                        </div>
                        {/*Circle and copy btn*/}
                        <div className='w-fit rounded-t flex items-center justify-between gap-x-4 px-4'>

                            {/* copy button */}
                            <button className="flex justify-center items-center transition-all duration-300 ease-in-out group" onClick={() => {
                                navigator.clipboard.writeText(paste?.content || "");
                                toast.success("Copied to Clipboard", {
                                    position: "top-right"
                                })
                            }}>

                                <Copy className="group-hover:text-success-500 " size={20}>

                                </Copy>
                            </button>
                        </div>
                    </div>

                    <textarea className=" w-full p-3 focus-visible:right-0 h-64" value={paste.content} placeholder='Write Your Content Here' 
                        style={{
                            caretColor: "#000",
                        }}
                        // row={200}
                        disabled
                    />

                </div>
            </div>
        </div>
  )
}

export default ViewPaste
