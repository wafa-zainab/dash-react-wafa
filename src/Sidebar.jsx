import React, { useState } from "react";
import { FaWordpress } from "react-icons/fa";
import {
  LayoutDashboard,
  FileText,
  ChevronDown,
  ChevronRight,
  Link,
  Zap,
  Settings,
  Headphones,
  Bell,
  User,
  MessageCircle,
  Share2,
  Globe,
  BookOpen,
} from "lucide-react";

const menuItems = [
  {
    label: "Articles",
    icon: FileText,
    expandable: true,
    children: [
      "Create Article",
      "Generated Articles",
      "Keyword Projects",
      "AI Keyword to Article",
      "Steal Competitor Keyword",
      "Import Keyword from GSC",
      "Manual Keyword to Article",
      "Bulk Keyword to Article",
      "Longtail Keyword to Article",
      "Article Settings",
    ],
  },
  { label: "Auto Blog", icon: LayoutDashboard },
  { label: "Internal Links", icon: Link },
  { label: "Free Backlinks", icon: Share2 },
  { label: "Integrations", icon: Zap },
  { label: "Subscription", icon: Globe },
  { label: "Affiliate Program", icon: BookOpen },
  { label: "Help Center", icon: Headphones },
  { label: "Updates", icon: Bell },
  { label: "Live Chat Support", icon: MessageCircle },
  { label: "Profile", icon: User },
];

export default function Sidebar({ activeItem, onItemClick }) {
  const [expanded, setExpanded] = useState(true);
  const [activeGroup, setActiveGroup] = useState(null);

  return (
    <aside className="w-64 bg-white h-screen border-r text-sm overflow-y-auto">
      <div className="p-4 border-b">
        <div className="font-bold text-xl">abun</div>
        <select className="mt-2 w-full border border-gray-300 rounded px-2 py-1">
          <option>amazon.com</option>
        </select>
      </div>
      <nav className="p-2">
        {menuItems.map((item) => (
          <div key={item.label} className="mb-1">
            <button
              onClick={() => {
                if (item.expandable) {
                  setExpanded(!expanded);
                  setActiveGroup(item.label);
                } else {
                  onItemClick(item.label);
                  setActiveGroup(null);
                }
              }}
              className={`w-full flex items-center justify-between p-2 hover:bg-gray-100 rounded transition-all ${
                activeGroup === item.label ? "bg-gray-200 font-semibold" : ""
              }`}
            >
              <span className="flex items-center gap-2">
                <item.icon className="h-4 w-4" />
                {item.label}
              </span>
              {item.expandable && (
                expanded && activeGroup === item.label ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )
              )}
            </button>
            {item.expandable && expanded && activeGroup === item.label && (
              <div className="pl-6 mt-1 flex flex-col gap-1">
                {item.children.map((subItem) => (
                  <button
                    key={subItem}
                    onClick={() => onItemClick(subItem)}
                    className={`text-left text-sm py-1 px-2 rounded hover:bg-gray-100 ${
                      activeItem === subItem ? "bg-gray-200 font-medium" : ""
                    }`}
                  >
                    {subItem}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
}
