import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  points: number;
  joinDate: Date;
  rewardHistory: RewardHistoryItem[];
}

interface RewardHistoryItem {
  id: string;
  type: 'earn' | 'redeem';
  points: number;
  description: string;
  date: Date;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string, phone: string) => Promise<void>;
  logout: () => void;
  addPoints: (points: number, description: string) => void;
  redeemPoints: (points: number, description: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user storage
const USERS_STORAGE_KEY = 'freshking_users';
const CURRENT_USER_KEY = 'freshking_current_user';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Load current user from localStorage
    const savedUser = localStorage.getItem(CURRENT_USER_KEY);
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email: string, password: string) => {
    // In a real app, this would be an API call
    const users = JSON.parse(localStorage.getItem(USERS_STORAGE_KEY) || '[]');
    const foundUser = users.find((u: any) => u.email === email);
    
    if (!foundUser) {
      throw new Error('User not found');
    }
    
    // In a real app, we would hash and compare passwords
    if (foundUser.password !== password) {
      throw new Error('Invalid password');
    }

    setUser(foundUser);
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(foundUser));
  };

  const signup = async (name: string, email: string, password: string, phone: string) => {
    // In a real app, this would be an API call
    const users = JSON.parse(localStorage.getItem(USERS_STORAGE_KEY) || '[]');
    
    if (users.some((u: any) => u.email === email)) {
      throw new Error('Email already exists');
    }

    const newUser: User = {
      id: Date.now().toString(),
      name,
      email,
      points: 100, // Welcome bonus
      joinDate: new Date(),
      rewardHistory: [{
        id: Date.now().toString(),
        type: 'earn',
        points: 100,
        description: 'Welcome bonus',
        date: new Date()
      }]
    };

    users.push({ ...newUser, password, phone });
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));

    setUser(newUser);
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(CURRENT_USER_KEY);
  };

  const addPoints = (points: number, description: string) => {
    if (!user) return;

    const newHistoryItem: RewardHistoryItem = {
      id: Date.now().toString(),
      type: 'earn',
      points,
      description,
      date: new Date()
    };

    const updatedUser = {
      ...user,
      points: user.points + points,
      rewardHistory: [newHistoryItem, ...user.rewardHistory]
    };

    setUser(updatedUser);
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(updatedUser));

    // Update in users storage
    const users = JSON.parse(localStorage.getItem(USERS_STORAGE_KEY) || '[]');
    const updatedUsers = users.map((u: User) => 
      u.id === user.id ? { ...u, points: updatedUser.points, rewardHistory: updatedUser.rewardHistory } : u
    );
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(updatedUsers));
  };

  const redeemPoints = (points: number, description: string) => {
    if (!user || user.points < points) return;

    const newHistoryItem: RewardHistoryItem = {
      id: Date.now().toString(),
      type: 'redeem',
      points: -points,
      description,
      date: new Date()
    };

    const updatedUser = {
      ...user,
      points: user.points - points,
      rewardHistory: [newHistoryItem, ...user.rewardHistory]
    };

    setUser(updatedUser);
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(updatedUser));

    // Update in users storage
    const users = JSON.parse(localStorage.getItem(USERS_STORAGE_KEY) || '[]');
    const updatedUsers = users.map((u: User) => 
      u.id === user.id ? { ...u, points: updatedUser.points, rewardHistory: updatedUser.rewardHistory } : u
    );
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(updatedUsers));
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      login,
      signup,
      logout,
      addPoints,
      redeemPoints
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
