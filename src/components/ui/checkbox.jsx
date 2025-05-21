// src/components/ui/checkbox.js
import React from "react";

export function Checkbox({ className = "", ...props }) {
  return (
    <input
      type="checkbox"
      className={`h-4 w-4 accent-blue-600 ${className}`}
      {...props}
    />
  );
}
