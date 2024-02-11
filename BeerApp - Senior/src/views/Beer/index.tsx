import { useEffect, useState } from "react";
import { Beer as IBeer } from "../../types";
import { fetchData } from "./utils";
import { useParams } from "react-router-dom";
import BeerCard from "./BeerCard";
import React from "react";
import { FOOTER_HEIGHT, TOPBAR_HEIGHT } from "../../styles/constants";
import { grey } from "@mui/material/colors";

const Beer = () => {
  const { id } = useParams();
  const [beer, setBeer] = useState<IBeer>();

  // eslint-disable-next-line
  useEffect(fetchData.bind(this, setBeer, id), [id]);

  return (
    <article
      style={{ backgroundColor: grey[200], height: `calc(100% - ${TOPBAR_HEIGHT}px - ${FOOTER_HEIGHT}px)` }}
    >
      <section>
        <main
          style={{
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <BeerCard beer={beer} />
        </main>
      </section>
    </article>
  );
};

export default Beer;
