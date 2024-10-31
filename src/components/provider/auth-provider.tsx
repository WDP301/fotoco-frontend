import { getUser } from '@/lib/data';
import { User } from '@/lib/define';
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

interface AuthContextProps {
  user: User | null;
  loading: boolean;
  error: Error | null;
  updateUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUser();
        setUser(userData);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const updateUser = (newUser: User) => {
    setUser(newUser);
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};
