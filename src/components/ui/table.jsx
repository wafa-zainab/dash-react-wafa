// src/components/ui/table.js
import React from "react";

export function Table({ columns, data }) {
  return (
    <table className="min-w-full table-auto border-t text-sm text-left">
      <thead>
        <tr className="bg-gray-50">
          {columns.map((col, i) => (
            <th key={i} className="px-4 py-2 font-medium text-gray-600 border-b">
              {col.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex} className="border-b hover:bg-gray-50">
            {columns.map((col, colIndex) => (
              <td key={colIndex} className="px-4 py-2">
                {row[col.accessor]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
