import React, { useState } from "react";
import Nav from './nav';
import './index.css';

export default function Predict() {
    const [file, setFile] = useState(null);
    const [output, setOutput] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile && (selectedFile.type === "audio/mp3" || selectedFile.type === "audio/mpeg")) {
            console.log("Selected file:", selectedFile); // Debugging log
            setFile(selectedFile);
        } else {
            alert("Only MP3 files are supported!");
        }
    };

    const handleDrop = (event) => {
        event.preventDefault();
        console.log("Drop event detected!");

        const droppedFile = event.dataTransfer.files[0];

        if (droppedFile) {
            console.log("Dropped file type:", droppedFile.type);
            console.log("Dropped file name:", droppedFile.name);

            if (droppedFile.type === "audio/mp3" || droppedFile.type === "audio/mpeg") {
                setFile(droppedFile);
            } else {
                alert("Only MP3 files are supported!");
            }
        } else {
            console.error("No file detected in drop event.");
        }
    };

    const uploadFile = async () => {
        if (!file) {
            alert("Please select an MP3 file first!");
            return;
        }

        setLoading(true);
        try {
            console.log("Uploading file:", file.name);
            const arrayBuffer = await file.arrayBuffer();
            const blob = new Uint8Array(arrayBuffer);

            const backend = window.ic.web3_backend;
            const result = await backend.uploadMp3(blob);

            setOutput(result);
        } catch (error) {
            console.error("Error uploading file:", error);
            alert("Error processing file. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Nav />
            <div className="ml-26 mt-32">
                <button
                    className="bg-[#F0FBFB] text-[#4EA2A1] px-6 py-2 rounded-full border-2 border-[#4EA2A1] mb-4"
                    onClick={uploadFile}
                    disabled={loading}
                >
                    {loading ? "Processing..." : "Predict"}
                </button>
                <h1 className="mt-2 text-5xl font-medium text-gray-800">
                    Check Your Lung Health in Seconds
                </h1>
                <p className="text-gray-500 mt-6 text-xl">
                    Upload a respiratory sound file to get instant health insights
                </p>
            </div>
            <div className="mt-16 mx-auto p-12 bg-white shadow-xl rounded-2xl w-11/12 max-w-[89%]">
                <div className="flex flex-col items-center justify-center px-4">
                    <div
                        className="mt-3 p-10 w-full border-2 border-dashed border-[#68D8D6] bg-[#DFF6F3] rounded-lg text-center"
                        onDragOver={(event) => {
                            event.preventDefault(); // Fix: Allow dropping
                            event.dataTransfer.dropEffect = "copy"; // Fix: Show copy cursor
                        }}
                        onDrop={handleDrop}
                    >
                        <div className="flex flex-col items-center">
                            <img src="/assets/icons/upload.png" alt="Upload Icon" className="w-10 mb-3" />
                            <p className="text-gray-700">Drag your file to start uploading</p>
                            <p className="text-gray-500 my-2"> OR </p>
                            <label className="cursor-pointer bg-white border-2 border-[#68D8D6] text-[#68D8D6] px-4 py-2 rounded-md">
                                Browse file
                                <input
                                    type="file"
                                    accept=".mp3"
                                    onChange={handleFileChange}
                                    className="hidden"
                                />
                            </label>
                        </div>
                    </div>
                    <p className="text-gray-400 mt-4 text-sm">Only support .MP3 file</p>
                </div>

                {file && (
                    <div className="mt-4 bg-[#68D8D6] text-white px-4 py-2 rounded-full flex items-center">
                        <span className="mr-2">{file.name}</span>
                    </div>
                )}

                {/* Display Prediction Output */}
                {output && (
                    <div className="mt-6 bg-[#F0FBFB] p-4 rounded-lg text-center">
                        <h3 className="text-gray-700 font-semibold">Prediction Results:</h3>
                        <p className="text-gray-500 mt-2">{JSON.stringify(output)}</p>
                    </div>
                )}
            </div>

            <footer className="mt-38 w-full border-gray-200 py-4 text-center text-gray-500 text-sm">
                <div className="mx-18 flex justify-between items-center px-6 mt-16 mb-4">
                    <div className="flex items-center space-x-2">
                        <img src="/assets/logo.png" alt="Logo" className="w-14 h-auto" />
                        <span className="text-[#4EA2A1] text-2xl font-medium">Audioscope AI</span>
                    </div>
                    <nav className="flex space-x-6 text-gray-600">
                        <a href="#" className="hover:text-gray-900 text-xl">Home</a>
                        <a href="#" className="hover:text-gray-900 text-xl">Predict</a>
                    </nav>
                </div>
                <hr className="border-gray-200 my-2" />
                <p className="text-[120%] text-gray-400 my-8">Copyrights 2025. All Rights Reserved.</p>
            </footer>
        </div>
    );
}
