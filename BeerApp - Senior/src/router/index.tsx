import { BrowserRouter, Route, Routes } from "react-router-dom";
import Offline from "../views/Offline";
import Home from "../views/Home";
import NotFound from "../views/404";
import BeerList from "../views/BeerList";
import Beer from "../views/Beer";
import Footer from "../components/Footer";
import Menu from "../components/Menu";
import React, { useState } from "react";
import { FavoritesContextProvider } from "../contexts/FavoritesContext";

const Router = () => {
  // persist favorites in browser's localstorage
  const initialFavorites = localStorage
    .getItem("selectedBreweries")
    ?.split(",");

  const [selectedFavorites, setSelectedFavorites] = useState<string[]>(
    initialFavorites || []
  );

  return (
    <FavoritesContextProvider
      value={{
        selectedFavorites,
        setSelectedFavorites,
      }}
    >
      <BrowserRouter>
        <Menu>
          <Offline />
          <Routes>
            <Route index element={<Home />} />
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
