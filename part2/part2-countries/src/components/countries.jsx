import Country from "./country";

const Countries = ({ countries, onShow }) => {

    switch (true) {
        case countries.length === 0:
        return <p>No matches found</p>;
        case countries.length > 10:
        return <p>Too many matches, specify another filter</p>;
        case countries.length === 1:
        const country = countries[0];
        return (
            <div>
                <h1>{country.name.common}</h1>
                <p>Capital: {country.capital}</p>
                <p>Area: {country.area}</p>
                <h2>Languages</h2>
                <ul>
                    {Object.values(country.languages).map((language) => (
                        <li key={language}>{language}</li>
                    ))}
                </ul>
                <img 
                    src={country.flags.png} 
                    alt={`Flag of ${country.name.common}`} 
                    width="200"
                />
            </div>
        )
    }
  return (
    <ul>
      {countries.map((country) => (
        <Country key={country.cca3} country={country} onShow={() => onShow(country)} />
      ))}
    </ul>
  );
};
  
  export default Countries
  
