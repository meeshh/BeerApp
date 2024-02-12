import {
  Favorite,
  FilterList,
  Search as SearchIcon,
} from "@mui/icons-material";
import { IconButton, InputBase, Toolbar, Tooltip, alpha } from "@mui/material";
import React from "react";
import { styled } from "@mui/material/styles";
import debounce from "lodash.debounce";
import { blue, grey } from "@mui/material/colors";
import Sorter from "../../components/Sorter";
import { FAVORITE_PROPS, FILTER_PROPS, SORTER_PROPS } from "../../types";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.75),
  "&:hover": {
    backgroundColor: theme.palette.common.white,
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

type BreweryTableToolbarProps = {
  setSearchQuery: (query: string) => void;
  filterProps?: FILTER_PROPS;
  sorterProps: SORTER_PROPS;
  favoritesProps: FAVORITE_PROPS;
};

const BreweryTableToolbar: React.FC<BreweryTableToolbarProps> = ({
  setSearchQuery,
  filterProps,
  sorterProps,
  favoritesProps,
}) => {
  const { setDisplayFilter, displayFilter } = filterProps ?? {};
  const { setDisplayFavorites, displayFavorites } = favoritesProps ?? {};

  const debounceChange = debounce((value: string) => {
    setSearchQuery(value);
  }, 500);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    debounceChange(e.target.value);
  };

  const handleToggleFilter = () => {
    if (setDisplayFilter) {
      setDisplayFilter((prev) => !prev);
    }
  };

  const handleDisplayFavorites = () => {
    const displayFlag = !displayFavorites;
    setDisplayFavorites(displayFlag);
    localStorage.setItem("displayFavorites", displayFlag.toString() || "false");
  };

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        bgcolor: "secondary.main",
        color: "primary",
        borderRadius: 3,
      }}
    >
      <Tooltip title={displayFilter ? "Hide filter" : "Show filter"}>
        <IconButton
          onClick={handleToggleFilter}
          sx={{
            bgcolor: displayFilter ? blue[800] : "transparent",
            color: displayFilter ? "white" : "inherit",
            ":hover": {
              bgcolor: displayFilter ? blue[600] : grey[500],
            },
          }}
        >
          <FilterList />
        </IconButton>
      </Tooltip>
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search…"
          inputProps={{ "aria-label": "search" }}
          onChange={handleChange}
        />
      </Search>

      <div style={{ flex: "1" }} />

      <Sorter sorterProps={sorterProps} />

      <Tooltip title="Show Favorites">
        <IconButton
          color={displayFavorites ? "error" : "inherit"}
          onClick={handleDisplayFavorites}
          sx={{ mx: 1 }}
        >
          <Favorite />
        </IconButton>
      </Tooltip>
    </Toolbar>
  );
};

export default BreweryTableToolbar;
