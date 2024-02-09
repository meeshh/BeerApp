import {
  Box,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import React from "react";
import { TYPE } from "../../types";

const breweryTypes: TYPE[] = [
  "micro",
  "nano",
  "regional",
  "brewpub",
  "large",
  "planning",
  "bar",
  "contract",
  "proprietor",
  "closed",
];

type FilterProps = {
  setFilter: (filter: TYPE) => void;
};

const Filter: React.FC<FilterProps> = ({ setFilter }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter((event.target as HTMLInputElement).value as TYPE);
  };

  return (
    <Box>
      <Typography variant="h5">Filter</Typography>
      <RadioGroup onChange={handleChange}>
        {breweryTypes.map((type) => (
          <FormControlLabel
            key={type}
            value={type}
            control={<Radio />}
            label={type.toUpperCase()}
          />
        ))}
      </RadioGroup>
    </Box>
  );
};

export default Filter;
