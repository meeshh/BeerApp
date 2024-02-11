import React, { useContext, useEffect, useState } from "react";
import { searchBreweries } from "./utils";
import { Paper, TablePagination, Grid } from "@mui/material";
import BreweryTable from "../Brewery/BreweryTable";
import { useQuery } from "@tanstack/react-query";
import { FOOTER_HEIGHT, TOPBAR_HEIGHT } from "../../styles/constants";
import BreweryTableToolbar from "../Brewery/BreweryTableToolbar";
import { getBeerMetaData } from "../../api";
import Filter from "../../components/Filter";
import { SORT, TYPE } from "../../types";
import { FavoritesContext } from "../../contexts/FavoritesContext";
import FavoritesTableToolbar from "../Brewery/FavoritesTableToolbar";

const Home = () => {
  //! can optimize and set one state with a reducer

  const isDisplayFavorites = localStorage.getItem("displayFavorites");

  const { selectedFavorites } = useContext(FavoritesContext);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [per_page, setPerPage] = useState<number>(10);
  const [page, setPage] = useState<number>(0);
  const [by_type, setType] = useState<TYPE | undefined>(undefined);
  const [displayFilter, setDisplayFilter] = useState<boolean>(true);
  const [displayFavorites, setDisplayFavorites] = useState<boolean>(
    Boolean(isDisplayFavorites) || false
  );
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [sortType, setSortType] = useState<"name" | "type">("name");

  const searchDocument = {
    by_name: searchQuery,
    by_type,
    page,
    per_page,
    sort: `${sortType}:${sortDirection}` as SORT,
  };

  const favoritesDocument = {
    by_ids: selectedFavorites.join(","),
  };

  const {
    data: breweriesCount = { data: { total: 0 } },
    isFetching: isFetchingBreweriesCount,
    refetch: fetchAllBreweriesCount,
  } = useQuery({
    enabled: false,
    queryKey: ["breweriesCount"],
    queryFn: () => {
      return getBeerMetaData(searchDocument);
    },
  });

  const {
    data: beerList = [],
    isLoading,
    isFetching,
    refetch: fetchBreweries,
  } = useQuery({
    enabled: false,
    queryKey: ["breweries"],
    queryFn: () => {
      return !isFetching && searchBreweries(searchDocument);
    },
  });

  const { data: favoritesList = [], refetch: fetchFavorites } = useQuery({
    enabled: false,
    queryKey: ["favorites"],
    queryFn: () => {
      localStorage.setItem("selectedBreweries", favoritesDocument.by_ids || "");
      return searchBreweries(favoritesDocument);
    },
  });

  useEffect(() => {
    !isFetching && fetchBreweries();
    !isFetchingBreweriesCount && fetchAllBreweriesCount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    fetchBreweries,
    fetchAllBreweriesCount,
    searchQuery,
    page,
    per_page,
    by_type,
    sortDirection,
    sortType,
  ]);

  useEffect(() => {
    // when selectedFavorites is empty, we don't need to fetch anything as the searchDocument will bring back a full array
    !!selectedFavorites.length && fetchFavorites();
  }, [selectedFavorites, fetchFavorites]);

  const changeQuery = (query: string) => {
    setSearchQuery(query);
    setPage(0);
  };

  const handlePageChange = (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    page: number
  ) => {
    setPage(page);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const setFilter = (breweryType: TYPE | undefined) => {
    setType(breweryType);
    setPage(0);
  };

  const mainGridSize = () => {
    if (displayFavorites && displayFilter) {
      return 6;
    }
    if (displayFavorites) {
      return 8;
    }
    if (displayFilter) {
      return 10;
    }
    return 12;
  };

  return (
    <article
      style={{
        height: `calc(100% - ${TOPBAR_HEIGHT}px - ${FOOTER_HEIGHT}px)`,
        overflow: "auto",
      }}
    >
      <section>
        <main>
          <Paper
            sx={{ p: 2 }}
            elevation={0}
            component={Grid}
            spacing={2}
            container
          >
            {displayFilter && (
              <Grid item xs={12} md={2}>
                <Filter setFilter={setFilter} defaultValue={by_type} />
              </Grid>
            )}
            <Grid item xs={12} md={mainGridSize()}>
              <BreweryTableToolbar
                setSearchQuery={changeQuery}
                filterProps={{
                  setDisplayFilter,
                  displayFilter,
                }}
                sorterProps={{
                  sortDirection,
                  setSortDirection,
                  sortType,
                  setSortType,
                  setPage,
                }}
                favoritesProps={{
                  displayFavorites,
                  setDisplayFavorites,
                  fetchFavorites,
                }}
              />
              <BreweryTable breweriesList={beerList} isLoading={isLoading} />
              <TablePagination
                component="div"
                count={parseInt(breweriesCount.data.total)}
                page={page}
                onPageChange={handlePageChange}
                rowsPerPage={per_page}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Grid>
            {displayFavorites && (
              <Grid item xs={12} md={4}>
                <FavoritesTableToolbar />
                <BreweryTable
                  isFavorites
                  breweriesList={favoritesList}
                  isLoading={false}
                />
              </Grid>
            )}
          </Paper>
        </main>
      </section>
    </article>
  );
};

export default Home;
