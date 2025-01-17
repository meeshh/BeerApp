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
import { FC, MouseEvent, useState } from "react";
import { grey } from "@mui/material/colors";
import { SORTER_PROPS, SORT_DIRECTION, SORT_TYPE } from "../../types";

const sorters: SORT_TYPE[] = ["name", "type"];

type SorterProps = {
  sorterProps: SORTER_PROPS;
};

const Sorter: FC<SorterProps> = ({ sorterProps }) => {
  const { sortDirection, setSortDirection, sortType, setSortType, setPage } =
    sorterProps || {};

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSortDirection = (
    _event: MouseEvent<HTMLElement>,
    newSortDirection: SORT_DIRECTION
  ) => {
    setSortDirection(newSortDirection);
    setPage(0);
  };

  const handleSortType = (sortType: SORT_TYPE) => () => {
    setSortType(sortType);
    setPage(0);
  };

  return (
    <>
      <Tooltip title="Sort by">
        <Button
          size="small"
          variant="contained"
          color={open ? "primary" : "inherit"}
          disableElevation
          onClick={handleClick}
          sx={{ px: 4, width: 100 }}
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
        {sorters.map((sorter: SORT_TYPE) => (
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
