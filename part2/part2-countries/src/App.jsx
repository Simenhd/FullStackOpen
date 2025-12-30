import { useState, useEffect } from "react";
import countryService from "./services/countries";
import CountriesDisplay from "./components/CountriesDisplay";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    countryService.getAll().then((initialCountries) => {
      setCountries(initialCountries);
    });
  }, []);
  
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  // Determine countries to show based on search term
  const countriesToShow =
    searchTerm === ""
      ? countries
      : countries.filter((country) =>
          country.name.common.toLowerCase().includes(searchTerm)
        );


  // Handle "Show" button click
  const handleShowCountry = (country) => {
    setSearchTerm(country.name.common.toLowerCase());
  };

  const resetSearchTerm = () => {
    setSearchTerm("");
  };

  // UI
  return (
    <div>
      <div>
        search countries:{" "}
        <input value={searchTerm} onChange={handleSearchChange} />
        <button onClick={resetSearchTerm}>Reset</button>
      </div>
      <h3>Countries</h3>
      <CountriesDisplay countries={countriesToShow} onShow={handleShowCountry} />
    </div>
  );
};

export default App;
