import { SORT_DIRECTION, SORT_TYPE } from "./types";

export type SORTER_PROPS = {
  sortDirection: SORT_DIRECTION;
  setSortDirection: React.Dispatch<React.SetStateAction<SORT_DIRECTION>>;
  sortType: SORT_TYPE;
  setSortType: React.Dispatch<React.SetStateAction<SORT_TYPE>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
};

export type FAVORITE_PROPS = {
  setDisplayFavorites: React.Dispatch<React.SetStateAction<boolean>>;
  displayFavorites: boolean;
  fetchFavorites: () => void;
};

export type FILTER_PROPS = {
  setDisplayFilter: React.Dispatch<React.SetStateAction<boolean>>;
  displayFilter: boolean;
};
