import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";
import { Beer } from "../../types";
import BreweryTableRow from "./BreweryTableRow";
import Loader from "../../components/Loader";
import { FavoritesContext } from "../../contexts/FavoritesContext";
import { grey } from "@mui/material/colors";

type BreweryTableProps = {
  breweriesList: Beer[];
  isLoading: boolean;
  isFavorites?: boolean;
};

const BreweryTable: React.FC<BreweryTableProps> = ({
  breweriesList,
  isLoading,
  isFavorites,
}) => {
  const { selectedFavorites } = React.useContext(FavoritesContext);

  if (isLoading) return <Loader />;

  // this condition is important to avoid rendering the last selected favorite when unselected
  const breweriesListToMap =
    isFavorites && !selectedFavorites.length ? [] : breweriesList;

  return (
    <>
      <Table
        sx={{
          backgroundColor: "white",
          mt: 1,
          borderRadius: 3,
          overflow: "hidden",
        }}
        stickyHeader
      >
        <TableHead sx={{ backgroundColor: grey[200] }}>
          <TableRow>
            <TableCell
              sx={{ backgroundColor: "transparent" }}
              padding="checkbox"
            />
            <TableCell
              sx={{
                backgroundColor: "transparent",
                fontSize: 20,
                fontWeight: "600",
              }}
            >
              Name
            </TableCell>
            <TableCell
              sx={{
                backgroundColor: "transparent",
                fontSize: 20,
                fontWeight: "600",
              }}
            >
              Location
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {breweriesListToMap.map((brewery) => (
            <BreweryTableRow
              key={brewery.id}
              brewery={brewery}
              isFavorites={isFavorites}
            />
          ))}
        </TableBody>
      </Table>
      {
        // Case 1: When displaying favorite breweries and no favorites are selected
        isFavorites && !selectedFavorites.length && (
          <NoBreweriesFound title="No Favorite Breweries" />
        )
      }

      {
        // Case 2: When displaying breweries list and it's empty
        !isFavorites && !breweriesList.length && (
          <NoBreweriesFound title="No breweries found" />
        )
      }
    </>
  );
};
export default BreweryTable;

type NoBreweriesProps = {
  title: string;
};
const NoBreweriesFound: React.FC<NoBreweriesProps> = ({ title }) => {
  return (
    <Typography
      sx={{ textAlign: "center", p: 3 }}
      variant="h4"
      color="text.secondary"
    >
      {title}
    </Typography>
  );
};
