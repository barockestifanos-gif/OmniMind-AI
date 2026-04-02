import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

type Theme = 'light' | 'dark';

export const useTheme = (userId?: string) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    return (localStorage.getItem('theme') as Theme) || 'dark';
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.documentElement.classList.toggle('light', theme === 'light');
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Load theme from profile
  useEffect(() => {
    if (!userId) return;
    supabase.from('profiles').select('theme').eq('id', userId).single()
      .then(({ data }) => {
        if (data?.theme) {
          setThemeState(data.theme as Theme);
        }
      });
  }, [userId]);

  const setTheme = useCallback(async (newTheme: Theme) => {
    setThemeState(newTheme);
    if (userId) {
      await supabase.from('profiles').update({ theme: newTheme }).eq('id', userId);
    }
  }, [userId]);

  const toggleTheme = useCallback(() => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }, [theme, setTheme]);

  return { theme, setTheme, toggleTheme };
};
