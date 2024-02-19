import { FC, useContext } from "react";
import { Beer } from "../../types";

import {
  Card,
  CardActions,
  CardContent,
  Divider,
  IconButton,
  Tooltip,
} from "@mui/material";
import { Favorite, MenuBook } from "@mui/icons-material";

import BreweryAddress from "./BreweryAddress";
import BreweryLocation from "./BreweryLocation";
import BreweryLabel from "./BreweryLabel";
import BreweryMap from "./BreweryMap";
import BreweryPhone from "./BreweryPhone";
import BreweryWebsite from "./BreweryWebsite";
import { FavoritesContext } from "../../contexts/FavoritesContext";

const avatarSize = 57;
const cardWidth = 500;

type BeerCardProps = {
  beer?: Beer;
};

const BeerCard: FC<BeerCardProps> = ({ beer }) => {
  const { selectedFavorites, setSelectedFavorites } =
    useContext(FavoritesContext);

  if (!beer) {
    return null;
  }

  const {
    id = "",
    name = "",
    brewery_type = "",
    country = "",
    city = "",
    state = "",
    address_1 = "",
    longitude = "",
    latitude = "",
    phone = "",
    website_url = "",
  } = beer;

  const toggleFavorites = () => {
    if (selectedFavorites.includes(id)) {
      setSelectedFavorites(selectedFavorites.filter((item) => item !== id));
    } else {
      setSelectedFavorites([...selectedFavorites, id]);
    }
  };

  return (
    <Card
      sx={{ width: cardWidth, position: "relative", mt: 4, borderRadius: 12 }}
      raised={true}
    >
      <BreweryLabel
        name={name}
        breweryType={brewery_type}
        avatarSize={avatarSize}
      />
      <BreweryMap
        cardWidth={cardWidth}
        longitude={longitude}
        latitude={latitude}
      />
      <CardContent>
        <BreweryLocation country={country} city={city} state={state} />

        <BreweryAddress
          address={address_1}
          longitude={longitude}
          latitude={latitude}
        />

        {(!!phone || !!website_url) && (
          <>
            <Divider>Get in touch</Divider>
            <BreweryPhone phone={phone} />
            <BreweryWebsite website={website_url} />
          </>
        )}
      </CardContent>
      <CardActions disableSpacing>
        <Tooltip title="Add to favorites" placement="top-start">
          <IconButton aria-label="add to favorites" onClick={toggleFavorites}>
            <Favorite
              color={selectedFavorites.includes(id) ? "error" : "inherit"}
            />
          </IconButton>
        </Tooltip>
        <Tooltip title="Catalogue" placement="top-start">
          <IconButton>
            <MenuBook />
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );
};

export default BeerCard;
