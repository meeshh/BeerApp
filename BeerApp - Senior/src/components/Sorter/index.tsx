import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import {
  Tooltip,
  Button,
  Menu,
  MenuItem,
  Divider,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import React from "react";
import { SORT } from "../../types";

const sorters = ["name", "type"];

const Sorter = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [sortDirection, setSortDirection] = React.useState<SORT | null>("asc");

  const handleSortDirection = (
    event: React.MouseEvent<HTMLElement>,
    newSortDirection: SORT | null
  ) => {
    setSortDirection(newSortDirection);
  };

  return (
    <>
      <Tooltip title="Sort by">
        <Button
          variant="text"
          color="inherit"
          disableElevation
          onClick={handleClick}
        >
          Name
        </Button>
      </Tooltip>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem disableRipple>
          <ToggleButtonGroup
            value={sortDirection}
            exclusive
            onChange={handleSortDirection}
          >
            <Tooltip title="Sort ascending">
              <ToggleButton size="small" value="asc" sx={{ minWidth: 100 }}>
                <ArrowUpward />
              </ToggleButton>
            </Tooltip>

            <Tooltip title="Sort descending">
              <ToggleButton size="small" value="desc" sx={{ minWidth: 100 }}>
                <ArrowDownward />
              </ToggleButton>
            </Tooltip>
          </ToggleButtonGroup>
        </MenuItem>
        <Divider />
        {sorters.map((sorter) => (
          <MenuItem key={sorter} sx={{ minWidth: 100 }}>
            {sorter.toUpperCase()}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default Sorter;
