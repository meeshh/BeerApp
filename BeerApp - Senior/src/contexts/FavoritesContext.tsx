import { Dispatch, ReactNode, SetStateAction, createContext } from "react";
import { Beer } from "../types";

interface FavoritesContextType {
  selectedFavorites: string[];
  setSelectedFavorites: (value: string[]) => void;
  selectedFavoritesList: Beer[];
  setSelectedFavoritesList: Dispatch<SetStateAction<Beer[]>>;
}

const defaultValue: FavoritesContextType = {
  selectedFavorites: [],
  setSelectedFavorites: () => null,
  selectedFavoritesList: [],
  setSelectedFavoritesList: () => null,
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
