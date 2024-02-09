import { useEffect, useState } from "react";
import { searchBreweries } from "./utils";
import { Paper, Box, TablePagination, Grid } from "@mui/material";
import React from "react";
import BreweryTable from "../Brewery/BreweryTable";
import { useQuery } from "@tanstack/react-query";
import { FOOTER_HEIGHT, TOPBAR_HEIGHT } from "../../styles/constants";
import BreweryTableToolbar from "../Brewery/BreweryTableToolbar";
import { getBeerMetaData } from "../../api";
import Filter from "../../components/Filter";

const Home = () => {
  // const [beerList, setBeerList] = useState<Array<Beer>>([]);
  // const [savedList] = useState<Array<Beer>>([]);

  const [searchQuery, setSearchQuery] = useState("");
  const [per_page, setPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [by_type, setType] = useState(undefined);

  const searchDocument = {
    by_name: searchQuery,
    by_type,
    page,
    per_page,
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
      return searchBreweries(searchDocument);
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
  ]);

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

  const setFilter = (breweryType) => {
    setType(breweryType);
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
          <Paper sx={{ p: 2 }} elevation={0} component={Grid} container>
            <Grid item xs={12} md={2}>
              <Filter setFilter={setFilter} />
            </Grid>
            <Grid item xs={12} md={10}>
              <BreweryTableToolbar
                numSelected={0}
                reload={fetchBreweries}
                setSearchQuery={changeQuery}
              />
              <BreweryTable breweriesList={beerList} isLoading={isLoading} />
            </Grid>
            <Grid item xs={12}>
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
                  count={parseInt(breweriesCount.data.total)}
                  page={page}
                  onPageChange={handlePageChange}
                  rowsPerPage={per_page}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </Box>
            </Grid>
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
