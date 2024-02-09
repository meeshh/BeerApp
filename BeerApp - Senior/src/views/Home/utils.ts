import { getBeerList, getRandomBeerList, searchBeerList } from "../../api";
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
  per_page = 10,
  page = 1,
}: SearchDocument) => {
  try {
    // to fetch the data when there is no query, we use the getBeerList function
    const { data } = await (!query.trim().length
      ? getBeerList({ per_page, page })
      : searchBeerList({ query, per_page, page }));

    return data;
  } catch (error) {
    handle(error);
  }
};

export { fetchData, searchBreweries };
