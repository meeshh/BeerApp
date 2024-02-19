import { ReactNode, createContext } from "react";

interface FavoritesContextType {
  selectedFavorites: string[];
  setSelectedFavorites: (value: string[]) => void;
}

const defaultValue: FavoritesContextType = {
  selectedFavorites: [],
  setSelectedFavorites: () => null,
};

export const FavoritesContext =
  createContext<FavoritesContextType>(defaultValue);

export function FavoritesContextProvider({
  children,
  value,
}: Readonly<{
  children: ReactNode;
  value: FavoritesContextType;
}>) {
  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}
