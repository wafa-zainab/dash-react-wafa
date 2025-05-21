import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoadingSkeleton from "./components/ui/LoadingSkeleton";

const Dashboard = lazy(() => import("./Dashboard"));

function App() {
  return (
    <Router>
      <Suspense fallback={<LoadingSkeleton />}>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<div className="p-10 text-center text-red-500">404 - Page Not Found</div>} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;