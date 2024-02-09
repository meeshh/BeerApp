import {
  getBeerList,
  getRandomBeerList,
} from "../../api";
import { Beer, TYPE } from "../../types";
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
  by_type?: TYPE;
  per_page?: number;
  page?: number;
};

const searchBreweries = async ({
  by_name = "",
  per_page,
  by_type,
  page,
}: SearchDocument) => {
  try {
    const pageValue = page ? page + 1 : undefined;
    const { data } = await getBeerList({ by_name, per_page, page: pageValue, by_type });

    return data;
  } catch (error) {
    handle(error);
  }
};

export { fetchData, searchBreweries };
