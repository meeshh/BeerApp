import { useEffect, useState } from "react";
import { Beer } from "../../types";
import { fetchData } from "./utils";
import {
  Avatar,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import SportsBar from "@mui/icons-material/SportsBar";
import { useNavigate } from "react-router-dom";
import React from "react";
import { FOOTER_HEIGHT, TOPBAR_HEIGHT } from "../../styles/constants";

const BeerList = () => {
  const navigate = useNavigate();
  const [beerList, setBeerList] = useState<Array<Beer>>([]);

  // eslint-disable-next-line
  useEffect(fetchData.bind(this, setBeerList), []);

  const onBeerClick = (id: string) => navigate(`/beer/${id}`);

  return (
    <article style={{height: `calc(100% - ${TOPBAR_HEIGHT}px - ${FOOTER_HEIGHT}px)`, overflow: 'auto'}}>
      <section>
        <main>
          <List sx={{ overflowY: "auto", width: '100%' }}>
            {beerList.map((beer) => (
              <ListItemButton
                key={beer.id}
                onClick={onBeerClick.bind(this, beer.id)}
              >
                <ListItemAvatar>
                  <Avatar>
                    <SportsBar />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={beer.name}
                  secondary={beer.brewery_type}
                />
              </ListItemButton>
            ))}
          </List>
        </main>
      </section>
    </article>
  );
};

export default BeerList;
