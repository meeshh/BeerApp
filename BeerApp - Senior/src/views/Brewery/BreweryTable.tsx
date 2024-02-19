import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { FC, useContext } from "react";
import { Beer } from "../../types";
import BreweryTableRow from "./BreweryTableRow";
import Loader from "../../components/Loader";
import { FavoritesContext } from "../../contexts/FavoritesContext";

type BreweryTableProps = {
  breweriesList: Beer[];
  isLoading: boolean;
  isFavorites?: boolean;
};

const BreweryTable: FC<BreweryTableProps> = ({
  breweriesList,
  isLoading,
  isFavorites,
}) => {
  const { selectedFavorites } = useContext(FavoritesContext);

  if (isLoading) return <Loader />;

  // this condition is important to avoid rendering the last selected favorite when unselected
  const breweriesListToMap =
    isFavorites && !selectedFavorites.length ? [] : breweriesList;

  return (
    <TableContainer sx={{ height: 670, mt: 1 }}>
      <Table
        sx={{
          backgroundColor: "white",
          borderRadius: 3,
        }}
        stickyHeader
      >
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox" />
            <TableCell
              sx={{
                fontSize: 20,
                fontWeight: "600",
              }}
            >
              Name
            </TableCell>
            <TableCell
              sx={{
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
    </TableContainer>
  );
};
export default BreweryTable;

type NoBreweriesProps = {
  title: string;
};
const NoBreweriesFound: FC<NoBreweriesProps> = ({ title }) => {
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
