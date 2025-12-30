import CountryDetail from "./CountryDetail";
import CountryList from "./CountryList";

const CountriesDisplay = ({ countries, onShow }) => {
  if (countries.length === 0) {
    return <p>No matches found</p>;
  }

  if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  }

  if (countries.length === 1) {
    return <CountryDetail country={countries[0]} />;
  }

  return <CountryList countries={countries} onShow={onShow} />;
};

export default CountriesDisplay;
