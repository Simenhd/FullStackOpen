import { useState, useEffect } from "react";
import axios from "axios";
import Countries from "./components/countries";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    console.log("effect run, getting all countries...");
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => {
        setCountries(response.data);
        console.log(response.data);
      });
  }, []);


  const handleSearchChange = (event) => {
    console.log(event.target.value);
    setSearchTerm(event.target.value.toLowerCase());
  };

  // Determine countries to show based on search term
  const countriesToShow =

    searchTerm === ""
      ? countries
      : countries.filter((country) =>
          country.name.common.toLowerCase().includes(searchTerm)
        );

    useEffect(() => {
    console.log("search term changed");
    if (countries.length === 1) {
      console.log("search term returns 1 country!");
    }
  }, [countriesToShow]);

  // Handle "Show" button click
  const handleShowCountry = (country) => {
    setSearchTerm(country.name.common.toLowerCase());
  }

  const resetSearchTerm = () => {
    setSearchTerm("");
  }

  // UI
  return (
    <div>
      <div>
        search countries:{" "}
        <input value={searchTerm} onChange={handleSearchChange} />
        <button onClick={resetSearchTerm}>Reset</button>
      </div>
      <h3>Countries</h3>
      <Countries countries={countriesToShow} onShow={handleShowCountry}/>
    </div>
  );
};

export default App;
