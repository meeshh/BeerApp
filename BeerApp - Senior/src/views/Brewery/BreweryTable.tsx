import {
  Checkbox,
  Link,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Beer } from "../../types";

type BreweryTableProps = {
  breweriesList: Beer[];
};

const BreweryTable: React.FC<BreweryTableProps> = ({ breweriesList }) => {
  return (
    <Table>
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
        {breweriesList.map((beer, index) => (
          <TableRow key={index.toString()}>
            <TableCell padding="checkbox">
              <Checkbox />
            </TableCell>
            <TableCell>
              <Link component={RouterLink} to={`/beer/${beer.id}`}>
                <Typography variant="body1">{beer.name}</Typography>
              </Link>
              <Typography variant="body2" color="text.secondary">
                {beer.brewery_type}
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="body2" color="text.secondary">
                {beer.country}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {beer.city}, {beer.state || beer.state_province}
              </Typography>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
export default BreweryTable;
