type TYPE =
  | "micro"
  | "nano"
  | "regional"
  | "brewpub"
  | "large"
  | "planning"
  | "bar"
  | "contract"
  | "proprietor"
  | "closed"
  | undefined;

type SORT_DIRECTION = "asc" | "desc";
type SORT_TYPE = "name" | "type";
type SORT = "name:asc" | "name:desc" | "type:asc" | "type:desc";

export type { TYPE, SORT, SORT_DIRECTION, SORT_TYPE };
