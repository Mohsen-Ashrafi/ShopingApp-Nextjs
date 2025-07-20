import React, { useState } from "react";

interface CustomTagInputProps {
  tags: string[];
  setTags: (tags: string[]) => void;
}

const CustomTagInput: React.FC<CustomTagInputProps> = ({ tags, setTags }) => {
  const [input, setInput] = useState("");

  const addTag = () => {
    const newTag = input.trim();
    if (newTag !== "" && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
    }
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      addTag();
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div className="border border-gray-300 p-2 rounded-md min-h-[44px] flex flex-wrap gap-2 focus-within:ring-2 focus-within:ring-blue-400">
      {tags.map((tag, index) => (
        <div
          key={index}
          className="bg-gradient-to-r from-indigo-200 to-indigo-100 text-indigo-800 px-3 py-1 rounded-full flex items-center gap-2 text-sm shadow-sm hover:shadow-md transition"
        >
          <span className="font-medium">{tag}</span>
          <button
            onClick={() => removeTag(tag)}
            className="text-indigo-700 hover:text-red-500 hover:scale-110 transition cursor-pointer"
            title="Remove tag"
          >
            &times;
          </button>
        </div>
      ))}
      <input
        className="flex-1 min-w-[120px] outline-none text-sm bg-transparent"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Add tag..."
      />
    </div>
  );
};

export default CustomTagInput;
