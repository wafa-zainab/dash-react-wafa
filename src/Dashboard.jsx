import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  ChevronDown,
  ChevronUp,
  Menu,
  X,
} from "lucide-react";
import classNames from "classnames";
import Sidebar from "./Sidebar";

const articles = [
  {
    title: "How to Improve Your Skills in League of Legends",
    keyword: "league of legends [2240000]",
    words: 4575,
    createdOn: "20 hours ago",
  },
  {
    title: "How to Master Last Hitting in League of Legends",
    keyword: "league of legends [2240000]",
    words: 3480,
    createdOn: "21 hours ago",
  },
  {
    title: "7 Tips for Better Teamplay in League of Legends",
    keyword: "league of legends [2240000]",
    words: 2676,
    createdOn: "a day ago",
  },
  {
    title: "Top Virtual Executive Assistant Services (2024)",
    keyword: "virtual executive assistant [2900]",
    words: 2408,
    createdOn: "1 Oct, 24",
  },
  {
    title: "Unlimited Graphics Design Solutions",
    keyword: "unlimited graphic design services [390]",
    words: 1793,
    createdOn: "---",
  },
  {
    title: "Top Amazon Payment Methods for Quick Access to Funds",
    keyword: "amazon payment methods [3600]",
    words: 2647,
    createdOn: "---",
  },
  {
    title:
      "Backlinks 101: What are backlinks and why they’re important [Free template]",
    keyword: "backlinks [8100]",
    words: 2261,
    createdOn: "---",
  },
  {
    title: "7 Leading AI SEO Tools in 2024 (Ranked & Compared)",
    keyword: "ai seo software [880]",
    words: 1543,
    createdOn: "---",
  },
  {
    title: "Unlimited Graphic Design Services You Can Rely On",
    keyword: "unlimited graphic design services [390]",
    words: 1974,
    createdOn: "---",
  },
];

const tabs = [
  "Generated Articles",
  "Published Articles",
  "Scheduled Articles",
  "Archived Articles",
];

// Helper to parse `createdOn` string into Date object for sorting
const parseCreatedOn = (str) => {
  if (str === "---") return new Date(0); // Oldest possible date
  if (str.includes("hours ago")) {
    const hours = parseInt(str);
    if (!isNaN(hours)) {
      const date = new Date();
      date.setHours(date.getHours() - hours);
      return date;
    }
  }
  if (str.includes("day ago") || str.includes("a day ago")) {
    const date = new Date();
    date.setDate(date.getDate() - 1);
    return date;
  }
  // Try parsing "1 Oct, 24" or similar
  const parsed = Date.parse(str);
  if (!isNaN(parsed)) return new Date(parsed);
  return new Date(0);
};

