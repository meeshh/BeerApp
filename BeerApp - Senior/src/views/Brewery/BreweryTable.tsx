import {
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";
import { Beer } from "../../types";
import BrewweryTableRow from "./BreweryTableRow";
import Loader from "../../components/Loader";

type BreweryTableProps = {
  breweriesList: Beer[];
  isLoading: boolean;
};

const BreweryTable: React.FC<BreweryTableProps> = ({
  breweriesList,
  isLoading,
}) => {
  if (isLoading) return <Loader />;
  return (
    <>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox">
              <Checkbox />
            </TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Location</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {breweriesList.map((brewery) => (
            <BrewweryTableRow key={brewery.id} brewery={brewery} />
          ))}
        </TableBody>
      </Table>
      {!breweriesList.length && (
        <Typography
          sx={{ textAlign: "center", p: 3 }}
          variant="h4"
          color="text.secondary"
        >
          No breweries found
        </Typography>
      )}
    </>
  );
};
export default BreweryTable;
