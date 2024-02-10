import { FilterList, Refresh } from "@mui/icons-material";
import {
  Button,
  Divider,
  IconButton,
  InputBase,
  Toolbar,
  Tooltip,
  Typography,
  alpha,
} from "@mui/material";
import React from "react";
import { Search as SearchIcon } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import debounce from "lodash.debounce";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
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
  numSelected: number;
  reload?: () => void;
  setSearchQuery: (query: string) => void;
};

const BreweryTableToolbar: React.FC<BreweryTableToolbarProps> = ({
  numSelected,
  reload,
  setSearchQuery,
}) => {
  const debounceChange = debounce((value) => {
    setSearchQuery(value);
  }, 500);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    debounceChange(e.target.value);
  };

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        bgcolor: "secondary.main",
        color: "primary.contrastText",
        borderRadius: 3
      }}
    >
      <Tooltip title="Filter list">
        <IconButton>
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

      <Typography
        sx={{ flex: "1 1 100%" }}
        color="inherit"
        variant="subtitle1"
        component="div"
      >
        {numSelected > 0 ? numSelected + "selected" : null}
      </Typography>

      <Tooltip title="Sort by">
        <Button variant="text" color="inherit" disableElevation>
          Name
        </Button>
      </Tooltip>

      <Divider orientation="vertical" sx={{mx: 1}} />

      <Tooltip title="Reload">
        <IconButton onClick={reload}>
          <Refresh />
        </IconButton>
      </Tooltip>
    </Toolbar>
  );
};

export default BreweryTableToolbar;
