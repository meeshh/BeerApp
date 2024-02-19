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
import { ChangeEvent, FC, useState } from "react";
import { TYPE } from "../../types";
import { RestartAlt } from "@mui/icons-material";
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

type FilterComponentProps = {
  setFilter: (filter: TYPE) => void;
  defaultValue: TYPE;
};

const Filter: FC<FilterComponentProps> = ({
  setFilter,
  defaultValue,
}) => {
  const [selectedValue, setSelectedValue] = useState<TYPE | "">(
    defaultValue ?? ""
  );

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
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
        borderRadius: 3,
        backgroundColor: "transparent",
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
              <RestartAlt />
            </IconButton>
          </Tooltip>
        }
      />
      <CardContent sx={{ bgcolor: grey[200], borderRadius: 3, mt: 1 }}>
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
