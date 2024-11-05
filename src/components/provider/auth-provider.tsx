import { getUser } from '@/lib/data';
import { User } from '@/lib/define';
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { getCookie } from 'cookies-next';
import { revalidateTag } from 'next/cache';

interface AuthContextProps {
  user: User | null;
  loading: boolean;
  error: Error | null;
  updateUser: (user: User) => void;
  refreshUser: () => Promise<void>;
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
      const accessToken = getCookie('access-token');
      if (!accessToken) {
        setLoading(false);
        return;
      }
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

  const refreshUser = async () => {
    setLoading(true);
    try {
      await revalidateTag(`user`);
      const userData = await getUser(true);
      setUser(userData);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, error, updateUser, refreshUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
