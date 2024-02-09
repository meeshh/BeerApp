import { useEffect, useState } from "react";
import { getBreweriesCount, searchBreweries } from "./utils";
import { Paper, Box, TablePagination } from "@mui/material";
import React from "react";
import BreweryTable from "../Brewery/BreweryTable";
import { useQuery } from "@tanstack/react-query";
import { FOOTER_HEIGHT, TOPBAR_HEIGHT } from "../../styles/constants";
import BreweryTableToolbar from "../Brewery/BreweryTableToolbar";

const Home = () => {
  // const [beerList, setBeerList] = useState<Array<Beer>>([]);
  // const [savedList] = useState<Array<Beer>>([]);

  const [searchQuery, setSearchQuery] = useState("");
  const [per_page, setPerPage] = useState(10);
  const [page, setPage] = useState(0);

  const searchDocument = {
    query: searchQuery,
    page,
    per_page,
  };

  // this to be used to get total count
  // unfortunately, the API does not provide a way to get the total count when using /search
  // only when using /breweries so we cannot send a query and get the total count
  const {
    data: breweriesCount = 0,
    isFetching: isFetchingBreweriesCount,
    refetch: fetchAllBreweriesCount,
  } = useQuery({
    enabled: false,
    queryKey: ["breweriesCount"],
    queryFn: () => {
      return getBreweriesCount(searchDocument);
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
      return searchBreweries(searchDocument);
    },
  });

  useEffect(() => {
    !isFetching && fetchBreweries();
    !isFetchingBreweriesCount && fetchAllBreweriesCount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchBreweries, fetchAllBreweriesCount, searchQuery, page, per_page]);

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

  return (
    <article
      style={{
        height: `calc(100% - ${TOPBAR_HEIGHT}px - ${FOOTER_HEIGHT}px)`,
        overflow: "auto",
      }}
    >
      <section>
        <main>
          <Paper sx={{ p: 2 }} elevation={0}>
            <BreweryTableToolbar
              numSelected={0}
              reload={fetchBreweries}
              setSearchQuery={changeQuery}
            />
            <BreweryTable breweriesList={beerList} isLoading={isLoading} />
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                mt: 2,
              }}
            >
              <TablePagination
                component="div"
                count={breweriesCount}
                page={page}
                onPageChange={handlePageChange}
                rowsPerPage={per_page}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Box>
          </Paper>

          {/* <Paper>
            <div className={styles.listContainer}>
              <div className={styles.listHeader}>
                <h3>Saved items</h3>
                <Button variant="contained" size="small">
                  Remove all items
                </Button>
              </div>
              <ul className={styles.list}>
                {savedList.map((beer, index) => (
                  <li key={index.toString()}>
                    <Checkbox />
                    <Link component={RouterLink} to={`/beer/${beer.id}`}>
                      {beer.name}
                    </Link>
                  </li>
                ))}
                {!savedList.length && <p>No saved items</p>}
              </ul>
            </div>
          </Paper> */}
        </main>
      </section>
    </article>
  );
};

export default Home;
