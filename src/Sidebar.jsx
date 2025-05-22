import React, { useState } from "react"
import {
  FileText,
  LayoutDashboard,
  Link,
  Zap,
  Globe,
  BookOpen,
  Headphones,
  Bell,
  User,
  MessageCircle,
  Share2,
  ChevronDown,
  ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"

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
]

export default function Sidebar({ onItemClick }) {
  const [expandedGroup, setExpandedGroup] = useState(null)
  const [activeItem, setActiveItem] = useState(null)

  const handleClick = (label, expandable) => {
    if (expandable) {
      setExpandedGroup(expandedGroup === label ? null : label)
    } else {
      setActiveItem(label)
      setExpandedGroup(null)
      if (onItemClick) onItemClick(label)
    }
  }

  return (
    <aside
      className="w-64 bg-white h-screen border-r text-sm overflow-y-auto"
      style={{
        scrollbarWidth: "thin", // Firefox
        scrollbarColor: "#2563eb #dbeafe", // Firefox: thumb + track
      }}
    >
      <style>
        {`
          /* WebKit scrollbar styling */
          aside::-webkit-scrollbar {
            width: 8px;
          }
          aside::-webkit-scrollbar-track {
            background: #dbeafe;
            border-radius: 8px;
          }
          aside::-webkit-scrollbar-thumb {
            background-color: #2563eb;
            border-radius: 8px;
            border: 2px solid #dbeafe;
          }
        `}
      </style>

      <div className="p-4 border-b">
        <div className="font-bold text-xl">abun-wafa</div>
        <select className="mt-2 w-full border border-gray-300 rounded px-2 py-1">
          <option>amazon.com</option>
          <option>ebay.com</option>
        </select>
      </div>

      <nav className="p-2 flex flex-col gap-1">
        {menuItems.map((item) => {
          const isExpanded = expandedGroup === item.label
          const isActiveTop = activeItem === item.label

          const Icon = item.icon

          return (
            <div key={item.label}>
              <Button
                variant={isActiveTop ? "secondary" : "ghost"}
                size="sm"
                className="w-full flex justify-between items-center rounded hover:text-blue-600 transition-colors"
                onClick={() => handleClick(item.label, item.expandable)}
              >
                <span className="flex items-center gap-2">
                  <Icon className="h-4 w-4" />
                  {item.label}
                </span>
                {item.expandable && (
                  isExpanded ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )
                )}
              </Button>

              {/* Submenu */}
              {item.expandable && isExpanded && (
                <div className="pl-6 mt-1 flex flex-col gap-1">
                  {item.children.map((subItem) => (
                    <Button
                      key={subItem}
                      variant={activeItem === subItem ? "secondary" : "ghost"}
                      size="sm"
                      className="justify-start rounded text-sm hover:text-blue-600 transition-colors"
                      onClick={() => {
                        setActiveItem(subItem)
                        if (onItemClick) onItemClick(subItem)
                      }}
                    >
                      {subItem}
                    </Button>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </nav>
    </aside>
  )
}
