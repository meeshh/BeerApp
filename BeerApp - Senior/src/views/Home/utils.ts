import {
  getBeerList,
  getBeerMetaData,
  getRandomBeerList,
  searchBeerList,
} from "../../api";
import { Beer } from "../../types";
import handle from "../../utils/error";

const fetchData = (setData: (data: Array<Beer>) => void) => {
  (async () => {
    try {
      const { data } = await getRandomBeerList(10);
      setData(data);
    } catch (error) {
      handle(error);
    }
  })();
};

type SearchDocument = {
  query: string;
  per_page?: number;
  page?: number;
};

const searchBreweries = async ({
  query = "",
  per_page,
  page,
}: SearchDocument) => {
  try {
    // to fetch the data when there is no query, we use the getBeerList function
    const pageValue = page ? page + 1 : undefined;
    const { data } = await (!query.trim().length
      ? getBeerList({ per_page, page: pageValue })
      : searchBeerList({ query, per_page, page: pageValue }));

    return data;
  } catch (error) {
    handle(error);
  }
};

const getBreweriesCount = async ({ query, per_page, page }: SearchDocument) => {
  try {
    // to fetch the data when there is no query, we use the getBeerList function
    const pageValue = page ? page + 1 : undefined;
    const { data } = await (!query.trim().length
      ? getBeerMetaData({ per_page, page: pageValue })
      : searchBeerList({ query }));

    return !query.trim().length ? data.total : data.length;
  } catch (error) {
    handle(error);
  }
};

export { fetchData, searchBreweries, getBreweriesCount };
