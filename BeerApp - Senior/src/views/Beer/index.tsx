import { useEffect, useState } from "react";
import { Beer as IBeer } from "../../types";
import { fetchData } from "./utils";
import { useNavigate, useParams } from "react-router-dom";
import BeerCard from "./BeerCard";
import { FOOTER_HEIGHT, TOPBAR_HEIGHT } from "../../styles/constants";
import { grey } from "@mui/material/colors";
import { Link, Typography } from "@mui/material";
import { KeyboardBackspace } from "@mui/icons-material";

const Beer = () => {
  const { id } = useParams();
  const [beer, setBeer] = useState<IBeer>();

  const navigate = useNavigate();

  // eslint-disable-next-line
  useEffect(fetchData.bind(this, setBeer, id), [id]);

  return (
    <article
      style={{
        backgroundColor: grey[200],
        height: `calc(100% - ${TOPBAR_HEIGHT}px - ${FOOTER_HEIGHT}px)`,
      }}
    >
      <section>
        <header style={{ textAlign: "center", paddingTop: 16 }}>
          <Link
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: 'pointer'
            }}
            component={Typography}
            variant="h6"
            onClick={() => {
              navigate(-1);
            }}
          >
            <KeyboardBackspace />
            Go back
          </Link>
        </header>
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
