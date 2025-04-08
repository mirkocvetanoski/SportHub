// contexts/MyContext.tsx
'use client';

import { createContext, useContext, ReactNode, useState } from 'react';

// Define the type for a competition item (you can replace `any` with a specific type)
type Competition = [];

// Define the type for your context data
type MyContextType = {
  competitions: Competition[];
  setCompetitions: (competitions: Competition[]) => void;
};

// Create the context with a default value
const MyContext = createContext<MyContextType | undefined>(undefined);

// Create a provider component
export function ContextProvider({ children }: { children: ReactNode }) {
  const [competitions, setCompetitions] = useState<Competition[]>([]);

  return (
    <MyContext.Provider value={{ competitions, setCompetitions }}>
      {children}
    </MyContext.Provider>
  );
}

// Create a custom hook for using the context
export function useMyContext() {
  const context = useContext(MyContext);
  if (context === undefined) {
    throw new Error('useMyContext must be used within a MyContextProvider');
  }
  return context;
}
