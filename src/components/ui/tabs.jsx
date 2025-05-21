// src/components/ui/tabs.js
import React from "react";

export function Tabs({ tabs, value, onValueChange }) {
  return (
    <div className="flex space-x-4">
      {tabs.map((tab, index) => (
        <button
          key={index}
          className={`px-4 py-2 border-b-2 transition-colors ${
            index === value ? "border-blue-600 text-blue-600 font-semibold" : "border-transparent text-gray-600"
          }`}
          onClick={() => onValueChange(index)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
