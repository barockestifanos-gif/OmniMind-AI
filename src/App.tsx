import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useTheme } from "@/hooks/useTheme";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import React, { createContext, useContext } from "react";

const queryClient = new QueryClient();

type ThemeContextType = {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
};

type AuthContextType = {
  isAuthenticated: boolean;
};

export const ThemeContext = createContext<ThemeContextType>({ theme: 'dark', toggleTheme: () => {} });
export const useThemeContext = () => useContext(ThemeContext);

export const AuthContext = createContext<AuthContextType>({ isAuthenticated: false });
export const useAuthContext = () => useContext(AuthContext);

const AppInner = () => {
  const { user, loading, signUp, signIn, signOut } = useAuth();
  const { theme, toggleTheme } = useTheme(user?.id);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  const handleAuth = async (email: string, password: string, username?: string) => {
    if (username) {
      return signUp(email, password, username);
    }
    return signIn(email, password);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <AuthContext.Provider value={{ isAuthenticated: !!user }}>
        <BrowserRouter>
          <Routes>
            {/* Main app is always accessible */}
            <Route path="/" element={<Index onSignOut={signOut} isAuthenticated={!!user} />} />
            <Route path="/auth" element={
              user ? <Navigate to="/" replace /> : <Auth onAuth={handleAuth} />
            } />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthContext.Provider>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AppInner />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
