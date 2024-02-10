import {
  Card,
  CardContent,
  CardHeader,
  FormControlLabel,
  IconButton,
  Radio,
  RadioGroup,
  Tooltip,
} from "@mui/material";
import React from "react";
import { TYPE } from "../../types";
import { Clear } from "@mui/icons-material";
import { grey } from "@mui/material/colors";

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
  defaultValue: TYPE;
};

const Filter: React.FC<FilterProps> = ({ setFilter, defaultValue }) => {
  const [selectedValue, setSelectedValue] = React.useState<TYPE | "">(
    defaultValue || ""
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const val = (event.target as HTMLInputElement).value as TYPE;
    setSelectedValue(val);
    setFilter(val);
  };

  const handleResetFilter = () => {
    setSelectedValue("");
    setFilter(undefined);
  };

  return (
    <Card
      elevation={0}
      sx={{
        bgcolor: grey[300],
        borderRadius: 3,
      }}
    >
      <CardHeader
        sx={{
          bgcolor: "secondary.main",
          color: "primary",
          borderRadius: 3,
        }}
        title="Filter"
        action={
          <Tooltip title="Clear filter">
            <IconButton aria-label="settings" onClick={handleResetFilter}>
              <Clear />
            </IconButton>
          </Tooltip>
        }
      />
      <CardContent>
        <RadioGroup onChange={handleChange} value={selectedValue}>
          {breweryTypes.map((type) => (
            <FormControlLabel
              key={type}
              value={type}
              control={<Radio />}
              label={type?.toUpperCase()}
            />
          ))}
        </RadioGroup>
      </CardContent>
    </Card>
  );
};

export default Filter;
