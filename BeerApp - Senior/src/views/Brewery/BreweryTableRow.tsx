import { Checkbox, Link, TableCell, TableRow, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import React from "react";
import { Beer } from "../../types";

type BreweryTableRowProps = {
  brewery: Beer;
};

const BrewweryTableRow: React.FC<BreweryTableRowProps> = ({ brewery }) => {
  return (
    <TableRow hover>
      <TableCell padding="checkbox">
        <Checkbox />
      </TableCell>
      <TableCell>
        <Link component={RouterLink} to={`/beer/${brewery.id}`}>
          <Typography variant="body1">{brewery.name}</Typography>
        </Link>
        <Typography variant="body2" color="text.secondary">
          {brewery.brewery_type}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography variant="body2" color="text.secondary">
          {brewery.country}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {brewery.city}, {brewery.state || brewery.state_province}
        </Typography>
      </TableCell>
    </TableRow>
  );
};

export default BrewweryTableRow;
