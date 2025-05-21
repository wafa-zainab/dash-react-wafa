// Dashboard.jsx
import React, { useState } from "react";
import { Card, CardContent } from "./components/ui/card";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Checkbox } from "./components/ui/checkbox";
import { Table } from "./components/ui/table";
import { ScrollArea } from "./components/ui/scroll-area";
import { MoreVertical, ChevronLeft, ChevronRight } from "lucide-react";
import { FaWordpress } from "react-icons/fa";
import Sidebar from "./Sidebar";

const articles = [
  { title: "How to Improve Your Skills in League of Legends", keyword: "league of legends [2240000]", words: 4575, createdOn: "20 hours ago" },
  { title: "How to Master Last Hitting in League of Legends", keyword: "league of legends [2240000]", words: 3480, createdOn: "21 hours ago" },
  { title: "7 Tips for Better Teamplay in League of Legends", keyword: "league of legends [2240000]", words: 2676, createdOn: "a day ago" },
  { title: "Top Virtual Executive Assistant Services (2024)", keyword: "virtual executive assistant [2900]", words: 2408, createdOn: "1 Oct, 24" },
  { title: "Unlimited Graphics Design Solutions", keyword: "unlimited graphic design services [390]", words: 1793, createdOn: "---" },
  { title: "Top Amazon Payment Methods for Quick Access to Funds", keyword: "amazon payment methods [3600]", words: 2647, createdOn: "---" },
  { title: "Backlinks 101: What are backlinks and why they’re important [Free template]", keyword: "backlinks [8100]", words: 2261, createdOn: "---" },
  { title: "7 Leading AI SEO Tools in 2024 (Ranked & Compared)", keyword: "ai seo software [880]", words: 1543, createdOn: "---" },
  { title: "Unlimited Graphic Design Services You Can Rely On", keyword: "unlimited graphic design services [390]", words: 1974, createdOn: "---" },
];

export default function Dashboard() {
  const [search, setSearch] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeItem, setActiveItem] = useState("Generated Articles");

  const filteredArticles = articles.filter((article) => {
    const q = search.toLowerCase();
    return article.title.toLowerCase().includes(q) || article.keyword.toLowerCase().includes(q);
  });

  const totalPages = Math.ceil(filteredArticles.length / entriesPerPage);
  const paginatedArticles = filteredArticles.slice((currentPage - 1) * entriesPerPage, currentPage * entriesPerPage);

  function changePage(newPage) {
    setCurrentPage(Math.max(1, Math.min(newPage, totalPages)));
  }

  return (
    <div className="flex h-screen bg-background text-foreground">
      <Sidebar activeItem={activeItem} onItemClick={setActiveItem} />
      <div className="flex-1 flex flex-col">
        <header className="flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4">
          <h1 className="text-2xl font-bold tracking-tight">{activeItem}</h1>
        </header>

        {activeItem === "Generated Articles" && (
          <div className="border-b border-gray-200 bg-white px-6 py-4 flex justify-end">
            <Input
              type="search"
              placeholder="Search for Title & Keywords..."
              className="w-full md:w-80"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
        )}

        <main className="flex-1 overflow-hidden p-6 bg-background">
          {activeItem === "Generated Articles" ? (
            <Card className="h-full shadow-sm">
              <CardContent className="flex flex-col h-full p-0">
                <ScrollArea className="h-full w-full">
                  <Table
                    columns={[
                      { header: "", accessor: "select" },
                      { header: "Article Title", accessor: "title" },
                      { header: "Keyword [Traffic]", accessor: "keyword" },
                      { header: "Words", accessor: "words" },
                      { header: "Created On", accessor: "createdOn" },
                      { header: "Action", accessor: "action" },
                      { header: "Publish", accessor: "publish" },
                    ]}
                    data={paginatedArticles.map((article) => ({
                      select: <Checkbox aria-label={`Select article: ${article.title}`} />,
                      title: article.title,
                      keyword: article.keyword,
                      words: article.words,
                      createdOn: article.createdOn,
                      action: (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => alert(`Viewing ${article.title}`)}
                        >
                          View
                        </Button>
                      ),
                      publish: (
                        <div className="flex items-center gap-2 justify-center">
                          <FaWordpress className="h-5 w-5 text-blue-600" />
                          <MoreVertical
                            className="h-4 w-4 text-gray-500 cursor-pointer"
                            onClick={() => alert(`More actions for: ${article.title}`)}
                          />
                        </div>
                      ),
                    }))}
                  />
                </ScrollArea>

                {/* Footer Pagination */}
                <div className="mt-4 flex flex-col md:flex-row md:items-center md:justify-between px-4 gap-4">
                  <div className="flex items-center gap-2 text-sm">
                    <span>Total {filteredArticles.length} Article Titles</span>
                    <span>|</span>
                    <label htmlFor="entries">Show</label>
                    <select
                      id="entries"
                      value={entriesPerPage}
                      onChange={(e) => {
                        setEntriesPerPage(Number(e.target.value));
                        setCurrentPage(1);
                      }}
                      className="border border-gray-300 px-2 py-1 text-sm"
                    >
                      {[10, 20, 50, 100].map((size) => (
                        <option key={size} value={size}>{size}</option>
                      ))}
                    </select>
                    <span>entries per page</span>
                  </div>

                  <div className="flex items-center space-x-2 justify-center">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => changePage(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>

                    <span className="min-w-[2rem] text-center text-sm">
                      {currentPage} / {totalPages || 1}
                    </span>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => changePage(currentPage + 1)}
                      disabled={currentPage === totalPages || totalPages === 0}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="text-center text-gray-500 pt-10">Coming soon: {activeItem}</div>
          )}
        </main>
      </div>
    </div>
  );
}
