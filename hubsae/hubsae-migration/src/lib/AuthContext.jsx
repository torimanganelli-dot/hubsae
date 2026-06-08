import React, { createContext, useState, useContext, useEffect } from 'react';
import { supabase } from '@/api/supabaseClient';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);

  useEffect(() => {
    // Get the current session on mount
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        loadProfile(session.user);
      } else {
        setIsLoadingAuth(false);
      }
    });

    // Listen for auth state changes (login, logout, token refresh)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        loadProfile(session.user);
      } else {
        setUser(null);
        setIsAuthenticated(false);
        setIsLoadingAuth(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const loadProfile = async (authUser) => {
    // Load the profile row from the profiles table
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', authUser.id)
      .single();

    // Merge auth user fields with profile fields so the rest of the app
    // sees the same shape it expected from base44.auth.me()
    setUser({
      id: authUser.id,
      email: authUser.email,
      full_name: profile?.full_name || '',
      role: profile?.role || 'user',
      cohort_id: profile?.cohort_id || '',
    });
    setIsAuthenticated(true);
    setIsLoadingAuth(false);
  };

  // Call this after the user sets their name on first login
  const refreshUser = async () => {
    const { data: { user: authUser } } = await supabase.auth.getUser();
    if (authUser) await loadProfile(authUser);
  };

  const logout = async () => {
    await supabase.auth.signOut();
  };

  // Sends a magic link to the given email — replaces base44 login redirect
  const navigateToLogin = async (email) => {
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: window.location.origin },
    });
    if (error) throw error;
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      isLoadingAuth,
      logout,
      navigateToLogin,
      refreshUser,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
