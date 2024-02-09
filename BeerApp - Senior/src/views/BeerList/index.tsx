import { useEffect, useState } from "react";
import { Beer } from "../../types";
import { fetchData } from "./utils";
import React from "react";
import { FOOTER_HEIGHT, TOPBAR_HEIGHT } from "../../styles/constants";
import BreweryTable from "../Brewery/BreweryTable";

const BeerList = () => {
  const [beerList, setBeerList] = useState<Array<Beer>>([]);

  // eslint-disable-next-line
  useEffect(fetchData.bind(this, setBeerList), []);

  return (
    <article
      style={{
        height: `calc(100% - ${TOPBAR_HEIGHT}px - ${FOOTER_HEIGHT}px)`,
        overflow: "auto",
      }}
    >
      <section>
        <main>
          <BreweryTable breweriesList={beerList} />
        </main>
      </section>
    </article>
  );
};

export default BeerList;
