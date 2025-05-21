// src/components/ui/button.js
import React from "react";

export function Button({ children, onClick, variant = "default", size = "md", disabled, className = "" }) {
  const base = "inline-flex items-center justify-center rounded font-medium transition-colors";
  const variants = {
    default: "bg-blue-600 text-white hover:bg-blue-700",
    outline: "border border-gray-300 text-gray-700 bg-white hover:bg-gray-100",
  };
  const sizes = {
    sm: "text-sm px-2 py-1",
    md: "text-base px-4 py-2",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant]} ${sizes[size]} ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${className}`}
    >
      {children}
    </button>
  );
}
