import {
  getBeerList,
  getRandomBeerList,
} from "../../api";
import { Beer, SORT, TYPE } from "../../types";
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
  by_name?: string;
  by_type?: TYPE;
  per_page?: number;
  page?: number;
  sort?: SORT | undefined;
  by_ids?: string;
};

const searchBreweries = async ({
  by_name = "",
  per_page,
  by_type,
  page,
  sort,
  by_ids,
}: SearchDocument) => {
  try {
    const pageValue = page ? page + 1 : undefined;
    const { data } = await getBeerList({ by_name, per_page, page: pageValue, by_type, sort, by_ids });
    return data;
  } catch (error) {
    handle(error);
  }
};

export { fetchData, searchBreweries };
