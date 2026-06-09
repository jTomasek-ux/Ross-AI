"use client";

import { useRef, useState } from "react";

type UploadZoneProps = {
  onFileSelect: (file: File) => void;
  selectedFile: File | null;
  isStreaming: boolean;
  onAnalyze: () => void;
};

export default function UploadZone({
  onFileSelect,
  selectedFile,
  isStreaming,
  onAnalyze,
}: UploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    if (file.type === "application/pdf") {
      onFileSelect(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Label */}
      <div>
        <h2 className="font-serif font-light text-ross-black text-3xl mb-2">
          Upload Contract
        </h2>
        <p className="font-sans font-light text-ross-midgrey text-sm">
          PDF files only. Text-based contracts up to 10MB.
        </p>
      </div>

      {/* Drop zone */}
      <div
        role="button"
        tabIndex={0}
        aria-label="Upload PDF contract"
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => e.key === "Enter" && inputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`relative cursor-pointer border-2 border-dashed transition-all duration-200 p-12 flex flex-col items-center justify-center gap-4 min-h-[200px] ${
          isDragging
            ? "border-ross-black bg-ross-lightgrey"
            : selectedFile
            ? "border-ross-black bg-ross-offwhite"
            : "border-ross-lightgrey bg-white hover:border-ross-midgrey hover:bg-ross-offwhite"
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept="application/pdf"
          className="hidden"
          onChange={handleInputChange}
        />

        {selectedFile ? (
          <>
            {/* PDF icon — selected state */}
            <div className="flex items-center justify-center w-12 h-12 bg-ross-black">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 2h8l4 4v12a1 1 0 01-1 1H5a1 1 0 01-1-1V3a1 1 0 011-1z"
                  stroke="white"
                  strokeWidth="1.25"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 2v4h4"
                  stroke="white"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="text-center">
              <p className="font-sans font-medium text-ross-black text-sm">
                {selectedFile.name}
              </p>
              <p className="font-sans font-light text-ross-midgrey text-xs mt-1">
                {formatFileSize(selectedFile.size)} · Click to replace
              </p>
            </div>
          </>
        ) : (
          <>
            {/* Upload icon — empty state */}
            <div className="flex items-center justify-center w-12 h-12 bg-ross-lightgrey">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 13V4M10 4L7 7M10 4L13 7"
                  stroke="#0a0a0a"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M3 14v2a1 1 0 001 1h12a1 1 0 001-1v-2"
                  stroke="#0a0a0a"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <div className="text-center">
              <p className="font-sans font-medium text-ross-black text-sm">
                {isDragging ? "Drop to upload" : "Drop your PDF here"}
              </p>
              <p className="font-sans font-light text-ross-midgrey text-xs mt-1">
                or click to browse
              </p>
            </div>
          </>
        )}
      </div>

      {/* Analyze button */}
      <button
        onClick={onAnalyze}
        disabled={!selectedFile || isStreaming}
        className={`w-full py-4 text-xs font-sans font-medium tracking-widest uppercase transition-all duration-200 ${
          !selectedFile || isStreaming
            ? "bg-ross-lightgrey text-ross-midgrey cursor-not-allowed"
            : "bg-ross-black text-white hover:bg-ross-black/90 cursor-pointer"
        }`}
      >
        {isStreaming ? (
          <span className="flex items-center justify-center gap-2">
            <span className="inline-block w-3 h-3 border border-white/40 border-t-white rounded-full animate-spin" />
            Analyzing...
          </span>
        ) : (
          "Analyze Contract →"
        )}
      </button>
    </div>
  );
}
