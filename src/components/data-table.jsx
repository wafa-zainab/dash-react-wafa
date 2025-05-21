import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const dummyData = [
  { id: 1, title: "How to Market Yourself as a Developer", views: "240", category: "Career", status: "Published" },
  { id: 2, title: "Beginner's Guide to Git & GitHub", views: "312", category: "Tools", status: "Draft" },
  { id: 3, title: "10 JavaScript Tips You Didn't Know", views: "412", category: "JavaScript", status: "Published" },
  { id: 4, title: "Learning React in 2024", views: "189", category: "React", status: "Draft" },
];

export function DataTable() {
  const [filter, setFilter] = useState("");

  const filteredData = dummyData.filter(item =>
    item.title.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Articles</h2>
        <Input
          placeholder="Search articles..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-64"
        />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Views</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredData.map((article) => (
            <TableRow key={article.id}>
              <TableCell>{article.title}</TableCell>
              <TableCell>{article.views}</TableCell>
              <TableCell>{article.category}</TableCell>
              <TableCell>{article.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
