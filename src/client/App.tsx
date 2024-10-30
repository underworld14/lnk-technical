// import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Toaster } from "@/components/ui/sonner";

// pages
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import { AuthProvider } from "./context/auth.context";
import PrivateRoutes from "./components/private-routes";
import Home from "./pages/home/home";

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <Routes>
            <Route element={<PrivateRoutes />}>
              <Route path="/" element={<Home />} />
            </Route>

            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/register" element={<Register />} />
          </Routes>
        </Router>
      </AuthProvider>
      <Toaster richColors position="top-center" />
    </QueryClientProvider>
  );
}

export default App;
