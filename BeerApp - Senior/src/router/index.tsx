import { BrowserRouter, Route, Routes } from "react-router-dom";
import Offline from "../views/Offline";
import Home from "../views/Home";
import NotFound from "../views/404";
import BeerList from "../views/BeerList";
import Beer from "../views/Beer";
import Footer from "../components/Footer";
import Menu from "../components/Menu";
import { FavoritesContextProvider } from "../contexts/FavoritesContext";
import { useEffect, useState } from "react";
import { Beer as BeerType } from "../types";

const Router = () => {
  const [isOnline, setIsOnline] = useState(true);

  const setOnline = () => setIsOnline(true);
  const setOffline = () => setIsOnline(false);

  useEffect(() => {
    window.addEventListener("online", setOnline);
    window.addEventListener("offline", setOffline);

    return () => {
      window.addEventListener("online", setOnline);
      window.addEventListener("offline", setOffline);
    };
  }, []);

  // persist favorites in browser's localstorage
  const initialFavorites = localStorage
    .getItem("selectedBreweries")
    ?.split(",");

  const [selectedFavorites, setSelectedFavorites] = useState<string[]>(
    initialFavorites ?? []
  );

  const [selectedFavoritesList, setSelectedFavoritesList] = useState<
    BeerType[]
  >([]);

  return (
    <FavoritesContextProvider
      value={{
        selectedFavorites,
        setSelectedFavorites,
        selectedFavoritesList,
        setSelectedFavoritesList,
      }}
    >
      <BrowserRouter>
        <Menu>
          <Offline isOnline={isOnline} />
          <Routes>
            <Route index element={<Home isOnline={isOnline} />} />
            <Route path="beer">
              <Route index element={<BeerList />} />
              <Route path=":id" element={<Beer />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </Menu>
      </BrowserRouter>
    </FavoritesContextProvider>
  );
};

export default Router;
