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
  by_name: string;
  per_page?: number;
  page?: number;
};

const searchBreweries = async ({
  by_name = "",
  per_page,
  page,
}: SearchDocument) => {
  try {
    const pageValue = page ? page + 1 : undefined;
    const { data } = await getBeerList({ by_name, per_page, page: pageValue });

    return data;
  } catch (error) {
    handle(error);
  }
};

export { fetchData, searchBreweries };
