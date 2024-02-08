type CountryCodeMap = Record<string, string>;

// according to the api docs, these are the countries that are returned
export const countryCodeMap: CountryCodeMap = {
  Austria: "AT",
  England: "GB",
  France: "FR",
  "Isle of Man": "IM",
  Ireland: "IE",
  Poland: "PL",
  Portugal: "PT",
  Scotland: "GB",
  "South Korea": "KR",
  "United States": "US",
};

export const getCountryCode = (countryName) => {
  return countryCodeMap[countryName];
};