export default function Dashboard() {
  const [search, setSearch] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState("Generated Articles");
  const [selectedRows, setSelectedRows] = useState({});
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [publishStatus, setPublishStatus] = useState({});

  // Reset selectedRows when page, search, or entriesPerPage change
  useEffect(() => {
    setSelectedRows({});
  }, [currentPage, entriesPerPage, search]);

  const filteredArticles = articles.filter((article) => {
    const q = search.toLowerCase();
    return (
      article.title.toLowerCase().includes(q) ||
      article.keyword.toLowerCase().includes(q)
    );
  });

  function sortData(data) {
    if (!sortConfig.key) return data;
    return [...data].sort((a, b) => {
      const aVal = a[sortConfig.key];
      const bVal = b[sortConfig.key];

      // Special handling for createdOn
      if (sortConfig.key === "createdOn") {
        const aDate = parseCreatedOn(aVal);
        const bDate = parseCreatedOn(bVal);
        return sortConfig.direction === "asc"
          ? aDate - bDate
          : bDate - aDate;
      }

      if (typeof aVal === "number") {
        return sortConfig.direction === "asc" ? aVal - bVal : bVal - aVal;
      }

      return sortConfig.direction === "asc"
        ? aVal.localeCompare(bVal)
        : bVal.localeCompare(aVal);
    });
  }

  const sortedArticles = sortData(filteredArticles);
  const totalPages = Math.ceil(sortedArticles.length / entriesPerPage);
  const paginatedArticles = sortedArticles.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );

  const allSelected =
    paginatedArticles.length > 0 &&
    paginatedArticles.every((a) => selectedRows[a.title]);

  const toggleSelectAll = () => {
    const updated = { ...selectedRows };
    paginatedArticles.forEach((a) => {
      updated[a.title] = !allSelected;
    });
    setSelectedRows(updated);
  };

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  return (
    <div className="flex h-screen bg-gray-50 text-gray-900 overflow-hidden">
      {/* Sidebar toggle button (mobile) */}
      <Button
        variant="outline"
        onClick={() => setSidebarOpen((v) => !v)}
        className="md:hidden fixed top-4 left-4 z-50 rounded-full p-2 shadow-md hover:bg-gray-100 transition"
        aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
      >
        {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </Button>

      {/* Sidebar */}
      <aside
        className={classNames(
          "fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-200 shadow-lg z-40 transform transition-transform duration-300 ease-in-out",
          {
            "-translate-x-full": !sidebarOpen,
            "translate-x-0": sidebarOpen,
            "md:translate-x-0 md:static md:flex md:flex-col": true,
          }
        )}
      >
        <Sidebar
          activeItem={activeTab}
          onItemClick={(tab) => {
            setActiveTab(tab);
            setCurrentPage(1);
            setSidebarOpen(false);
          }}
        />
      </aside>

      {/* Overlay on mobile when sidebar is open */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4 shadow-sm">
          <h1 className="text-2xl font-semibold tracking-tight">
            Articles Dashboard
          </h1>
        </header>

        {/* Tabs & Searchbar */}
        <div className="bg-white px-8 py-4 border-b border-gray-200 shadow-sm flex flex-wrap justify-between items-center gap-4">
          {/* Tabs */}
          <div
            className="flex gap-3 flex-wrap"
            role="tablist"
            aria-label="Article tabs"
          >
            {tabs.map((tab) => (
              <Button
                key={tab}
                variant={activeTab === tab ? "default" : "outline"}
                className="text-sm font-medium px-5 py-2 rounded-md shadow-sm whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-indigo-500"
                role="tab"
                aria-selected={activeTab === tab}
                tabIndex={activeTab === tab ? 0 : -1}
                onClick={() => {
                  setActiveTab(tab);
                  setCurrentPage(1);
                }}
              >
                {tab}
              </Button>
            ))}
          </div>

          {/* Search input only on Generated Articles */}
          {activeTab === "Generated Articles" && (
            <Input
              type="search"
              placeholder="Search Title & Keywords..."
              className="w-full max-w-xs rounded-md border border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              value={search}
              aria-label="Search articles"
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
            />
          )}
        </div>

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto p-6">
          <Card className="bg-white rounded-md shadow-sm">
            <CardContent className="p-0">
              <ScrollArea>
                <table className="w-full border-collapse">
                  <thead className="bg-gray-100 sticky top-0 z-10">
                    <tr>
                      <th className="p-3 border-b border-gray-300 text-center">
                        <Checkbox
                          aria-label={
                            allSelected
                              ? "Deselect all articles"
                              : "Select all articles"
                          }
                          checked={allSelected}
                          onCheckedChange={toggleSelectAll}
                        />
                      </th>
                      {["title", "keyword", "words", "createdOn", "publish"].map(
                        (key) => (
                          <th
                            key={key}
                            scope="col"
                            className="p-3 border-b border-gray-300 cursor-pointer select-none text-left"
                            onClick={() => handleSort(key)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter" || e.key === " ") {
                                e.preventDefault();
                                handleSort(key);
                              }
                            }}
                            tabIndex={0}
                            aria-sort={
                              sortConfig.key === key
                                ? sortConfig.direction === "asc"
                                  ? "ascending"
                                  : "descending"
                                : "none"
                            }
                          >
                            <div className="flex items-center gap-2 select-none">
                              {key === "publish"
                                ? "Publish"
                                : key.charAt(0).toUpperCase() + key.slice(1)}
                              {sortConfig.key === key ? (
                                sortConfig.direction === "asc" ? (
                                  <ChevronUp size={14} />
                                ) : (
                                  <ChevronDown size={14} />
                                )
                              ) : (
                                <MoreVertical size={14} />
                              )}
                            </div>
                          </th>
                        )
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedArticles.length === 0 && (
                      <tr>
                        <td colSpan={6} className="p-4 text-center text-gray-500">
                          No articles found.
                        </td>
                      </tr>
                    )}
                    {paginatedArticles.map((article) => (
                      <tr
                        key={article.title}
                        className={classNames(
                          "hover:bg-gray-50",
                          selectedRows[article.title]
                            ? "bg-indigo-50"
                            : undefined
                        )}
                      >
                        <td className="text-center p-3 border-b border-gray-200">
                          <Checkbox
                            aria-label={`Select article titled ${article.title}`}
                            checked={!!selectedRows[article.title]}
                            onCheckedChange={(checked) =>
                              setSelectedRows((prev) => ({
                                ...prev,
                                [article.title]: checked,
                              }))
                            }
                          />
                        </td>
                        <td className="p-3 border-b border-gray-200 max-w-xs truncate">
                          {article.title}
                        </td>
                        <td className="p-3 border-b border-gray-200 max-w-xs truncate">
                          {article.keyword}
                        </td>
                        <td className="p-3 border-b border-gray-200 text-right">
                          {article.words.toLocaleString()}
                        </td>
                        <td className="p-3 border-b border-gray-200">
                          {article.createdOn}
                        </td>
                        <td className="p-3 border-b border-gray-200">
                          <select
                            aria-label={`Publish status for article titled ${article.title}`}
                            value={publishStatus[article.title] || "draft"}
                            onChange={(e) =>
                              setPublishStatus((prev) => ({
                                ...prev,
                                [article.title]: e.target.value,
                              }))
                            }
                            className="block w-full rounded-md border border-gray-300 bg-white py-1 px-2 text-sm shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                          >
                            <option value="draft">Draft</option>
                            <option value="published">Published</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </ScrollArea>

              {/* Pagination Controls */}
              <div className="flex items-center justify-between px-6 py-4 bg-gray-50 border-t border-gray-200">
                <div className="flex items-center gap-2">
                  <label htmlFor="entries" className="text-sm font-medium">
                    Entries per page:
                  </label>
                  <select
                    id="entries"
                    aria-label="Entries per page"
                    value={entriesPerPage}
                    onChange={(e) => {
                      setEntriesPerPage(Number(e.target.value));
                      setCurrentPage(1);
                    }}
                    className="rounded-md border border-gray-300 py-1 px-2 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  >
                    {[5, 10, 15, 20].map((num) => (
                      <option key={num} value={num}>
                        {num}
                      </option>
                    ))}
                  </select>
                </div>

                <div
                  className="text-sm text-gray-700"
                  aria-live="polite"
                  aria-atomic="true"
                >
                  Page {currentPage} of {totalPages || 1}
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                    disabled={currentPage === 1}
                    aria-label="Previous page"
                  >
                    <ChevronLeft />
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() =>
                      setCurrentPage((p) => Math.min(p + 1, totalPages))
                    }
                    disabled={currentPage === totalPages || totalPages === 0}
                    aria-label="Next page"
                  >
                    <ChevronRight />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
