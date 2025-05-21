// components/sidebar.tsx
import { Home, FileText, Settings, HelpCircle } from "lucide-react";
import { Link } from "react-router-dom";

export function Sidebar() {
  return (
    <div className="w-64 min-h-screen bg-white shadow-md border-r">
      <div className="p-6 text-2xl font-bold">abun</div>
      <nav className="flex flex-col gap-2 p-4">
        <Link to="/" className="flex items-center gap-2 p-2 rounded hover:bg-gray-100">
          <Home className="h-5 w-5" />
          Dashboard
        </Link>
        <Link to="/" className="flex items-center gap-2 p-2 rounded hover:bg-gray-100">
          <FileText className="h-5 w-5" />
          Articles
        </Link>
        <Link to="/" className="flex items-center gap-2 p-2 rounded hover:bg-gray-100">
          <Settings className="h-5 w-5" />
          Settings
        </Link>
        <Link to="/" className="flex items-center gap-2 p-2 rounded hover:bg-gray-100">
          <HelpCircle className="h-5 w-5" />
          Help
        </Link>
      </nav>
    </div>
  );
}
