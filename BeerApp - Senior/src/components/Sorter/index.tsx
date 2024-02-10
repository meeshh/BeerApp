import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import {
  Tooltip,
  Button,
  Menu,
  MenuItem,
  Divider,
  ToggleButtonGroup,
  ToggleButton,
  Typography,
} from "@mui/material";
import React from "react";
import { grey } from "@mui/material/colors";
import { SORT_DIRECTION, SORT_TYPE } from "../../types";

const sorters = ["name", "type"];

type SorterProps = {
  sorterProps: {
    sortDirection: SORT_DIRECTION;
    setSortDirection: React.Dispatch<React.SetStateAction<SORT_DIRECTION>>;
    sortType: SORT_TYPE;
    setSortType: React.Dispatch<React.SetStateAction<SORT_TYPE>>;
  };
};

const Sorter: React.FC<SorterProps> = ({ sorterProps }) => {
  const { sortDirection, setSortDirection, sortType, setSortType } =
    sorterProps || {};

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSortDirection = (
    event: React.MouseEvent<HTMLElement>,
    newSortDirection: SORT_DIRECTION
  ) => {
    setSortDirection(newSortDirection);
  };

  const handleSortType = (sortType) => () => {
    setSortType(sortType);
  };

  return (
    <>
      <Typography variant="caption" color="textSecondary" sx={{ width: 100 }}>
        Sort by
      </Typography>
      <Tooltip title="Sort by">
        <Button
          size="small"
          variant="contained"
          color={open ? "primary" : "inherit"}
          disableElevation
          onClick={handleClick}
          sx={{ px: 4, width: 150 }}
        >
          <span style={{ margin: 4 }}>{sortType.toUpperCase()}</span>
          {sortDirection === "asc" ? (
            <ArrowUpward fontSize="small" />
          ) : (
            <ArrowDownward fontSize="small" />
          )}
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
          <MenuItem
            key={sorter}
            sx={{
              minWidth: 100,
              bgcolor: sortType === sorter ? grey[300] : "",
              ":hover": {
                bgcolor: grey[400],
              },
            }}
            onClick={handleSortType(sorter)}
          >
            {sorter.toUpperCase()}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default Sorter;
