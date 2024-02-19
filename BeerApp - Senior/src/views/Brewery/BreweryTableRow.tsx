import {
  Checkbox,
  IconButton,
  Link,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { FC, useContext } from "react";
import { Beer } from "../../types";
import { FavoritesContext } from "../../contexts/FavoritesContext";
import { Clear } from "@mui/icons-material";

type BreweryTableRowProps = {
  brewery: Beer;
  isFavorites?: boolean;
};

const BreweryTableRow: FC<BreweryTableRowProps> = ({
  brewery,
  isFavorites = false,
}) => {
  const { id, name, city, state, country, brewery_type, state_province } =
    brewery || {};
  const {
    selectedFavorites,
    setSelectedFavorites,
    setSelectedFavoritesList,
    selectedFavoritesList,
  } = useContext(FavoritesContext);

  const handleCheckbox = () => {
    const updatedSelectedFavorites = selectedFavorites.includes(id)
      ? selectedFavorites.filter((itemId) => itemId !== id)
      : [...selectedFavorites, id];

    setSelectedFavorites(updatedSelectedFavorites);

    const updatedSelectedFavoritesList = selectedFavoritesList.filter(
      (item) => item.id !== id
    );
    if (!selectedFavorites.includes(id)) {
      updatedSelectedFavoritesList.push(brewery);
    }
    setSelectedFavoritesList(updatedSelectedFavoritesList);

    localStorage.setItem(
      "selectedBreweries",
      updatedSelectedFavorites.join(",")
    );
  };

  return (
    <TableRow hover>
      <TableCell padding="checkbox">
        {!isFavorites ? (
          <Checkbox
            onChange={handleCheckbox}
            checked={selectedFavorites.includes(id)}
          />
        ) : (
          <IconButton onClick={handleCheckbox}>
            <Clear />
          </IconButton>
        )}
      </TableCell>
      <TableCell>
        <Link component={RouterLink} to={`/beer/${id}`}>
          <Typography variant="body1">{name}</Typography>
        </Link>
        <Typography variant="body2" color="text.secondary">
          {brewery_type}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography variant="body2" color="text.secondary">
          {country}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {city}, {state || state_province}
        </Typography>
      </TableCell>
    </TableRow>
  );
};

export default BreweryTableRow;
