import { Dispatch } from "react";
import { SORT_DIRECTION, SORT_TYPE } from "./types";

export type SORTER_PROPS = {
  sortDirection: SORT_DIRECTION;
  setSortDirection: Dispatch<SetStateAction<SORT_DIRECTION>>;
  sortType: SORT_TYPE;
  setSortType: Dispatch<SetStateAction<SORT_TYPE>>;
  setPage: Dispatch<SetStateAction<number>>;
};

export type FAVORITE_PROPS = {
  setDisplayFavorites: Dispatch<SetStateAction<boolean>>;
  displayFavorites: boolean;
  fetchFavorites: () => void;
};

export type FILTER_PROPS = {
  setDisplayFilter: Dispatch<SetStateAction<boolean>>;
  displayFilter: boolean;
};
