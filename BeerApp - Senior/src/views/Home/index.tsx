import { useEffect, useState } from "react";
import { searchBreweries } from "./utils";
// import { Beer } from "../../types";
import { Paper, TextField } from "@mui/material";
import styles from "./Home.module.css";
import React from "react";
import BreweryTable from "../Brewery/BreweryTable";
import { useQuery } from "@tanstack/react-query";
import { FOOTER_HEIGHT, TOPBAR_HEIGHT } from "../../styles/constants";
import BreweryTableToolbar from "../Brewery/BreweryTableToolbar";

const Home = () => {
  // const [beerList, setBeerList] = useState<Array<Beer>>([]);
  // const [savedList] = useState<Array<Beer>>([]);

  // eslint-disable-next-line
  // useEffect(fetchData.bind(this, setBeerList), []);

  const [searchQuery, setSearchQuery] = useState("");

  const searchDocument = {
    query: searchQuery,
  };

  const {
    data: beerList = [],
    isLoading,
    refetch: fetchBreweries,
  } = useQuery({
    enabled: false,
    queryKey: ["breweries"],
    queryFn: () => {
      return searchBreweries(searchDocument);
    },
  });

  useEffect(() => {
    fetchBreweries();
  }, [fetchBreweries, searchQuery]);

  const changeQuery = (query: string) => {
    setSearchQuery(query);
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
          <Paper sx={{ p: 2 }}>
            <BreweryTableToolbar
              numSelected={0}
              reload={fetchBreweries}
              setSearchQuery={changeQuery}
            />
            <BreweryTable breweriesList={beerList} isLoading={isLoading} />
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
