import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromPaste, resetAllPaste } from '../redux/pasteSlice';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { Calendar, Copy, Eye, PencilLine, Trash2, Share, FolderX } from "lucide-react";
import { FormatDate } from '../utility/formateDate';

const Paste = () => {
    const pastes = useSelector((state) => state.paste.pastes);
    const [searchTerm, setSearchTerm] = useState('');
    const dispatch = useDispatch();

    const filteredData = pastes.filter(
        (paste) => paste.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDelete = (pasteId) => {
        dispatch(removeFromPaste(pasteId));
    };

    const handleShare = (pasteId) => {
        const link = `${window.location.origin}/paste/${pasteId}`;
        navigator.clipboard.writeText(link).then(() => {
            toast.success('Link copied to clipboard!');
        });
    };

    const removeAll = () => {
        dispatch(resetAllPaste());
    };

    return (
        <div className="w-full h-full py-10 max-w-[1200px] mx-auto px-5 lg:px-8">
            <div className="flex flex-col gap-y-3 lg:pl-[12vw] lg:pr-[12vw] px-2 md:px-10">
                {/* Search Bar */}
                <div className="w-full flex gap-3 px-4 py-2 rounded-[0.3rem] border border-[rgba(128,121,121,0.3)] mt-6">
                    <input
                        className="focus:outline-none w-full bg-transparent"
                        type="search"
                        placeholder="Search here"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {/* Pastes Container */}
                <div className="flex flex-col border border-[rgba(128,121,121,0.3)] py-4 rounded-[0.4rem]">
                    <h2 className="px-4 text-2xl md:text-3xl lg:text-4xl font-bold border-b border-[rgba(128,121,121,0.3)] pb-4 flex justify-between items-center">
                        <p>All Paste</p>
                        <button
                            className="ml-auto p-2 rounded-[0.2rem] bg-white border border-[#c7c7c7] hover:bg-transparent group hover:border-pink-700"
                            onClick={removeAll}
                        >
                            <FolderX
                                className="text-black group-hover:text-pink-700"
                                size={20}
                            />
                        </button>
                    </h2>

                    {/* Pastes List */}
                    <div className="w-full px-4 pt-4 flex flex-col gap-y-5">
                        {filteredData.length > 0 ? (
                            filteredData.map((paste) => (
                                <div
                                    className="border border-[rgba(128,121,121,0.3)] w-full flex flex-col gap-y-4 sm:gap-y-6 sm:flex-row sm:justify-between p-4 rounded-[0.3rem]"
                                    key={paste?._id}
                                >
                                    {/* Paste Details */}
                                    <div className="w-full sm:w-[50%] flex flex-col space-y-3">
                                        <p className="text-xl md:text-2xl lg:text-4xl font-semibold">{paste?.title}</p>
                                        <p className="text-sm md:text-base font-normal line-clamp-3 max-w-full text-[#707070]">
                                            {paste?.content}
                                        </p>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex flex-col gap-y-4 sm:items-end sm:gap-y-2">
                                        {/* Buttons */}
                                        <div className="flex gap-2 flex-wrap sm:flex-nowrap">
                                            <button className="p-2 rounded-[0.2rem] bg-white border border-[#c7c7c7] hover:bg-transparent group hover:border-blue-500">
                                                <Link to={`/?pasteId=${paste?._id}`} className="text-white">
                                                    <PencilLine className="text-black group-hover:text-blue-500" size={20} />
                                                </Link>
                                            </button>
                                            <button className="p-2 rounded-[0.2rem] bg-white border border-[#c7c7c7] hover:bg-transparent group hover:border-orange-500">
                                                <Link to={`/pastes/${paste?._id}`}>
                                                    <Eye className="text-black group-hover:text-orange-500" size={20} />
                                                </Link>
                                            </button>
                                            <button
                                                className="p-2 rounded-[0.2rem] bg-white border border-[#c7c7c7] hover:bg-transparent group hover:border-pink-500"
                                                onClick={() => handleDelete(paste?._id)}
                                            >
                                                <Trash2 className="text-black group-hover:text-pink-500" size={20} />
                                            </button>
                                            <button
                                                className="p-2 rounded-[0.2rem] bg-white border border-[#c7c7c7] hover:bg-transparent group hover:border-green-500"
                                                onClick={() => {
                                                    navigator.clipboard.writeText(paste?.content);
                                                    toast.success('Copied to Clipboard');
                                                }}
                                            >
                                                <Copy className="text-black group-hover:text-green-500" size={20} />
                                            </button>
                                            <button
                                                className="p-2 rounded-[0.2rem] bg-white border border-[#c7c7c7] hover:bg-transparent group hover:text-indigo-500"
                                                onClick={() => handleShare(paste._id)}
                                            >
                                                <Share className="text-black group-hover:text-indigo-500" size={20} />
                                            </button>
                                        </div>

                                        {/* Date */}
                                        <div className="gap-x-2 flex text-sm md:text-base">
                                            <Calendar className="text-black" size={20} />
                                            {FormatDate(paste?.createdAt)}
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-2xl text-center w-full text-chileanFire-500">No Data Found</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Paste;
