import { supabase } from "@/utils/supabase";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
// Define types.
type AuthContextType = {
  session: any | null;
  user: any | null;
  loading: boolean;
  login: any | null;
  signUp: any | null;
  signOut: any | null;
};

// Creates context for components / defining default values.
export const AuthContext = createContext<AuthContextType>({
  session: null,
  user: null,
  loading: true,
  login: null,
  signUp: null,
  signOut: null,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<any | null>(null);
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // loads the session on app start
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session); // set the session
      setUser(data.session?.user ?? null); // if session is valid we set the user information otherwise it will be null.
      setLoading(false); // Shows that loading has finished.
    });
    // Adds listener to update session and user.
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, newSession) => {
        setSession(newSession);
        setUser(newSession?.user ?? null);
      },
    );

    return () => {
      listener.subscription.unsubscribe(); // removes the listener.
    };
  }, []);

  // Handles login for the user
  const login = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    return;
  };
  // handles registration for the user
  const signUp = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) throw error;

    return;
  };

  // handles sign out for the user
  const signOut = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) throw error;

    return;
  };

  return (
    <AuthContext.Provider
      value={{ session, user, loading, login, signUp, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
