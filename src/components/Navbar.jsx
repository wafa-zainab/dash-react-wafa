import React from "react";
import { NavLink } from "react-router-dom";

export function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-4 flex gap-6">
      <NavLink
        to="/"
        end
        className={({ isActive }) =>
          isActive
            ? "font-bold text-blue-600 border-b-2 border-blue-600 pb-1"
            : "text-gray-700 hover:text-blue-600"
        }
      >
        Dashboard
      </NavLink>
      <NavLink
        to="/profile"
        className={({ isActive }) =>
          isActive
            ? "font-bold text-blue-600 border-b-2 border-blue-600 pb-1"
            : "text-gray-700 hover:text-blue-600"
        }
      >
        Profile
      </NavLink>
    </nav>
  );
}
